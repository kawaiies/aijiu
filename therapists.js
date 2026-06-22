/* 预约 API */
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

/* 生成预约单号 */
function generateOrderNo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `AJ${y}${m}${d}${h}${mi}${s}${rand}`;
}

/* 创建预约 */
router.post('/', async (req, res) => {
  try {
    const { user_id, service_id, therapist_id, appoint_date, time_slot, notes } = req.body;

    if (!user_id || !service_id || !appoint_date || !time_slot) {
      return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    /* 查询服务信息获取价格和时长 */
    const [svcRows] = await pool.query(
      'SELECT price, duration FROM services WHERE id = ? AND status = 1',
      [service_id]
    );
    if (svcRows.length === 0) {
      return res.status(404).json({ success: false, message: '服务不存在' });
    }

    /* 检查时段是否已被预约 */
    const [existRows] = await pool.query(
      'SELECT id FROM appointments WHERE therapist_id = ? AND appoint_date = ? AND time_slot = ? AND status IN ("pending","confirmed")',
      [therapist_id || null, appoint_date, time_slot]
    );
    if (existRows.length > 0) {
      return res.status(409).json({ success: false, message: '该时段已被预约，请选择其他时段' });
    }

    const order_no = generateOrderNo();
    const [result] = await pool.query(
      `INSERT INTO appointments (order_no, user_id, service_id, therapist_id, appoint_date, time_slot, duration, price, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [order_no, user_id, service_id, therapist_id || null, appoint_date, time_slot,
       svcRows[0].duration, svcRows[0].price, notes || '']
    );

    res.json({
      success: true,
      message: '预约成功',
      data: { id: result.insertId, order_no }
    });
  } catch (err) {
    console.error('[appointment-create] 创建失败:', err.message);
    res.status(500).json({ success: false, message: '预约失败' });
  }
});

/* 查询用户预约列表 */
router.get('/', async (req, res) => {
  try {
    const { user_id, status } = req.query;
    if (!user_id) {
      return res.status(400).json({ success: false, message: '缺少user_id' });
    }

    let sql = `
      SELECT a.*, s.name as service_name, s.image as service_image,
             t.name as therapist_name
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN therapists t ON a.therapist_id = t.id
      WHERE a.user_id = ?
    `;
    const params = [user_id];

    if (status) {
      sql += ' AND a.status = ?';
      params.push(status);
    }
    sql += ' ORDER BY a.created_at DESC';

    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[appointment-list] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

/* 取消预约 */
router.put('/:id/cancel', async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE appointments SET status = 'cancelled' WHERE id = ? AND status IN ('pending','confirmed')`,
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '预约不存在或已取消' });
    }
    res.json({ success: true, message: '已取消预约' });
  } catch (err) {
    console.error('[appointment-cancel] 取消失败:', err.message);
    res.status(500).json({ success: false, message: '操作失败' });
  }
});

module.exports = router;

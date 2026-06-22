# ============================================
/* 技师 API */
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

/* 获取技师列表 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM therapists WHERE status = 1 ORDER BY sort_order ASC, id ASC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[therapists] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

/* 获取技师详情 */
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM therapists WHERE id = ? AND status = 1',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: '技师不存在' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('[therapist-detail] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

module.exports = router;

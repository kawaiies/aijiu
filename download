/* 服务项目 API */
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

/* 获取服务列表 ?category=single|package|combo */
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM services WHERE status = 1';
    const params = [];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    sql += ' ORDER BY sort_order ASC, id ASC';

    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[services] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

/* 获取热门推荐 */
router.get('/hot', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE status = 1 ORDER BY sort_order ASC LIMIT 6'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[hot] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

/* 获取服务详情 */
router.get('/:sid', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE sid = ? AND status = 1',
      [req.params.sid]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: '服务不存在' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('[service-detail] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

module.exports = router;

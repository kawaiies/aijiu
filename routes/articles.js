/* 文章 API */
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

/* 获取文章列表 ?page=1&size=10 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;

    const [countRows] = await pool.query(
      'SELECT COUNT(*) as total FROM articles WHERE status = 1'
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT id, aid, title, cover, content, summary, category, views, publish_date
       FROM articles WHERE status = 1
       ORDER BY publish_date DESC LIMIT ? OFFSET ?`,
      [size, offset]
    );

    res.json({
      success: true,
      data: rows,
      pagination: { page, size, total, pages: Math.ceil(total / size) }
    });
  } catch (err) {
    console.error('[articles] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

/* 获取文章详情 */
router.get('/:aid', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM articles WHERE aid = ? AND status = 1',
      [req.params.aid]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    /* 阅读量+1 */
    await pool.query('UPDATE articles SET views = views + 1 WHERE id = ?', [rows[0].id]);

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('[article-detail] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

module.exports = router;

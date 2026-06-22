/* 用户 API */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { pool } = require('../config/database');

/* 微信小程序 AppID 和 Secret（部署时通过环境变量注入） */
const APPID = process.env.WX_APPID || 'wxc6132708073b2cb6';
const SECRET = process.env.WX_SECRET || '';

/* 微信登录：用 code 换 openid */
router.post('/login', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: '缺少code参数' });
    }

    /* 调用微信接口换取 openid */
    let openid;
    try {
      const wxRes = await axios.get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`
      );
      openid = wxRes.data.openid;
      if (!openid) {
        console.error('[login] 微信返回:', wxRes.data);
        return res.status(400).json({ success: false, message: '微信登录失败' });
      }
    } catch (wxErr) {
      console.error('[login] 调用微信接口失败:', wxErr.message);
      return res.status(500).json({ success: false, message: '微信接口异常' });
    }

    /* 查找或创建用户 */
    let [rows] = await pool.query('SELECT * FROM users WHERE openid = ?', [openid]);

    if (rows.length === 0) {
      const [insertResult] = await pool.query(
        'INSERT INTO users (openid) VALUES (?)',
        [openid]
      );
      rows = [{ id: insertResult.insertId, openid, nickname: '', avatar: '', phone: '' }];
    }

    res.json({
      success: true,
      data: {
        user_id: rows[0].id,
        openid: rows[0].openid,
        nickname: rows[0].nickname,
        avatar: rows[0].avatar,
        phone: rows[0].phone
      }
    });
  } catch (err) {
    console.error('[login] 登录失败:', err.message);
    res.status(500).json({ success: false, message: '登录失败' });
  }
});

/* 获取用户信息 */
router.get('/profile', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ success: false, message: '缺少user_id' });
    }

    const [rows] = await pool.query(
      'SELECT id, nickname, avatar, phone, gender FROM users WHERE id = ?',
      [user_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('[profile] 查询失败:', err.message);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

/* 更新用户信息 */
router.put('/profile', async (req, res) => {
  try {
    const { user_id, nickname, avatar, phone, gender } = req.body;
    if (!user_id) {
      return res.status(400).json({ success: false, message: '缺少user_id' });
    }

    const fields = [];
    const values = [];
    if (nickname !== undefined) { fields.push('nickname = ?'); values.push(nickname); }
    if (avatar !== undefined) { fields.push('avatar = ?'); values.push(avatar); }
    if (phone !== undefined) { fields.push('phone = ?'); values.push(phone); }
    if (gender !== undefined) { fields.push('gender = ?'); values.push(gender); }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: '没有需要更新的字段' });
    }

    values.push(user_id);
    await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);

    res.json({ success: true, message: '更新成功' });
  } catch (err) {
    console.error('[profile-update] 更新失败:', err.message);
    res.status(500).json({ success: false, message: '更新失败' });
  }
});

module.exports = router;

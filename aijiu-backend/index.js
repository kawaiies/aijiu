/* ============================================
 * 贞艾古法·艾灸养生 - 后端服务入口
 * 微信云托管 (CloudRun) Node.js 服务
 * ============================================ */

const express = require('express');
const cors = require('cors');

/* --- 路由模块 --- */
const servicesRouter = require('./routes/services');
const therapistsRouter = require('./routes/therapists');
const appointmentsRouter = require('./routes/appointments');
const articlesRouter = require('./routes/articles');
const userRouter = require('./routes/user');

const app = express();

/* --- 中间件 --- */
app.use(cors());
app.use(express.json());

/* --- 健康检查（云托管探活用） --- */
app.get('/', (req, res) => {
  res.json({
    success: true,
    service: '贞艾古法·艾灸养生 后端',
    version: '1.0.0',
    status: 'running'
  });
});

/* --- API 路由 --- */
app.use('/api/services', servicesRouter);
app.use('/api/therapists', therapistsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/user', userRouter);

/* --- 全局错误处理 --- */
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/* --- 启动服务 --- */
const port = process.env.PORT || 80;
app.listen(port, '0.0.0.0', () => {
  console.log(`[AIJIU] 艾灸养生后端服务已启动，端口: ${port}`);
});

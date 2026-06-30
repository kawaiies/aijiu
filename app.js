/* ============================================
 * 贞艾古法·艾灸养生 - Express 主入口
 * 用于微信云托管 (CloudRun) 容器部署
 * ============================================ */

const express = require("express");
const { testConnection } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 80;

/* 中间件 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 路由挂载 */
app.use("/api/services", require("./routes/services"));
app.use("/api/articles", require("./routes/articles"));
app.use("/api/therapists", require("./routes/therapists"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/user", require("./routes/user"));

/* 健康检查 */
app.get("/health", (req, res) => {
  res.json({ success: true, message: "OK", timestamp: Date.now() });
});

/* 启动 */
async function start() {
  const dbOk = await testConnection();
  if (!dbOk) {
    console.warn("[app] MySQL 连接失败，服务仍会启动但 API 将返回 500");
  }
  app.listen(PORT, () => {
    console.log("[app] 服务已启动，端口: " + PORT);
  });
}

start();

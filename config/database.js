/* ============================================
 * 数据库连接配置
 * 微信云托管 MySQL 环境变量：
 *   MYSQL_ADDRESS = 主机:端口（如 10.25.103.109:3306）
 *   MYSQL_USERNAME = 用户名
 *   MYSQL_PASSWORD = 密码
 *   MYSQL_DATABASE = 数据库名
 * ============================================ */

const mysql = require("mysql2/promise");

/* 解析 MYSQL_ADDRESS（格式：host:port） */
const addr = (process.env.MYSQL_ADDRESS || "localhost:3306").split(":");
const host = addr[0];
const port = parseInt(addr[1]) || 3306;

const pool = mysql.createPool({
  host: host,
  port: port,
  user: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "aijiu",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

/* 测试连接 */
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("[DB] MySQL 连接成功  host=" + host + " port=" + port + " db=" + (process.env.MYSQL_DATABASE || "aijiu"));
    conn.release();
    return true;
  } catch (err) {
    console.error("[DB] MySQL 连接失败:", err.message);
    return false;
  }
}

module.exports = { pool, testConnection };

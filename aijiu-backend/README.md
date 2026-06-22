# 贞艾古法·艾灸养生 - 后端服务

微信小程序后端 API 服务，部署在微信云托管 (CloudRun)。

## 技术栈

- Node.js 18 + Express
- MySQL (微信云托管内置)

## 本地运行

```bash
npm install
# 配置 MySQL 环境变量后运行
node index.js
```

## API 接口

| 路径 | 方法 | 说明 |
|------|------|------|
| /api/services | GET | 服务列表 |
| /api/services/hot | GET | 热门推荐 |
| /api/services/:sid | GET | 服务详情 |
| /api/therapists | GET | 技师列表 |
| /api/appointments | POST | 创建预约 |
| /api/appointments | GET | 预约列表 |
| /api/appointments/:id/cancel | PUT | 取消预约 |
| /api/articles | GET | 文章列表 |
| /api/articles/:aid | GET | 文章详情 |
| /api/user/login | POST | 微信登录 |
| /api/user/profile | GET/PUT | 用户信息 |

## 环境变量

| 变量名 | 说明 |
|--------|------|
| PORT | 服务端口 (默认80) |
| MYSQL_ADDRESS | MySQL 地址 |
| MYSQL_USERNAME | 用户名 |
| MYSQL_PASSWORD | 密码 |
| MYSQL_DATABASE | 数据库名 |
| WX_APPID | 小程序 AppID |
| WX_SECRET | 小程序 Secret |

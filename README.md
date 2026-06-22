# ============================================
# 贞艾古法·艾灸养生 - 后端服务 Dockerfile
# 用于微信云托管 (CloudRun) 容器部署
# ============================================

# 使用 Node.js 18 官方镜像作为基础
FROM node:18-slim

# 设置工作目录
WORKDIR /usr/src/app

# 先复制依赖文件（利用 Docker 缓存层加速构建）
COPY package*.json ./

# 安装生产依赖
RUN npm install --only=production

# 复制全部项目文件
COPY . ./

# 暴露端口（云托管会注入 PORT 环境变量，默认80）
EXPOSE 80

# 启动服务
CMD ["node", "index.js"]

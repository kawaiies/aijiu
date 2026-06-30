# ============================================
# 贞艾古法·艾灸养生 - 后端服务 Dockerfile
# 用于微信云托管 (CloudRun) 容器部署
# ============================================

FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

EXPOSE 80

CMD ["node", "app.js"]

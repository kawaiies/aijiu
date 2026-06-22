-- ============================================
-- 贞艾古法·艾灸养生 数据库建表脚本
-- 适用于微信云托管 MySQL
-- ============================================

CREATE DATABASE IF NOT EXISTS aijiu DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aijiu;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openid VARCHAR(64) NOT NULL UNIQUE COMMENT '微信openid',
  nickname VARCHAR(64) DEFAULT '' COMMENT '昵称',
  avatar VARCHAR(512) DEFAULT '' COMMENT '头像URL',
  phone VARCHAR(20) DEFAULT '' COMMENT '手机号',
  gender TINYINT DEFAULT 0 COMMENT '0未知 1男 2女',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_openid (openid)
) ENGINE=InnoDB COMMENT='用户表';

-- 服务项目表
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sid VARCHAR(32) NOT NULL UNIQUE COMMENT '业务ID(如head-trial)',
  name VARCHAR(64) NOT NULL COMMENT '服务名称',
  category ENUM('single','package','combo') NOT NULL DEFAULT 'single' COMMENT '分类',
  content VARCHAR(256) DEFAULT '' COMMENT '服务简介',
  duration INT DEFAULT 60 COMMENT '时长(分钟)',
  price DECIMAL(10,2) NOT NULL COMMENT '现价',
  original_price DECIMAL(10,2) DEFAULT 0 COMMENT '原价',
  effect VARCHAR(512) DEFAULT '' COMMENT '功效',
  target VARCHAR(512) DEFAULT '' COMMENT '适用人群',
  image VARCHAR(256) DEFAULT '' COMMENT '图片路径',
  sort_order INT DEFAULT 0 COMMENT '排序权重',
  status TINYINT DEFAULT 1 COMMENT '1上架 0下架',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_status (status)
) ENGINE=InnoDB COMMENT='服务项目表';

-- 技师表
CREATE TABLE IF NOT EXISTS therapists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(32) NOT NULL COMMENT '技师姓名',
  title VARCHAR(32) DEFAULT '' COMMENT '职称',
  avatar VARCHAR(256) DEFAULT '' COMMENT '头像URL',
  experience INT DEFAULT 0 COMMENT '从业年限',
  specialties VARCHAR(256) DEFAULT '' COMMENT '擅长项目',
  rating DECIMAL(2,1) DEFAULT 5.0 COMMENT '评分',
  sort_order INT DEFAULT 0 COMMENT '排序权重',
  status TINYINT DEFAULT 1 COMMENT '1在职 0离职',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status)
) ENGINE=InnoDB COMMENT='技师表';

-- 预约表
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_no VARCHAR(32) NOT NULL UNIQUE COMMENT '预约单号',
  user_id INT NOT NULL COMMENT '用户ID',
  service_id INT NOT NULL COMMENT '服务ID',
  therapist_id INT DEFAULT NULL COMMENT '技师ID(NULL=不指定)',
  appoint_date DATE NOT NULL COMMENT '预约日期',
  time_slot VARCHAR(16) NOT NULL COMMENT '时段(如10:00)',
  duration INT DEFAULT 60 COMMENT '时长(分钟)',
  price DECIMAL(10,2) DEFAULT 0 COMMENT '应付金额',
  status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending' COMMENT '状态',
  notes VARCHAR(256) DEFAULT '' COMMENT '备注',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user (user_id),
  INDEX idx_date (appoint_date),
  INDEX idx_status (status)
) ENGINE=InnoDB COMMENT='预约表';

-- 文章表
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aid VARCHAR(32) NOT NULL UNIQUE COMMENT '文章ID(如art-1)',
  title VARCHAR(128) NOT NULL COMMENT '标题',
  cover VARCHAR(256) DEFAULT '' COMMENT '封面图',
  content TEXT COMMENT '正文(富文本)',
  summary VARCHAR(256) DEFAULT '' COMMENT '摘要',
  category VARCHAR(32) DEFAULT '养生' COMMENT '分类',
  views INT DEFAULT 0 COMMENT '阅读量',
  publish_date DATE DEFAULT NULL COMMENT '发布日期',
  status TINYINT DEFAULT 1 COMMENT '1发布 0草稿',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_date (publish_date)
) ENGINE=InnoDB COMMENT='文章表';

-- 次卡/疗程卡表
CREATE TABLE IF NOT EXISTS service_cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL COMMENT '用户ID',
  service_id INT NOT NULL COMMENT '服务ID',
  total_times INT NOT NULL COMMENT '总次数',
  used_times INT DEFAULT 0 COMMENT '已用次数',
  expire_date DATE NOT NULL COMMENT '到期日',
  status TINYINT DEFAULT 1 COMMENT '1有效 0过期',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_id)
) ENGINE=InnoDB COMMENT='次卡/疗程卡表';

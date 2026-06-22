-- ============================================
-- 初始数据导入（服务项目 + 文章）
-- 在 schema.sql 执行后运行
-- ============================================

USE aijiu;

-- 服务项目数据
INSERT INTO services (sid, name, category, content, duration, price, original_price, effect, target, image, sort_order) VALUES
('head-trial', '头风灸（新客体验）', 'single', '古法橘米观音药艾，头部穴位敷灸，疏通头部经络、舒缓紧绷', 30, 9.9, 98, '改善头晕头痛、偏头痛、头昏沉、睡眠不佳', '经常熬夜、头痛偏头痛、睡眠浅、头昏乏力人群', '/static/service/card-headwind.png', 1),
('cold-warming', '驱寒温阳灸', 'single', '古法滴水观音艾灸＋循经艾灸，督脉腰背大面积施灸', 60, 128, 168, '排出体内寒湿、温补阳气、疏通膀胱经', '体寒怕冷、腰背酸痛、湿气重、手脚冰凉、宫寒畏寒人群', '/static/service/card-warming.png', 2),
('custom-moxa', '对症定制灸', 'single', '专业辨证取穴，根据肩颈、脾胃、妇科、关节等问题针对性调理', 50, 118, 158, '一人一方专属调理，精准穴位药灸', '肩颈僵硬、脾胃虚寒、关节酸痛、妇科寒湿、长期亚健康人群', '/static/service/card-targeted.png', 3),
('head-regular', '头风灸（正价单次）', 'single', '头部专属药艾敷灸，疏通头皮经络、祛风散寒、舒缓脑神经', 35, 78, 98, '放松紧绷情绪、改善失眠多梦', '失眠多梦、神经性头痛、吹风头痛、用脑过度、作息紊乱人群', '/static/service/card-headwind.png', 4),
('du-mai-single', '督脉灸', 'single', '督脉大面积铺灸，温通全身经络、驱寒祛湿、提升阳气', 60, 138, 198, '温通督脉、驱寒祛湿、提升阳气、改善腰背酸痛', '阳气不足、腰背酸痛、寒湿体质、长期疲劳亚健康人群', '/static/service/du-mai-moxa.png', 5),
('custom-5card', '对症定制灸 · 5次卡', 'package', '对症定制灸 × 5次，单次50分钟，有效期6个月，可家人共用', 50, 498, 790, '系统疗程调理，效果更持久', '需要长期调理的亚健康人群', '/static/service/card-targeted.png', 1),
('warming-10card', '驱寒温阳灸 · 10次卡', 'package', '驱寒温阳灸 × 10次，单次60分钟，有效期8个月', 60, 1080, 1680, '持续温补阳气，深层驱寒', '体寒怕冷、需要长期温阳调理人群', '/static/service/card-warming.png', 2),
('du-mai-10card', '督脉灸 · 10次卡', 'package', '督脉灸 × 10次，单次60分钟，有效期8个月', 60, 1080, 1380, '持续温通督脉，深层驱寒祛湿，系统提升阳气', '阳气不足、寒湿体质、需要长期调理人群', '/static/service/du-mai-moxa.png', 3),
('head-10card', '头风灸 · 10次卡', 'package', '头风灸 × 10次，单次35分钟，有效期6个月', 35, 580, 980, '持续疏通头部经络，改善睡眠', '长期头痛失眠、需要持续调理人群', '/static/service/card-headwind.png', 4);

-- 文章数据
INSERT INTO articles (aid, title, cover, summary, category, publish_date) VALUES
('art-1', '艾灸养生：千年古法的智慧传承与现代健康守护', '/static/service/card-warming.png', '探寻艾灸这一中华传统医学瑰宝的历史渊源与现代养生价值', '养生', '2025-01-15'),
('art-2', '寒湿体质的自救指南：艾灸如何帮你驱寒除湿', '/static/service/card-warming.png', '寒湿体质人群如何通过艾灸调理改善身体状况', '调理', '2025-02-20'),
('art-3', '头风灸：古法橘米观音药艾的神奇功效', '/static/service/card-headwind.png', '深入了解头风灸的历史与功效', '养生', '2025-03-10'),
('art-4', '春季养生：艾灸调理的黄金时节', '/static/service/card-warming.png', '春季艾灸养生的方法与注意事项', '养生', '2025-03-20'),
('art-5', '艾灸与现代亚健康调理的科学探索', '/static/service/card-targeted.png', '现代人亚健康状态如何通过艾灸改善', '调理', '2025-04-05'),
('art-6', '滴水观音艾灸：非遗古法调理的智慧与传承', '/static/service/card-dumai.png', '探索滴水观音艾灸这一非物质文化遗产的历史渊源与独特调理方法', '养生', '2025-05-10');

const Router = require('koa-router');

const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  create,
  list
} = require('../controller/label.controller.js');

const router = new Router({ prefix: '/label' });

// 创建标签
router.post('/', verifyAuth, create);
// 获取标签列表
router.get('/', list)

module.exports = router;

const Router = require('koa-router');

const { 
  create,
  avatarInfo
} = require('../controller/user.controller');
const { 
  verifyUser, 
  handPassword 
} = require('../middleware/user.middleware');

const router = new Router({ prefix: '/users' })

router.post('/', verifyUser, handPassword, create)
// 获取用户头像
router.get('/:userId/avatar', avatarInfo)

module.exports = router
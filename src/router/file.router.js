const Router = require('koa-router');

const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware');
const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller.js');

const router = new Router({ prefix: '/upload' });

router.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
router.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo)

module.exports = router;

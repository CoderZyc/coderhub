const Router = require('koa-router'); 

const { 
  create, 
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller');
const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  verifyLabelExist
} = require('../middleware/label.middleware');

const router = new Router({ prefix: '/moment' });

router.post('/', verifyAuth, create);
router.get('/:momentId', detail);
router.get('/', list);
router.patch('/:momentId', verifyAuth, verifyPermission, update);
router.delete('/:momentId', verifyAuth, verifyPermission, remove);
router.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExist, addLabels);
router.get('/images/:filename', fileInfo);

module.exports = router;

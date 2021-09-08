const Router = require('koa-router');

const { login, verifySuccess } = require('../controller/auth.controller');
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware');

const router = new Router();

router.post('/login', verifyLogin, login);

router.get('/test', verifyAuth, verifySuccess);

module.exports = router;

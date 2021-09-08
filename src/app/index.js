const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const useRouter = require('../router/index');
const errorHandler = require('./error-handle');

const app = new Koa();

app.use(bodyparser());
useRouter(app);
app.on('error', errorHandler);

module.exports = app;

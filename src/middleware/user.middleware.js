const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const md5Password = require('../utils/password-handle');

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 判断用户名和密码不能为空
  if (!name || !password) { // null undefined ''
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户名是否已经注册过
  const result = await service.getUserByName(name);

  if (result.length > 0) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}

const handPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  ctx.request.body.password = md5Password(password);

  await next();
}

module.exports = {
  verifyUser,
  handPassword
};

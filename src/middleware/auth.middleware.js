const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const md5Password = require('../utils/password-handle')
const authService = require('../service/auth.service');
const { PUBLIC_kEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户名是否存在
  const result = await userService.getUserByName(name);
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断密码是否正确
  if (md5Password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user;

  await next();
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers['authorization'];

  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const result = jwt.verify(token, PUBLIC_kEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;

    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
}

// const verifyPermission = async (ctx, next) => {
//   const { id: userId } = ctx.user;
//   const { momentId } = ctx.params;

//   const result = await authService.momentPermission(userId, momentId);

//   if (!result) {
//     const error = new Error(errorTypes.UNPERMISSION);
//     return ctx.app.emit('error', error, ctx);
//   }

//   await next();
// }

// 上面的只能验证动态的权限, 现在改成都可以验证(动态、评论...), 但是需要外界传入表名, 有两种方案
// 方案一: 返回一个闭包
// const verifyPermission = (tableName) => {
//   return async (ctx, next) => {
//     const { id: userId } = ctx.user;
//     // 这里也需要有约束
//     const { momentId } = ctx.params;
  
//     const result = await authService.verifyPermission(tableName, userId, momentId);
  
//     if (!result) {
//       const error = new Error(errorTypes.UNPERMISSION);
//       return ctx.app.emit('error', error, ctx);
//     }
  
//     await next();
//   }
// }

// 方案二: 如果是遵循RSFUL风格
const verifyPermission = async (ctx, next) => {
  const { id: userId } = ctx.user;
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];

  const result = await authService.verifyPermission(tableName, userId, resourceId);

  if (!result) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
};

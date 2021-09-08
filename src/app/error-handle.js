const errorTypes = require('../constants/error-types');

const errorHandler = (err, ctx) => {
  let status, message;

  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = '用户名或密码不能为空';
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // Conflict
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; // 请求参数有问题基本都可以用400
      message = "用户不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; // 请求参数有问题基本都可以用400
      message = "密码不正确~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "未授权~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401;
      message = "无权限操作~";
      break;
    default:
      status = 404;
      message = 'Not Found';
      break;
  }

  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;

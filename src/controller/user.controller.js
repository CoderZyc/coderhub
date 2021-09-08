const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const {
  AVATAR_PATH
} = require('../constants/file-path')

class UserController {
  async create(ctx, next) {
    // 获取用户传入的信息
    const user = ctx.request.body

    // 数据库操作
    const result = await userService.create(user)

    // 返回结果
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const result = await fileService.getAvatarByUserId(userId);

    ctx.response.set('content-type', result.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`);
  }
}

module.exports = new UserController()

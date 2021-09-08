const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const {
  APP_HOST,
  APP_PORT
} = require('../app/config');

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id: userId } = ctx.user;
    let result = await fileService.createAvatar(filename, mimetype, size, userId);
    
    // 保存用户头像
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`;
    result = await userService.updateAvatarById(userId, avatarUrl);

    ctx.body = result;
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files;
    const { id: userId } = ctx.user;
    const { momentId } = ctx.query;

    for (const file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, userId, momentId);
    }

    ctx.body = '动态配图上传完成';
  }
}

module.exports = new FileController();

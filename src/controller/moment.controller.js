const fs = require('fs');
const path = require('path');

const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');
const { 
  PICTURE_PATH
} = require('../constants/file-path');

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    const result = await momentService.create(id, content);

    ctx.body = result;
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.getMomentById(momentId);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await momentService.getMoments(limit, offset);

    ctx.body = result;
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(momentId, content);

    ctx.body = result;
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);

    ctx.body = result;
  }

  async addLabels(ctx, next) {
    const { momentId } = ctx.params;
    const { labels } = ctx;

    for (label of labels) {
      const hasLabel = await momentService.hasLabel(momentId, label.id);

      if (!hasLabel) {
        await momentService.addLabel(momentId, label.id);
      }
    }

    ctx.body = '添加标签成功~';
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const result = await fileService.getFileByFileName(filename);

    const { type } = ctx.query;
    const types = ['large', 'middle', 'small'];

    if (types.some(value => value === type)
        && fs.existsSync(`${PICTURE_PATH}/${filename}-${type}`)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', result.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();

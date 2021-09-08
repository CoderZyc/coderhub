const service = require('../service/label.service');

const verifyLabelExist = async (ctx, next) => {
  const { labels } = ctx.request.body;
  const newLabels = [];

  for (label of labels) {
    const result = await service.getLabeByName(label);

    if (result) {
      newLabels.push({ id: result.id, name: label })
    } else {
      const createLabel = await service.create(label);
      newLabels.push({ id: createLabel.insertId, name: label })
    }
  }

  ctx.labels = newLabels;

  await next();
}


module.exports = {
  verifyLabelExist
};

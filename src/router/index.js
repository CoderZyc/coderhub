/**
 * 动态加载router
 */
const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename);

const useRouter = (app) => {
  fs.readdirSync(__dirname).forEach((value) => {
    if (value === currentFileName) return;

    const router = require(`./${value}`);

    app.use(router.routes());
    app.use(router.allowedMethods());
  })
}

module.exports = useRouter;

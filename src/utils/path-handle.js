const fs = require('fs');
const path = require('path');

// 判断文件夹是否存在, 不存在则创建
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
}

module.exports = {
  createDirSync
};

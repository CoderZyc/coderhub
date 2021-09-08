const path = require('path');

const multer = require('koa-multer');
const jimp = require('jimp')

const { 
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-path');
const {
  createDirSync
} = require('../utils/path-handle');

createDirSync(PICTURE_PATH);

// 设置文件存储路径
// const avatarUpload = multer({
//   dest: AVATAR_PATH
// })

// 设置文件存储路径 + 文件名
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const avatarUpload = multer({
  storage: avatarStorage
});

const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PICTURE_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const pictureUpload = multer({
  storage: pictureStorage
});

const avatarHandler = avatarUpload.single('avatar');
const pictureHandler = pictureUpload.array('picture', 9);

const pictureResize = async (ctx, next) =>{
    const files = ctx.req.files;

    for (const file of files) {
      const { path } = file;
      jimp.read(file.path).then((res) => {
        res.resize(1280, jimp.AUTO).write(`${path}-large`);
        res.resize(640, jimp.AUTO).write(`${path}-middle`);
        res.resize(320, jimp.AUTO).write(`${path}-small`);
      });
    }

  await next();
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}

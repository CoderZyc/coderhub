const path = require('path');

const HOME_PATH = process.cwd();
const AVATAR_PATH = './uploads/avatar';
const PICTURE_PATH = path.resolve(HOME_PATH, './uploads/picture');

module.exports = {
  HOME_PATH,
  AVATAR_PATH,
  PICTURE_PATH
};

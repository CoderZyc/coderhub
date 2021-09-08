const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv')

dotenv.config()

const PRIVATE_KEY_PATH = path.resolve(__dirname, './keys/private.key');
const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH);
const PUBLIC_KEY_PATH = path.resolve(__dirname, './keys/public.key');
const PUBLIC_kEY = fs.readFileSync(PUBLIC_KEY_PATH);

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_kEY = PUBLIC_kEY;

const connection = require('../app/database');

class UserService {
  async create(user) {
    const { name, password } = user;

    // 保存信息到数据库
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name ,password]);
    
    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    
    return result[0];
  }

  async updateAvatarById(userId, avatarUrl) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [avatarUrl, userId]);
    
    return result;
  }
}

module.exports = new UserService();

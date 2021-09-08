const connection = require('../app/database');

class AuthService {
  // async momentPermission(userId, momentId) {
  //   const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
  //   const [result] = await connection.execute(statement, [momentId, userId]);
    
  //   return result.length === 0 ? false : true;
  // }
  
  // 上面的只能验证动态的权限, 现在改成都可以验证(动态、评论...)
  async verifyPermission(tableName, userId, resourceId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [resourceId, userId]);
    
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();

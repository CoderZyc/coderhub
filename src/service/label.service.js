const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);

    return result;
  }

  async getLabeByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);

    return result[0];
  }
  
  async list(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ? OFFSET ?;`;
    const [result] = await connection.execute(statement, [limit, offset]);

    return result;
  }
}

module.exports = new LabelService();

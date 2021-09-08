const connection = require('../app/database');

class CommentService {
  async create(content, momentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId]);

    return result;
  }

  async reply(content, momentId, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);

    return result;
  }

  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);

    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);

    return result;
  }

  async getCommentsByMomentId(momentId, limit, offset) {
    const statement = `
    SELECT 
      c.id id, c.content content, c.comment_id commentId, c.createAt createTime, c.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM comment c
    LEFT JOIN user u ON c.user_id = u.id
    WHERE c.moment_id = ?
    LIMIT ? OFFSET ?;
    `;
    const [result] = await connection.execute(statement, [momentId, limit, offset]);

    return result;
  }
}

module.exports = new CommentService();

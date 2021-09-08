const connection = require('../app/database');

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [content, userId]);

    return result;
  }

  async getMomentById(momentId) {
    // 动态+用户信息
    // const statement = `
    //   SELECT 
    //     m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    //     JSON_OBJECT('id', u.id, 'name', u.name) author
    //   FROM moment m
    //   LEFT JOIN user u ON m.user_id = u.id
    //   WHERE m.id = ?;
    // `;

    // 动态+用户+评论列表
    // const statement = `
    //   SELECT 
    //     m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    //     JSON_OBJECT('id', u.id, 'name', u.name) author,
    //     JSON_ARRAYAGG(
    //       JSON_OBJECT(
    //         'id', c.id, 'content', c.content, 'commentId', c.comment_id,
    //         'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
    //       )
    //     ) commentList
    //   FROM moment m
    //   LEFT JOIN user u ON m.user_id = u.id
    //   LEFT JOIN comment c ON m.id = c.moment_id
    //   LEFT JOIN user cu ON c.user_id = cu.id
    //   WHERE m.id = ?
    //   GROUP BY m.id;
    // `;

    // 动态+用户+评论列表+标签列表
    let statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        IF(COUNT(c.id),
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', c.id, 'content', c.content, 'commentId', c.comment_id,
                'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url)
              )
            ),
            NULL) commentList,
        (SELECT
        IF(COUNT(l.id),
          JSON_ARRAYAGG(
            JSON_OBJECT('id', l.id, 'name', l.name)
          ),
          NULL)
        FROM moment_label ml LEFT JOIN label l ON ml.label_id = l.id 
        WHERE ml.moment_id = m.id
        GROUP BY ml.moment_id) labelList
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN comment c ON m.id = c.moment_id
      LEFT JOIN user cu ON c.user_id = cu.id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
    try {
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (err) {
      console.log(err)
    }

    return result;
  }

  async getMoments(limit, offset) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
	      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ? OFFSET ?;
    `;
    const [result] = await connection.execute(statement, [limit, offset]);

    return result;
  }

  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);

    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);

    return result;
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);

    return result[0] ? true : false;
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);

    return result;
  }
}

module.exports = new MomentService();

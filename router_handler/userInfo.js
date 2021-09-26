const db = require('../db/index');


module.exports.userInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from users where id=?';
  db.query(sql, req.user.id, (err, results) => {
      if (err) return res.errorR(1, err);
      if (results.length !== 1) return res.errorR(1, '获取用户基本信息失败！')
      res.send({ status: 0, message: '获取用户基本信息成功！', data: results[0] })
  });
};
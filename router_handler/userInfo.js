const db = require('../db/index');
const bcrypt = require('bcryptjs');


module.exports.userInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic, follow, follower from users where id=?';
  db.query(sql, req.user.id, (err, results) => {
      if (err) return res.errorR(1, err);
      if (results.length !== 1) return res.errorR(1, '获取用户基本信息失败！')
      res.send({ status: 0, message: '获取用户基本信息成功！', data: results[0] })
  });
};


module.exports.updateInfo = (req, res) => {
  const sql = 'update users set ? where id=?'
  db.query(sql,[req.body, req.user.id], (err,results) => {
    if (err) return res.errorR(1, err);
    if(results.affectedRows != 1) res.errorR(1, '修改用户基本信息失败！');
    res.send({ status: 0, message: '修改用户基本信息成功！' });
  });
};

module.exports.updatePassword = (req, res) => {
  const sql = 'select * from users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.errorR(1, err);
        if (results.length != 1) res.errorR(1, '用户不存在！');
        const { oldPwd, newPwd } = req.body;
        let flag = bcrypt.compareSync(oldPwd, results[0].password);
        if (!flag) return res.errorR(1, '原密码错误！');
        const password = bcrypt.hashSync(newPwd, 10);
        const sql = 'update users set password=? where id=?'
        db.query(sql, [password, req.user.id], (err, results) => {
            if (err) return res.errorR(1, err);
            if (results.affectedRows != 1) res.errorR(1, '修改用户密码失败！');
            res.send({ status: 0, message: '修改用户密码成功！' });
        });
    });
};

module.exports.updateAvatar = (req, res) => {
  const sql = 'update users set ? where id=?';
  db.query(sql, [req.body, req.user.id], (err, results) => {
      if (err) return res.errorR(1, err);
      if (results.affectedRows != 1) res.errorR(1, '修改用户头像失败！');
      res.send({ status: 0, message: '修改用户头像成功！' });
  })
};
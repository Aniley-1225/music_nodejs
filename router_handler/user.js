const db = require('../db/index');
// 密码加密
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config')

// 注册新用户
module.exports.register = (req, res) => {
    let { username, password } = req.body;

    const sql = 'select * from users where username=?'
    db.query(sql, username, (err, results) => {
        if (err) return res.errorR(err);
        if (results.length != 0) return res.errorR(1, '该用户名被占用，请更换后再进行注册！');
        password = bcrypt.hashSync(password, 10);

        const sql = 'insert into users(username,password) value(?,?)'
        db.query(sql, [username, password], (err, results) => {
            if (err) return res.errorR(err);
            if (results.affectedRows !== 1) return res.errorR(1, '注册失败，请稍后再试！');
            res.send({ status: 0, message: '注册成功！' })
        })
    });
};

// 登录
module.exports.login = (req, res) => {
    let { username, password } = req.body;
    
    const sql = 'select * from users where username=?'
    db.query(sql, username, (err, results) => {
        if (err) return res.errorR(1, err);
        if (results.length != 1) return res.errorR(1, '用户名不存在');
        let flag = bcrypt.compareSync(password, results[0].password);
        if (!flag) return res.errorR(1, '用户名或密码错误');
        const user = {...results[0], password: '', user_pic: '' }
        token =jwt.sign(user, config.secretKey, { expiresIn: config.expiresIn })
        res.send({ status: 0, message: '登陆成功！', token: token, id:user.id });
    })

}
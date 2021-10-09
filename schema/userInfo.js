const joi = require('joi');
const nickname = joi.string().required();
const email = joi.string().email().required();

// 更新用户基本信息更新
module.exports.update_userinfo_schema = {
  body: {
    nickname,
    email
  }
};

// 更改用户密码
const oldPwd = joi.string().pattern(/^[\S]{6,12}$/).required();
const newPwd = joi.not(joi.ref('oldPwd')).concat(oldPwd);
module.exports.update_userpwd_schema = {
  body: {
    oldPwd,
    newPwd
  }
};

// 更新用户头像
const user_pic = joi.string().dataUri().required();
module.exports.update_avatar_schema = {
    body: {
      user_pic
    }
}
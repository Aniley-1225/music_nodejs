const express = require('express');
const router = express.Router();
const userInfoHandler = require('../router_handler/userInfo');

// multipart/form-data 表单解析
const multipart=require('connect-multiparty');
const multipartMidd=multipart();

// 验证
const expressJoi = require('@escook/express-joi');
const { update_userinfo_schema, update_userpwd_schema,update_avatar_schema} = require('../schema/userInfo');

// 获取用户信息
router.get('/userInfo', userInfoHandler.userInfo);

// 修改用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateInfo);

// 修改密码
router.post('/updatepwd', expressJoi(update_userpwd_schema), userInfoHandler.updatePassword);

// 修改用户头像
router.post('/update/avatar', multipartMidd, expressJoi(update_avatar_schema), userInfoHandler.updateAvatar);
module.exports = router;
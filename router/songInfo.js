const express = require('express');
const router = express.Router();
const songInfoHandler = require('../router_handler/songInfo');

// multipart/form-data 表单解析
const multipart=require('connect-multiparty');
const multipartMidd=multipart();

// 验证
// const expressJoi = require('@escook/express-joi');
// const { } = require('../schema/userInfo');

// 获取我喜欢
router.get('/iLikeInfo', songInfoHandler.iLikeInfo);

module.exports = router;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
// 解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))


// 在注册路由之前，配置解析Token的中间件
// 导入配置文件
const config = require('./config');
// 解析token的中间件
const expressJWT = require('express-jwt');
app.use(expressJWT({ secret: config.secretKey }).unless({ path: [/^\/api\//] }));

// 结果处理失败中间件
app.use((req, res, next) => {
    res.errorR = (status, err) => {
        res.send({ status: status, message: err instanceof Error ? err.message : err })
    }
    next()
})

// 用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);


const joi = require('joi');
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.errorR(1, err);
    if (err.name === 'UnauthorizedError') return res.send({ status: 1, message: '身份认证失败' });
    res.errorR(1, err);
})

app.listen(8080, () => {
    console.log('server running at http://127.0.0.1:8080');
});
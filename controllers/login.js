'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const administrator = require('../models/administrator');

const login = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    try {
        const administratorSchema = new mongoose.Schema(administrator.schema);

        const Administrator = mongoose.model(
            'administrator',
            administratorSchema
        );

        const adminUser = await Administrator.findOne({ username, password });
        console.log(adminUser);
        if (adminUser) {
            // 如果找到管理员用户，生成 JWT Token
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: {
                        user: adminUser.username,
                        // 在实际应用中，请勿存储密码等敏感信息
                    },
                },
                config.secret
            );

            // 将 Token 设置到请求头中
            ctx.request.headers.authorization = token;
            ctx.data = { Token: token };
            ctx.msg = 'Login successful!';
            return next();
        } else {
            // 没有找到管理员用户，返回未授权错误
            throw { code: 401, message: 'Unauthorized!' };
        }
    } catch (error) {
        console.error('Error while querying database:', error);
        throw { code: 500, message: 'Internal Server Error' };
    }
};

module.exports = login;

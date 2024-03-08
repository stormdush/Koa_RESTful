'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');

const test = async (ctx, next) => {
    if (ctx.request.method === 'POST') {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: { 'user': ctx.request.body.account, 'pwd': ctx.request.body.password }
        }, config.secret);

        ctx.request.headers.authorization = token;
        ctx.data = { 'Token': token };
        ctx.msg = 'Test success!';
    } else {
        ctx.data = { 'status': 'OK!' };
        ctx.msg = 'Test success!';
        return next();
    }
    
}

module.exports = test;
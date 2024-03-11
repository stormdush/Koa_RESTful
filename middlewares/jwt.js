'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');
const { logger } = require('./logger');

const jwtVerify = async (ctx, next) => {
    const token = ctx.request.headers.authorization;
    if (ctx.request.path === '/login') {
        return next();
    }

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            logger.error(err);
            throw { code: 401, message: 'Unauthorized!' };
        }
    });

    await next();
};

module.exports = jwtVerify;

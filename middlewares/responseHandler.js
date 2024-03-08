'use strict';
const { logger } = require('./logger');

// Create response-data-style { code: 0, message: any data: any }, ctx.data is neressary
const responseData = async (ctx, next) => {
    if (ctx.data !== undefined) {
        ctx.type = 'json';
        ctx.body = {
            code: 200,
            message: ctx.msg || '',
            data: ctx.data
        }
    } else {
        ctx.type = 'json';
        ctx.body = {
            code: 404,
            message: 'Not Found',
            data: {}
        }
    }

    await next();
}

// Catch exceptions and return massage
const errorCatcher = (ctx, next) => {
    return next().catch(err => {
        if (err.code === undefined) {
            logger.error(err.stack);
        }

        ctx.body = {
            code: err.code || -1,
            massage: err.message.trim(),
            data: null
        }

        ctx.status = 200; // Return 200 to frontend, instead of exceptions

        return Promise.resolve();
    });
}

module.exports = {
    responseData,
    errorCatcher
}
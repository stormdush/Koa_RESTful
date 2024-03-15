'use strict';
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const config = require('config');

// Check logs dir, if not exis, make it
const logsDir = path.resolve(config.logger.path);

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create logger function
const logger = createLogger({
    levels: config.logger.levels,
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.align(),
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
});

// Create transports methods by daily-rotate-file
const errLogger = new transports.DailyRotateFile(
    config.logger.transportsetting.error
);
const warnLogger = new transports.DailyRotateFile(
    config.logger.transportsetting.warn
);
const infoLogger = new transports.DailyRotateFile(
    config.logger.transportsetting.info
);

logger.add(errLogger).add(warnLogger).add(infoLogger);

// Only show logs in command in debug env
if (config.env === 'debug') {
    logger.add(new transports.Console());
}

// Forbid to create and log in production env
if (config.env !== 'production') {
    const debugLogger = new transports.DailyRotateFile(
        config.logger.transportsetting.debug
    );
    logger.add(debugLogger);
}

// Create http middleware to log required and responsed activities
const httpLoger = async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;

    const remoteAddress =
        ctx.headers['x-forwarded-for'] ||
        ctx.ip ||
        ctx.ips ||
        (ctx.socket &&
            (ctx.socket.remoteAddress ||
                (ctx.socket.socket && ctx.socket.socket.remoteAddress)));
    let logText = `${ctx.method} ${ctx.status} ${
        ctx.url
    } | Required Parameters: ${JSON.stringify(
        ctx.request.body
    )} | Responsed Parameters: ${JSON.stringify(
        ctx.body
    )} | From: ${remoteAddress} | Ping: ${ms}ms`;
    logger.info(logText);
};

module.exports = {
    logger,
    httpLoger,
};

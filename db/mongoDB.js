'use strict';
const mongoose = require('mongoose');
const { logger } = require('../middlewares/logger');

const connectDB = (dbconfig) => {
    const url = `mongodb://${dbconfig.host}:${dbconfig.port}/${dbconfig.db}`;
    // connect mongoDB
    try {
        mongoose.connect(url);
        logger.info(`Connecting to MongoDB ${url}`);
    } catch (err) {
        logger.error(`Failed to connect to MongoDB ${url}, ERROR: ${err.message}`);
    }

    // Listen connection status
    const db = mongoose.connection;

    db.on('open', () => {
        logger.info(`--- MongoDB connected successful, url: ${url} ---`);
    });

    db.on('disconnected', () => {
        logger.info(`--- MongoDB disconnected, url: ${url} ---`);
    });

    db.on('error', (err) => {
        logger.error(`MongoDB ${url}, ERROR: ${err.message}`);
    });

    // connecting: Emitted when Mongoose starts making its initial connection to the MongoDB server
    // connected: Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity. May be emitted multiple times if Mongoose loses connectivity.
    // open: Emitted after 'connected' and onOpen is executed on all of this connection's models. May be emitted multiple times if Mongoose loses connectivity.
    // disconnecting: Your app called Connection#close() to disconnect from MongoDB. This includes calling mongoose.disconnect(), which calls close() on all connections.
    // disconnected: Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
    // close: Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
    // reconnected: Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
    // error: Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.

    // connecting：当 Mongoose 开始与 MongoDB 服务器建立初始连接时发出
    // connected：当 Mongoose 成功与 MongoDB 服务器建立初始连接时，或者当 Mongoose 在失去连接后重新连接时发出。如果 Mongoose 失去连接，可能会多次发出。
    // open：在该连接的所有模型上发出'connected'并onOpen执行。如果 Mongoose 失去连接，可能会多次发出。
    // disconnecting：您的应用程序调用Connection#close()断开与 MongoDB 的连接。这包括调用mongoose.disconnect()，它调用close()所有连接。
    // disconnected：当 Mongoose 失去与 MongoDB 服务器的连接时发出。此事件可能是由于您的代码显式关闭连接、数据库服务器崩溃或网络连接问题造成的。
    // closeConnection#close()：成功关闭连接后发出。如果您致电conn.close()，您将同时收到“断开连接”事件和“关闭”事件。
    // reconnected：如果 Mongoose 失去与 MongoDB 的连接并成功重新连接，则发出。Mongoose在失去与数据库的连接时会尝试自动重新连接。
    // error：如果连接发生错误（例如parseError由于数据格式错误或有效负载大于16MB） ，则发出该错误。

}

module.exports = connectDB;
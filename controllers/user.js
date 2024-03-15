'use strict';
const modelName = require('../models/user').name;
const { getAllRecords } = require('../db/dbHelper');

const user = async (ctx, next) => {
    const users = await getAllRecords(modelName, {});

    if (users) {
        const formattedUsers = users.map((user) => ({
            username: user.username,
            password: user.password,
            tel: user.tel,
        }));

        ctx.data = { users: formattedUsers };
        ctx.msg = 'OK';
        return next();
    } else {
        throw { code: 401, message: 'Unauthorized!' };
    }
};

module.exports = user;

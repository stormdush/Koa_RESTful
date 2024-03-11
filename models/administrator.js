'use strict';
module.exports = {
    name: 'administrator',
    schema: {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
    },
};

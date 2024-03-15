'use strict';
module.exports = {
    name: 'user',
    schema: {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        tel: {
            type: String,
        },
    },
};

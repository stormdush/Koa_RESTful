'use strict';
module.exports = {
    name: "user",
    schema: {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        pass: {
            type: String
        }
    }
};

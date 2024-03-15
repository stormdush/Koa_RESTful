'use strict';
const config = require('config');
const mongoose = require('mongoose');

const url =
    'mongodb://' +
    config.mongoDB.host +
    ':' +
    config.mongoDB.port +
    '/' +
    config.mongoDB.db;

mongoose.connect(url);
const db = mongoose.connection;

const Administrator = mongoose.model('Administrator', {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
});

const User = mongoose.model('User', {
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
});

// Create administrators and user collections
const Administrators = new Administrator({
    username: 'admin',
    password: 'pwd',
});

const users = [
    {
        username: 'user1',
        password: 'pwd1',
        tel: '18611112222',
    },
    {
        username: 'user2',
        password: 'pwd2',
        tel: '18611113333',
    },
];

mongoose.connect(url);

db.on('connected', () => {
    console.log(`--- MongoDB connected successful, url: ${url} ---`);
    User.insertMany(users)
        .then(() => {
            console.log('Saving users successed');
        })
        .catch((err) => {
            console.error('Saving users error:', err);
        });

    Administrators.save()
        .then(() => {
            console.log('Saving administrators successed');
        })
        .catch((err) => {
            console.error('Saving administrators error::', err);
        })
        .finally(() => {
            mongoose.connection.close();
        });
});

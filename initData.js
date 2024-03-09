'use strict';
const config = require('config');
const mongoose = require('mongoose');

const url = "mongodb://" + config.mongoDB.host + ":" + config.mongoDB.port + "/" + config.mongoDB.db;

mongoose.connect(url);
const db = mongoose.connection;

const Administrator = mongoose.model('Administrator', {
    name: String,
    password: String
});

const User = mongoose.model('User', {
    name: String,
    password: String
});

// Create administrators and user collections
const Administrators = new Administrator({
    name: 'admin',
    password: 'pwd'
});

const Users = new User({
    name: 'user',
    password: 'pwd'
});

mongoose.connect(url);

db.on('connected', () => {
    console.log(`--- MongoDB connected successful, url: ${url} ---`);
    Users.save()
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
        }).finally(() => {
            mongoose.connection.close();
        });
});


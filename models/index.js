const fs = require('fs');
const { logger } = require('../middlewares/logger')
const mongoose = require('mongoose');

// Integrate all js files under the models folder
const models = {};

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js');

// Iterate through the files
files.forEach((file) => {
    const obj = require(`./${file}`);
    console.log(obj);
    models[`${file.replace(/\.js/, '')}`] = obj;
});

module.exports = models;

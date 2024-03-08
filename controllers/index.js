'use strict';
const fs = require('fs');

// Integrate all js files under the controllers folder
const controllers = {};

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js');

// Iterate through the files
files.forEach((file) => {
    const obj = require(`./${file}`);
    controllers[`${file.replace(/\.js/, '')}`] = obj;
});

module.exports = controllers;

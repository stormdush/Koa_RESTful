'use strict';
const Router = require('koa-router');
const controllers = require('../controllers');

const router = new Router();

router.post('/login', controllers.login);

module.exports = router;

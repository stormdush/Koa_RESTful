'use strict';
const Router = require('koa-router');
const controllers = require('../controllers');
const jwtVerify = require('../middlewares/jwt');

const router = new Router();

router.use(jwtVerify);

router.get('/example', controllers.example);

module.exports = router;

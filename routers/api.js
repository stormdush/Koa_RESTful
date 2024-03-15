'use strict';
const Router = require('koa-router');
const controllers = require('../controllers');
const jwtVerify = require('../middlewares/jwt');

const router = new Router();

router.use(jwtVerify);
router.get('/user', controllers.user);

module.exports = router;

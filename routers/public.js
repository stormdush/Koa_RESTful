'use strict';
const Router = require('koa-router');
const controllers = require('../controllers');

const router = new Router();

router.post('/', async (ctx, next) => {
    controllers.example(ctx);

    const { account, password } = ctx.request.body;

    if (!account || !password) {
        ctx.data = { 'status': 'account & password are needed!' };
        ctx.msg = 'Public test success!';
    }

    return next();
});

module.exports = router;

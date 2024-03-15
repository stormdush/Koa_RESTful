'use strict';
const Koa = require('koa');
const fs = require('fs');
const config = require('config');
const { logger, httpLoger } = require('./middlewares/logger');
const { responseData, errorCatcher } = require('./middlewares/responseHandler');
const { corsControl } = require('./middlewares/cors');
const helmet = require('koa-helmet');
const session = require('koa-session');
const staticCache = require('koa-static-cache');
const favicon = require('koa-favicon');
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./routers/api');
const publicRouter = require('./routers/public');
const { loadModels, connectDB } = require('./db/mongoDB');

const app = new Koa();

// Connect MongoDB and load schema
connectDB(config.mongoDB);
loadModels(`${__dirname}/models`);

// Create static cache
app.use(
    staticCache(config.publicCache, {
        gzip: true,
        maxAge: 0,
        prefix: '/static',
    })
);

// app.use(autoModels);

// Set icon
app.use(favicon('./static/favicon.ico'));

app.use(bodyParser({ multipart: true }));

// Autolog http activities
app.use(httpLoger);
app.use(errorCatcher);

app.use(helmet());
app.use(corsControl);

app.use(apiRouter.routes(), apiRouter.allowedMethods());
app.use(publicRouter.routes(), publicRouter.allowedMethods());

// Add resp middleware below routes
app.use(responseData);

// Set session
app.keys = ['KOA'];

app.use(session(config.session, app));

app.use((ctx) => {
    // ignore faviconk
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
});

// Listen the port
const port = config.get('port');

if (config.https) {
    const https = require('https');
    const sslify = require('koa-sslify').default; // factory with default options

    app.use(sslify);

    // This is a link to create SSL Cert and Key for testing https://www.lddgo.net/encrypt/ssl
    const options = {
        key: fs.readFileSync('./pems/private.key'), // Private key path
        cert: fs.readFileSync('./pems/cert.pem'), // Certificatepath
    };

    // Create https server

    https.createServer(options, app.callback()).listen(port, () => {
        logger.info(`HTTPS server is running on port ${port}`);
    });
} else {
    app.listen(port, () => {
        logger.info(`HTTP server is running on port ${port}`);
    });
}

module.exports = {
    apps: [{
        name: 'API',    // Application name
        script: 'app.js',   // Execute file
        cwd: './',  // Application location
        args: ['0'],   // Parameters passed to the script
        instances: 1,   // Number of application startup instances, valid only in cluster mode. The default value is fork or max
        autorestart: true,
        watch: true,    // Whether to enable the monitoring mode. The default value is false. If set to true, pm2 is automatically reloaded when the application changes. Here you can also set the files you want to monitor.
        ignore_watch: [     // Ignore watched files
            'node_modules',
            'logs'
        ],
        error_file: "./logs/pm2-err.log",   // Error logs
        out_file: "./logs/pm2-out.log",     // Outputs logs
        log_date_format: "YYYY-MM-DD HH:mm:ss",
        max_memory_restart: '1G',
        env_test: {
            "NODE_ENV": "test"
        },
        env_pro: {
            "NODE_ENV": "production"
        },
        env_dev: {
            "NODE_ENV": "development"
        }
    }]
};

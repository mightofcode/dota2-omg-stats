module.exports = {
  apps: [
    {
      name: "loveomg-server",
      script: "dist/src/index.js",
      args: "",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "loveomg-spider",
      script: "dist/src/spider.js",
      args: "",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "loveomg-stats",
      script: "dist/src/stats.js",
      args: "",
      autorestart: false,
      cron_restart: "0 * * * *",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "loveomg-daily",
      script: "dist/src/daily.js",
      args: "",
      autorestart: false,
      cron_restart: "0 0 * * *",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

module.exports = {
  apps: [
    {
      name: "loveomg-server",
      script: "dist/index.js",
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
      script: "dist/spider.js",
      args: "",
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

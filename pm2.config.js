module.exports = {
  apps: [
    {
      name: 'google_reviews',
      script: 'index.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: true,
      max_memory_restart: '500M',
      args: ['--port', 8000],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

module.exports = {
  apps: [
    {
      name: 'google_reviews',
      script: 'src/index.js',
      instances: 4,
      exec_mode: 'cluster',
      watch: true,
      max_memory_restart: '500M',
      args: ['--port', 8002],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

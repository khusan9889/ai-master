// Настройки pm2: автозапуск и перезапуск сайта при сбое.
module.exports = {
  apps: [{
    name: 'aimaster',
    script: 'server/index.js',
    cwd: __dirname + '/..',
    env: { NODE_ENV: 'production', HOST: '127.0.0.1', PORT: '3000' },
    max_memory_restart: '350M',
    kill_timeout: 5000,
    time: true
  }]
};

const PROXY_CONFIG = [
  {
    context: ['/'],
    target: 'api.openweathermap.org',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true
  }

];

module.exports = PROXY_CONFIG;

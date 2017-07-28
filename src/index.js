const Redibox = require('redibox').default;
const routes = require('./routes');

const defaults = {
  prefix: '/redibox',
};

function api(app, config = defaults) {
  global.RediBox = new Redibox(config, () => {
    const { prefix } = config;
    routes(app, prefix, RediBox);
  });
}

module.exports = api;

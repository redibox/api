global.HOOK_NAME = 'api';
const Redibox = require('redibox').default;
const UserHook = require('./lib/hook').default;

const config = {
  hooks: {},
  api: {
    port: 4000,
  },
  log: {
    level: 'info',
  }
};

config.hooks[global.HOOK_NAME] = UserHook;

global.RediBox = new Redibox(config, () => {
  global.Hook = RediBox.hooks[global.HOOK_NAME];

});

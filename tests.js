global.HOOK_NAME = 'api';
const Redibox = require('redibox').default;
const UserHook = require('./lib/hook').default;
const job = require('redibox-hook-job').default;
const memset = require('redibox-hook-memset').default;

global.testSet = function () {
  return {};
};

const config = {
  hooks: { job, memset },
  api: {
    port: 4000,
  },
  job: {
    queues: [{
      name: 'test', concurrency: 1, handler() {},
    }],
  },
  memset: {
    sets: [{
      key: 'categories',
      runs: 'global.testSet',
      interval: 'every 5 minutes',
    }],
  },
  log: {
    level: 'info',
  }
};

config.hooks[global.HOOK_NAME] = UserHook;

global.RediBox = new Redibox(config, () => {
  global.Hook = RediBox.hooks[global.HOOK_NAME];

});

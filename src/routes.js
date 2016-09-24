import Router from 'koa-router';
import combineRouters from 'koa-combine-routers';
const routers = require('require-all')(`${__dirname}/routers`);

export default function (core) {
  const hookRouters = [
    new Router({ prefix: '/core' }),
  ];

  routers.core.default(core, hookRouters[0]);

  Object.keys(core.hooks).forEach(key => {
    if (routers[key]) {
      hookRouters.push(new Router({
        prefix: `/${key}`,
      }));

      routers[key].default(core, hookRouters[hookRouters.length]);
    }
  });

  return combineRouters(hookRouters);
};

const { getUptime } = require('./utils');

function routes(app, prefix, core) {
  const get = (path, cb) => app.get(`${prefix}${path}`, cb);

  get('/', (req, res) => {
    const hooks = {};
    const keys = Object.keys(core.hooks);

    for (let i = 0; i < keys.length; i++) {
      const hook = core.hooks[keys[i]];
      hooks[keys[i]] = Object.assign({}, hook.options);
    }

    res.json({
      prefix,
      id: core.id,
      options: core.options,
      uptimeSeconds: getUptime(core.bootedAtTimestamp),
      clientsCount: core._clientCount,
      hostInfo: core.hostInfo(),
      scripts: core.scripts,
      hooks,
    });
  });

  // get('/prefix', (req, res) => {
  //   res.json(prefix);
  // });
  //
  // get('/id', (req, res) => {
  //   res.json(core.id);
  // });
  //
  // get('/options', (req, res) => {
  //   res.json(core.options);
  // });
  //
  // get('/options/redis', (req, res) => {
  //   res.json(core.options.redis);
  // });
  //
  // get('/options/redis/hosts', (req, res) => {
  //   res.json(core.options.redis.hosts);
  // });
  //
  // get('/uptime', (req, res) => {
  //   res.json(getUptime(core.bootedAtTimestamp));
  // });

  get('/hooks', (req, res) => {
    res.json(Object.keys(core.hooks));
  });

  get('/hooks/:name', (req, res) => {
    const name = req.param('name');
    res.json(core.hooks[name].options);
  });

  get('/hooks/:name/:method', (req, res) => {
    const name = req.param('name');
    const method = req.param('method');

    if (core.hooks[name] && core.hooks[name][method] && typeof core.hooks[name][method] === 'function') {
      core.hooks[name][method](/* todo args */).then(result => {
        res.json(result)
      }).catch(error => {
        res.error(error);
      });
    } else {
      // todo return 404
    }
  });

  // get('/clientscount', (req, res) => {
  //   res.json(core._clientCount);
  // });
  //
  // get('/hostinfo', (req, res) => {
  //   res.json(core.hostInfo());
  // });
  //
  // get('/scripts', (req, res) => {
  //   res.json(core.scripts);
  // });
}

module.exports = routes;

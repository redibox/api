const { getUptime, getHooks } = require('./utils');

function routes(app, prefix, core) {
  const get = (path, cb) => app.get(`${prefix}${path}`, cb);

  get('/', (req, res) => {
    res.json({
      id: core.id,
      options: core.options,
      uptimeSeconds: getUptime(core.bootedAtTimestamp),
      hooks: getHooks(core.hooks),
      clientsCount: core._clientCount,
      hostInfo: core.hostInfo(),
      scripts: core.scripts,
    });
  });

  get('/id', (req, res) => {
    res.json(core.id);
  });

  get('/options', (req, res) => {
    res.json(core.options);
  });

  get('/uptime', (req, res) => {
    res.json(getUptime(core.bootedAtTimestamp));
  });

  get('/hooks', (req, res) => {
    res.json(getHooks(core.hooks));
  });

  get('/clientscount', (req, res) => {
    res.json(core._clientCount);
  });

  get('/hostinfo', (req, res) => {
    res.json(core.hostInfo());
  });

  get('/scripts', (req, res) => {
    res.json(core.scripts);
  });
}

module.exports = routes;

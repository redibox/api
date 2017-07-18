const getUptime = ts => Math.floor((Date.now() - ts) / 1000);

const getHooks = hs => Object.keys(hs);

module.exports = {
  getUptime,
  getHooks,
};

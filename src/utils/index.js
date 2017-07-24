const { dateNow } = require('./aliases');

const getUptime = ts => Math.floor((dateNow() - ts) / 1000);

module.exports = {
  getUptime,
};

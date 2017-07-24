const { getUptime } = require('../');
const { dateNow } = require('../aliases');

jest.mock('../aliases');

describe('getUptime', () => {
  it('returns the elapsed time in seconds from now', () => {
    dateNow.mockImplementation(() => 3000);
    expect(getUptime(1000)).toBe(2);
  });
});


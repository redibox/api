const api = require('../');

describe.skip('api', () => {
  it('returns a callback function', () => {
    expect(typeof api()).toBe('function');
  });

  it('calls next', () => {
    const nextFn = jest.fn();
    api()(null, null, nextFn);
    expect(nextFn).toBeCalled();
  });
});

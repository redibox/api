import auth from 'koa-basic-auth';

/*
 Default Configuration
 */
export default {
  enabled: true,
  host: '127.0.0.1',
  port: 1337,
  env: process.env.NODE_ENV || 'development',
  backlog: null,
  auth: {
    enabled: false,
    name: 'foo',
    pass: 'bar',
    middleware(hook) {
      return auth({
        name: hook.options.auth.name,
        pass: hook.options.auth.pass,
      });
    },
  },
};


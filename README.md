[![Coverage Status](https://coveralls.io/repos/github/redibox/api/badge.svg?branch=master)](https://coveralls.io/github/redibox/api?branch=master)
![Downloads](https://img.shields.io/npm/dt/redibox-hook-api.svg)
[![npm version](https://img.shields.io/npm/v/redibox-hook-api.svg)](https://www.npmjs.com/package/redibox-hook-api)
[![dependencies](https://img.shields.io/david/redibox/api.svg)](https://david-dm.org/redibox/api)
[![build](https://travis-ci.org/redibox/api.svg)](https://travis-ci.org/redibox/api)
[![License](https://img.shields.io/npm/l/redibox-hook-api.svg)](/LICENSE)

## RediBox API

This hook provides a JSON API for RediBox & any custom installed hooks. Built on [Koa v2](http://koajs.com).

> **This is still a work in progress.**

### Installation

First ensure you have [RediBox](https://github.com/redibox/core) installed.

Install API via npm:

`npm install redibox-hook-api --save`

### Usage

#### Configure api

By default your API will work out of the box, accessible at [http://127.0.0.1:1337](http://127.0.0.1:1337) with no authentication.

To override the defaults, create a new `api` object within your `redibox` config:

- **enabled** [Boolean]
  - default: `true`
If false, the API hook will simply do nothing. This is currently a very crude way to potentially handle multiple API instances in a multi-server environment.

- **host** [String]
  - default: `127.0.0.1`

- **port** [Number]
  - default: `1337`

- **env** [String]
  - default: `process.env.NODE_ENV` or `development`

- **auth** [Object]
See [authentication](https://github.com/redibox/api#authentication).

```javascript
{
  api: {
    port: 4000,
    env: 'production',
  },
}
```

### Routes

Routes work on a per hook basis, depending on what is installed & all routes are prefixed by their hook name. Since you've got this hook installed,
both `core` & `api` are available at minimum on the API.

- [Core](https://github.com/redibox/api/blob/master/docs/core.md)
- [API](https://github.com/redibox/api/blob/master/docs/api.md)
- [Job](https://github.com/redibox/api/blob/master/docs/job.md)
- [Schedule](https://github.com/redibox/api/blob/master/docs/schedule.md)
- [Cache](https://github.com/redibox/api/blob/master/docs/cache.md)
- [Memset](https://github.com/redibox/api/blob/master/docs/memset.md)

### Authentication

By default, authentication is disabled. If enabled, the default authentication method is [Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication).
The default username is `foo` & password is `bar`.

To configure authentication, pass the following options into the `auth` object in your `redibox.api` config:

- **enabled** [Boolean]
  - default: false
If `false`, authentication will be disabled across the entire API.

- **name** [String]
  - default: `foo`
The username for Basic Authentication.

- **pass** [String]
  - default: `bar`
The password for Basic Authentication.

- **middleware** [Function]
  - default: [basic-auth](https://github.com/koajs/basic-auth)


It is possible to provide your own authentication method (e.g. OAuth 2). The middleware function
provides the current hook as the only parameter, if needed. The function should return a Koa middleware compatible function.

The below example is loading a cached authentication token from Redis. This is just a basic example of
how to apply asynchronous authentication middleware.

```javascript
middleware(hook) {
  return async function getUser(ctx, next){
    const token = ctx.header.token;

    // Redis GET command
    return hook.client
      .get(token)
      .then(user => {
        if (!user) {
          return ctx.throw(401);
        }

        ctx.user = user;
        return next();
      });
  };
}
```

### License

MIT

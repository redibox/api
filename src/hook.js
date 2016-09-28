import Koa from 'koa';
import defaults from './defaults';
import router from './routes';
import { BaseHook, getTimeStamp, isFunction } from 'redibox';

const app = new Koa();

export default class Scheduler extends BaseHook {
  constructor() {
    super('api');
  }

  /**
   *
   * @returns {Promise.<T>}
   */
  initialize() {
    if (!this.options.enabled) {
      return Promise.resolve();
    }

    app.name = 'redibox-hook-api';
    app.env = this.options.env;

    // Return a structured format response
    app.use(async(ctx, next) => {
      await next();

      if (ctx.body) {
        ctx.body = {
          code: ctx.status,
          payload: ctx.body,
        };
      }
    });

    // Handle un-authorized requests
    app.use(async(ctx, next) => {
      try {
        await next();
      } catch (err) {
        if (err.status === 401) {
          ctx.status = 401;
          ctx.set('WWW-Authenticate', 'Basic');
          ctx.body = 'You are not authorized to access this resource.';
        } else {
          throw err;
        }
      }
    });

    // Apply authentication if enabled
    if (this.options.auth.enabled && this.options.auth.middleware && isFunction(this.options.auth.middleware)) {
      app.use(this.options.auth.middleware(this));
    }

    // Handle server errors
    app.use(async(ctx, next) => {
      try {
        await next();
      } catch (error) {
        this.errorLogger(error);
        ctx.status = 500;

        ctx.body = {
          code: ctx.status,
          payload: {
            error: error.message,
            stack: error.stack.split('\n'),
          },
        };
      }
    });

    // Handle 404s
    app.use(async(ctx, next) => {
      await next();

      if (ctx.status !== 404) return;

      ctx.status = 404;
      ctx.body = 'The requested resource cannot be found.';
    });

    // Apply routes
    app.use(router(this.core));

    // Listen to inbound HTTP calls
    return new Promise((resolve, reject) => {
      app.listen(this.options.port, this.options.host, this.options.backlog, error => {
        if (error) {
          return reject(error);
        }

        this.log.info(`API listening at http://${this.options.host}:${this.options.port}`);
        return resolve();
      });
    });
  }

  /**
   *
   * @param error
   */
  errorLogger(error) {
    this.log.error(`${getTimeStamp()}: An API error occurred.`);
    this.log.error(error);
  }

  // noinspection JSUnusedGlobalSymbols,JSMethodCanBeStatic
  /**
   * Default config for scheduler
   * @returns {{someDefaultThing: string}}
   */
  defaults() {
    return defaults;
  }

}

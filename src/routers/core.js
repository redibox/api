export default function (core, router) {
  router
  /**
   * Returns basic information about core RediBox setup.
   */
    .get('/', ctx => {
      const options = Object.assign({}, core.options);
      delete options.hooks;

      ctx.body = {
        id: core.id,
        options,
        uptimeSeconds: Math.floor((Date.now() - core.bootedAtTimestamp) / 1000),
        hooks: Object.keys(core.hooks).length,
        clients: core._clientCount,
      };
    })

    /**
     * Returns the current host information
     */
    .get('/host-info', ctx => {
      ctx.body = core.hostInfo();
    })

    /**
     * Returns all injected lua scripts
     */
    .get('/scripts', ctx => {
      ctx.body = core.scripts;
    })

    /**
     * Returns an array of currently installed hooks
     */
    .get('/hooks', ctx => {
      ctx.body = Object.keys(core.hooks);
    })

    /**
     * Returns information about a specific installed hook
     */
    .get('/hooks/:hook', ctx => {
      let hook = ctx.params.hook;

      if (!core.hooks[hook]) {
        ctx.status = 404;
        return;
      }

      hook = core.hooks[hook];

      ctx.body = {
        defaults: hook.defaults(),
        options: hook.options,
        clients: Object.keys(hook.clients),
        scripts: hook.scripts(),
      };
    });
}

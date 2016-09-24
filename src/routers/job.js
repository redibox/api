export default function (core, router, hook) {
  router

    /**
     * Returns stats on all jobs
     */
    .get('/', (ctx) => {
      // TODO Totals of each queue
      ctx.body = {
        pendingSave: hook.autoCreateQueue ? Object.keys(hook.autoCreateQueue) : [],
      };
    })

    /**
     * List all queues
     */
    .get('/queues', (ctx) => {
      ctx.body = hook.options.queues;
    })

    /**
     * Return information on a specific queue
     */
    .get('/queues/:queue', (ctx) => {
      let queue = ctx.params.queue;

      if (!hook.queues[queue]) {
        ctx.status = 404;
        return;
      }

      queue = hook.queues[queue];

      ctx.body = {
        name: queue.name,
        paused: queue.paused,
        started: queue.started,
        throttled: queue.throttled,
        handler: !!queue.handler,
        options: queue.options,
      };
    })

    /**
     * Return information on a specific queue
     */
    .get('/queues/:queue/jobs', (ctx) => {
      let queue = ctx.params.queue;

      if (!hook.queues[queue]) {
        ctx.status = 404;
        return;
      }

      queue = hook.queues[queue];

      // TODO attach jobs

      ctx.body = {
        waiting: [],
        active: [],
      };
    })

    /**
     * Create a job in a queue
     */
    .post('/queues/:queue/jobs', (ctx) => {
      // TODO create job in queue
      ctx.body = {};
    })

    /**
     * Deletes all jobs in a queue
     */
    .delete('/queues/:queue/jobs', (ctx) => {
      // TODO delete jobs in queue
      ctx.body = {};
    })

    /**
     * Return information on a specific job in a queue
     */
    .get('/queues/:queue/jobs/:job', (ctx) => {
      // TODO get specific job
      ctx.body = {};
    })

    /**
     *
     */
    .delete('/queues/:queue/jobs/:job', (ctx) => {
      // TODO delete specific job
      ctx.body = {};
    })
}

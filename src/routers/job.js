export default function (core, router) {
  router

    .get('/', (ctx) => {
      ctx.body = {
        foo: 'job',
      };
    })

    .post('/create', (ctx) => {

      ctx.body = {
        foo: 'job',
      };
    })
}

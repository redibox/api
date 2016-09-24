export default function (core, router) {
  router.get('/', (ctx, next) => {
    ctx.body = {
      foo: 'job',
    };
  });
}

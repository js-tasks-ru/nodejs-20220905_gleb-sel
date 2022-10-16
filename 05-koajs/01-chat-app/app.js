const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());
// записывает значение в ctx.request.body;


const Router = require('koa-router');
const router = new Router();
// let longpoling = true;
const messages = [];

router.get('/subscribe', async (ctx, next) => {
  await new Promise((resolve) => {
    if (ctx.state.longpoling !== undefined && !ctx.state.longpoling ) {
      console.log('test');
      resolve(ctx.state.longpoling = true);
    }
  }).then(() => {
    ctx.status = 200;
    messages[0] ? ctx.body = messages.pop() : null;
  });
});

router.post('/publish', async (ctx, next) => {
  // clearInterval(ctx.state.timer);
  messages.push(ctx.request.body.message);
  ctx.body = 'сообщение отправлено ok';
  ctx.status = 201;
  ctx.state.longpoling = false;
});

app.use(router.routes());

module.exports = app;

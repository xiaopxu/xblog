//获取path
const path = require('path')
//获取fs
const fs = require('fs')
//获取koa2
const Koa = require('koa2')
//实例化koa2
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const koaStatic = require('koa-static')
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const resolve = file => path.resolve(__dirname, file)
//中间件挂载
app.use(koaStatic(__dirname + "../dist"));
app.use(bodyparser);
app.use(json());
app.use(logger());

// router.get('/', async(ctx, next) => {
//   //   const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   const html = `
//     <ul>
//       <li><a href="/page/helloworld">/page/helloworld</a></li>
//       <li><a href="/page/404">/page/404</a></li>
//     </ul>
//   `
//   ctx.body = html
// })

// response
app.use(ctx => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  //   const html = `
  //     <ul>
  //       <li><a href="/page/helloworld">/page/helloworld</a></li>
  //       <li><a href="/page/404">/page/404</a></li>
  //     </ul>
  //   `
  ctx.body = html;
});
app.use(router.routes()).use(router.allowedMethods())
// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

app.listen(3000);



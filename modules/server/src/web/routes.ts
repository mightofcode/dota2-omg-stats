import Koa, { Context } from "koa";
import Router = require("koa-router");

const router = new Router();
router.all("/test", async function (ctx: Context) {
  ctx.body = {
    hello: "world",
  };
});

const featureRouters = [router];

export default (app: Koa) => {
  for (const router of featureRouters) {
    app.use(router.routes()).use(router.allowedMethods({ throw: true }));
  }
};

import Koa, { Context } from "koa";
import Router = require("koa-router");
import { dbRun, dbAll, dbGet } from "../utils/db";
import { getKv } from "../utils/kv";

const router = new Router();

router.all("/test", async function (ctx: Context) {
  ctx.body = {
    hello: "world",
  };
});

router.all("/ability", async function (ctx: Context) {
  const winrates = await dbAll(
    "select * from ability_winrate where match_count>100 order by winrate desc "
  );
  ctx.body = {
    winrates,
  };
});

router.all("/hero", async function (ctx: Context) {
  const winrates = await dbAll(
    "select * from hero_winrate where match_count>100 order by winrate desc "
  );
  ctx.body = {
    winrates,
  };
});

router.all("/combo", async function (ctx: Context) {
  const winrates = await dbAll(
    "select * from combo_winrate where match_count>100 order by winrate desc "
  );
  ctx.body = {
    winrates,
  };
});
router.all("/synergy", async function (ctx: Context) {
  const winrates = await dbAll(
    "select * from combo_winrate_synergy where match_count>100 order by synergy desc"
  );
  ctx.body = {
    winrates,
  };
});

router.all("/heroSkillCombo", async function (ctx: Context) {
  const winrates = await dbAll(
    "select * from heroskill_combo_winrate where match_count>50 order by winrate desc "
  );
  ctx.body = {
    winrates,
  };
});

router.all("/heroSkillSynergy", async function (ctx: Context) {
  const winrates = await dbAll(
    "select * from heroskill_combo_synergy where match_count>50 order by synergy desc "
  );
  ctx.body = {
    winrates,
  };
});

router.all("/stats", async function (ctx: Context) {
  const count = await dbGet("select count(*) as count from match");
  const first = await dbGet(
    "select match_id,match_time from match order by match_id asc"
  );
  const last = await dbGet(
    "select match_id,match_time from match order by match_id desc"
  );

  const statsUpdate = await getKv("statsUpdate");

  ctx.body = {
    count: count?.count || 0,
    first,
    last,
    statsUpdate,
  };
});

const featureRouters = [router];

export default (app: Koa) => {
  for (const router of featureRouters) {
    app.use(router.routes()).use(router.allowedMethods({ throw: true }));
  }
};

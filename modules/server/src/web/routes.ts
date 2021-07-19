import Koa, { Context } from "koa";
import Router = require("koa-router");
import { dbRun, dbAll, dbGet } from "../utils/db";
import { getKv, setKv } from "../utils/kv";

const mime = require("mime-types");
const koaBody = require("koa-body")({ multipart: true, uploadDir: "." });
import fs from "fs";
import { HttpError } from "../utils/HttpError";
import { crackAllProcess } from "../crack/crack";

const multer = require("@koa/multer");
const router = new Router();
const upload = multer();

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

const randomString = () => {
  const crypto = require("crypto");
  const id = crypto.randomBytes(10).toString("hex");
  return id;
};
const path = require("path");
router.all("/crack", upload.single("file"), async function (ctx: Context) {
  // @ts-ignore
  const body = ctx.request.body;
  const filename = ctx?.file?.originalname || "";
  console.log("ctx.file", ctx.file);
  if (filename.endsWith(".png") || filename.endsWith(".jpg")) {
    const dir = randomString();
    fs.mkdirSync(`./tmp/${dir}`);
    const filePath = `./tmp/${dir}/${filename}`;
    fs.writeFileSync(filePath, ctx.file.buffer);
    const res = await crackAllProcess(path.resolve(filePath));
    console.log("write", filePath);
    ctx.body = res;

    const callCount = await getKv("crackCount");
    console.log(callCount);
    if (!callCount) {
      await setKv("crackCount", "0");
    } else {
      if (+callCount >= 100) {
        throw new HttpError(400, {
          file: ["too many request"],
        });
      }
      await setKv("crackCount", (+callCount + 1).toString());
    }
  } else {
    throw new HttpError(400, {
      file: ["png or jpe required"],
    });
  }
  //
});

const featureRouters = [router];

export default (app: Koa) => {
  for (const router of featureRouters) {
    app.use(router.routes()).use(router.allowedMethods({ throw: true }));
  }
};

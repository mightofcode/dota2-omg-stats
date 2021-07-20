import { createEvalAwarePartialHost } from "ts-node/dist/repl";

const fs = require("fs");
const path = require("path");
const util = require("util");
const sharp = require("sharp");

const AipImageSearchClient = require("baidu-aip-sdk").imageSearch;

const APP_ID = process.env.BAIDU_APP_ID;
const API_KEY = process.env.BAIDU_API_KEY;
const SECRET_KEY = process.env.BAIDU_SECRET_KEY;

const client = new AipImageSearchClient(APP_ID, API_KEY, SECRET_KEY);

const imgBlackList = [
  319, 320, 321, 322, 333, 338, 343, 419, 425, 539, 543, 547, 550, 553, 602,
  605, 630, 641, 642, 643, 648, 649, 650, 651, 656, 660, 661, 662, 683, 687,
  694, 699, 701, 728, 701, 729, 5034, 5057, 5058, 5060, 5061, 5070, 5252, 5253,
  5251, 5343, 5344, 5367, 5370, 5371, 5372, 5373, 5374, 5375, 5433, 5441, 5453,
  5454, 5466, 5475, 5477, 5478, 5479, 5484, 5489, 5490, 5493, 5503, 5523, 5567,
  5592, 5617, 5610, 5624, 5627, 5628, 5648, 5644, 5645, 5646, 5649, 5666, 5672,
  5673, 5719, 5724, 6325, 6459, 7116, 6937, 7231, 7318, 7319, 7852, 7850, 7851,
  7903, 8027, 8028, 8029, 8030, 8106, 8107, 8159, 9627, 6486, 5722, 5635, 5528,
  5424, 5449, 7853,
];

const similarAdd = util.promisify(client.similarAdd.bind(client));
const similarDeleteByImage = util.promisify(
  client.similarDeleteByImage.bind(client)
);
const similarSearch = util.promisify(client.similarSearch.bind(client));

const getIdFromName = (name: string) => {
  if (!name) {
    return null;
  }
  const id = +name.substr(0, name.search("\\."));
  return id;
};

export const crackOneClip = async (file?: string) => {
  if (!file) {
    return null;
  }
  const image = fs.readFileSync(file).toString("base64");
  let res = null;

  for (let i = 0; i < 100; i++) {
    try {
      res = await client.similarSearch(image, { pn: 0, rn: 1 });
    } catch (e) {
      console.log("req error");
      break;
    }
    if (res?.result && res?.result.length > 0) {
      break;
    }
  }
  let brief = null;
  if (res?.result && res?.result.length > 0) {
    brief = res?.result[0]?.brief;
  }
  const id = getIdFromName(brief);
  console.log("crackOneClip", file, id);
  return id;
};

import clips from "../../data/omgClips.json";

const randomString = () => {
  const crypto = require("crypto");
  const id = crypto.randomBytes(10).toString("hex");
  return id;
};

export interface Clip {
  file?: string;
  x: number;
  y: number;
  id: number;
}

export const crack = async (file: string) => {
  let index = 0;
  const clipResults: Clip[] = [];
  const dir = randomString();
  fs.mkdirSync(`./tmp/${dir}`, { recursive: true });
  for (const clip of clips.clips) {
    console.log("clip", clip.x, clip.y);
    const filePath = `./tmp/${dir}/${index}-${clip.x}-${clip.y}.png`;
    clipResults.push({
      file: filePath,
      x: clip.x,
      y: clip.y,
      id: 0,
    });

    await sharp(file)
      .extract({
        left: clip.x,
        top: clip.y,
        width: clip.xlen,
        height: clip.ylen,
      })
      .toFile(filePath);

    index += 1;
  }
  //
  const promises = [];
  for (const f of clipResults) {
    const f1 = f;
    const task = async () => {
      const id = await crackOneClip(f1.file);
      f1.file = undefined;
      if (id) {
        f1.id = id;
      }
    };
    promises.push(task());
    if (promises.length == 2) {
      await Promise.all(promises);
      promises.length = 0;
    }
  }
  //
  await Promise.all(promises);
  console.log(clipResults);
  return clipResults;
};

import { dbRun, dbAll, dbGet } from "../utils/db";

export const fillWinrates = async (clips: Clip[]) => {
  const ids = clips.map((v) => {
    return v.id;
  });
  //
  let idStr = ids.join(",");
  const abilities = await dbAll(
    `select * from ability_winrate where id in (${idStr}) order by winrate desc`
  );
  const abilityCombo = await dbAll(
    `select * from combo_winrate_synergy order by winrate desc`
  );
  const foundAbilityCombo = [];
  for (const v of abilityCombo) {
    if (ids.includes(v.id1) && ids.includes(v.id2)) {
      foundAbilityCombo.push(v);
    }
  }
  //console.log(abilities);
  return { clips, combos: foundAbilityCombo, abilities };
};

export const crackAllProcess = async (file: string) => {
  const clips = await crack(file);
  const res = await fillWinrates(clips);
  console.log(res);
  return res;
};

export const uploadFile = async () => {
  const readDirMain = fs.readdirSync("../next/public/ability");
  console.log(readDirMain);
  for (const f of readDirMain) {
    const id = +f.substr(0, f.search("\\."));
    if (imgBlackList.includes(id)) {
      console.log("skip", f);
    } else {
      const filePath = "../next/public/ability/" + f;
      console.log("upload", filePath);
      const image = fs.readFileSync(filePath).toString("base64");
      const name = path.basename(filePath);
      await client.similarDeleteByImage(image);
      await client.similarAdd(image, { brief: name });
    }
  }
};

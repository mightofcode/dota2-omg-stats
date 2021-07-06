import http from "http";

const https = require("https");
import dotenv from "dotenv";
import { Server } from "socket.io";
import axios from "axios";
import dotaSchinese from "../data/dota_schinese.json";
import abilitiesSchinese from "../data/abilities_schinese.json";
import npcAbilities from "../data/npc_abilities.json";
import npcHeroes from "../data/npc_heroes.json";

var fs = require("fs");
const util = require("util");

dotenv.config();

console.log("start stats");

var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./dbData/sqlite3.db");

var dbRun = util.promisify(db.run.bind(db));
var dbGet = util.promisify(db.get.bind(db));
var dbAll = util.promisify(db.all.bind(db));

interface Hero {
  id: number;
  name: string;
  name_en: string;
  name_cn: string;
  attribute: string;
  ranged: boolean;
  matchCount: number;
  winCount: number;
  winrate: number;
}

interface Ability {
  id: number;
  name: string;
  name_en: string;
  name_cn: string;
  matchCount: number;
  winCount: number;
  winrate: number;
}

const herosIdMap: { [key: number]: Hero } = {};
const abilitiesIdMap: { [key: number]: Ability } = {};
const herosNameMap: { [key: string]: Hero } = {};
const abilitiesNameMap: { [key: string]: Ability } = {};

const getAttribute = (s: string) => {
  return s.split("_")[2].toLowerCase();
};
const getRanged = (s: string) => {
  return s == "DOTA_UNIT_CAP_RANGED_ATTACK";
};
const collectMetaInfo = () => {
  console.log("collectMetaInfo");
  const heros: any = npcHeroes.DOTAHeroes;
  for (const k in heros) {
    let v = heros[k];
    if (k.startsWith("npc_dota_hero") && k != "npc_dota_hero_base") {
      //
      let hero: Hero = {
        id: v.HeroID,
        name: k,
        name_en: "",
        name_cn: "",
        attribute: getAttribute(v.AttributePrimary),
        ranged: getRanged(v.AttackCapabilities),
        matchCount: 0,
        winCount: 0,
        winrate: 0,
      };
      herosNameMap[k] = hero;
      herosIdMap[v.HeroID] = hero;
    }
  }
  console.log("load hero ", Object.keys(herosNameMap).length);
};
const parseMatch = () => {
  console.log("parseMatch");
};
const saveToDb = () => {
  console.log("saveToDb");
};
const main = async () => {
  collectMetaInfo();
  parseMatch();
  saveToDb();
};
main();

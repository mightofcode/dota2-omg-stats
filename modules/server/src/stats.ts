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
  abilities: string[];
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
const activeAbilityMap: { [key: string]: boolean } = {};

const getAttribute = (s: string) => {
  return s.split("_")[2].toLowerCase();
};
const getRanged = (s: string) => {
  return s == "DOTA_UNIT_CAP_RANGED_ATTACK";
};
const collectHeroMetaInfo = () => {
  console.log("collectMetaInfo");
  const heros: any = npcHeroes.DOTAHeroes;
  for (const k in heros) {
    let v = heros[k];
    if (k.startsWith("npc_dota_hero") && k != "npc_dota_hero_base") {
      //
      const abilityList = [];
      for (let i = 0; i < 20; i++) {
        const skillId = v["Ability" + (i + 1)];
        if (
          skillId &&
          !skillId.startsWith("special_bonus") &&
          skillId != "generic_hidden"
        ) {
          abilityList.push(skillId);
          activeAbilityMap[skillId] = true;
        }
      }
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
        abilities: abilityList,
      };
      herosNameMap[k] = hero;
      herosIdMap[v.HeroID] = hero;
    }
  }
  console.log(
    `collectHeroMetaInfo ${Object.keys(herosNameMap).length} ability count ${
      Object.keys(activeAbilityMap).length
    }`
  );
};
const collectAbilityMetaInfo = () => {
  //
  console.log("collectMetaInfo");
  const abilities: any = npcAbilities.DOTAAbilities;
  for (const k in abilities) {
    let v = abilities[k];
    if (activeAbilityMap[k]) {
      //

      let ability: Ability = {
        id: v.ID,
        name: k,
        name_en: "",
        name_cn: "",
        matchCount: 0,
        winCount: 0,
        winrate: 0,
      };
      abilitiesNameMap[k] = ability;
      abilitiesIdMap[v.ID] = ability;
    }
  }
  console.log(
    `collectAbilityMetaInfo count ${Object.keys(abilitiesNameMap).length}`
  );
};
const parseMatch = () => {
  console.log("parseMatch");
};
const saveToDb = () => {
  console.log("saveToDb");
};
const main = async () => {
  collectHeroMetaInfo();
  collectAbilityMetaInfo();
  parseMatch();
  saveToDb();
};
main();

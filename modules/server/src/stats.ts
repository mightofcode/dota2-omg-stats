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

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./dbData/sqlite3.db");

const dbRun = util.promisify(db.run.bind(db));
const dbGet = util.promisify(db.get.bind(db));
const dbAll = util.promisify(db.all.bind(db));

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
    const v = heros[k];
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
    const v = abilities[k];
    if (activeAbilityMap[k]) {
      //

      const ability: Ability = {
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
const handleMatch = async (match: any) => {
  console.log(match.match_id);
  const matchData = JSON.parse(match.data);
  const radiant_win = matchData.radiant_win == 1;
  const players = matchData.players || [];
  const heros: any = {};
  const abilities: any = {};

  const isRadiant = (slot: number) => {
    return slot < 128;
  };

  players.forEach((v: any) => {
    const radiant = isRadiant(v.player_slot);
    let win = false;
    if (radiant) {
      win = radiant_win;
    } else {
      win = !radiant_win;
    }
    heros[v.hero_id] = win;
    const abilityUpgrade = v.ability_upgrades || [];
    abilityUpgrade.forEach((ability: any) => {
      abilities[ability.ability] = win;
    });
  });
  //console.log(heros,abilities);
  //
  for (const key of Object.keys(heros)) {
    const hero = herosIdMap[+key];
    if (hero) {
      hero.matchCount += 1;
      if (heros[key]) {
        hero.winCount += 1;
      }
      if (hero.matchCount >= 1) {
        hero.winrate = hero.winCount / hero.matchCount;
      }
    }
  }
  for (const key of Object.keys(abilities)) {
    const ability = abilitiesIdMap[+key];
    if (ability) {
      ability.matchCount += 1;
      if (abilities[key]) {
        ability.winCount += 1;
      }
      if (ability.matchCount >= 1) {
        ability.winrate = ability.winCount / ability.matchCount;
      }
    }
  }
};
const parseMatch = async () => {
  let lastId = 0;
  while (true) {
    const matchs = await dbAll(
      `select * from match where match_id>${lastId} order by match_id limit 100`
    );
    console.log("matchs ", matchs.length);
    if (matchs.length == 0) {
      break;
    }
    matchs.forEach((v: any) => {
      handleMatch(v);
    });
    lastId = matchs[matchs.length - 1].match_id + 1;
  }
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

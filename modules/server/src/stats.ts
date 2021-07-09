import http from "http";

const https = require("https");
import dotenv from "dotenv";
import { Server } from "socket.io";
import axios from "axios";

import { dbRun, dbAll, dbGet } from "./utils/db";
import { setKv } from "./utils/kv";
import { loadDota2Kv } from "./utils/dota2kv";

var fs = require("fs");
const util = require("util");

dotenv.config();

console.log("start stats");

const dotaSchinese = loadDota2Kv("data/dota_schinese.txt");
console.log(1);
const npcAbilities = loadDota2Kv("data/npc_abilities.txt");
console.log(2);
const npcHeroes = loadDota2Kv("data/npc_heroes.txt");
console.log(3);
const abilitiesSchinese = loadDota2Kv("data/abilities_schinese.txt");
console.log(4);

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

interface Combo {
  id1: number;
  id2: number;
  name1: string;
  name_en1: string;
  name_cn1: string;
  name2: string;
  name_en2: string;
  name_cn2: string;
  matchCount: number;
  winCount: number;
  winrate: number;
}

const herosIdMap: { [key: number]: Hero } = {};
const abilitiesIdMap: { [key: number]: Ability } = {};
const herosNameMap: { [key: string]: Hero } = {};
const abilitiesNameMap: { [key: string]: Ability } = {};
const activeAbilityMap: { [key: string]: boolean } = {};
const comboMap: { [key: string]: Combo } = {};

const getAttribute = (s: string) => {
  return s.split("_")[2].toLowerCase();
};
const getRanged = (s: string) => {
  return s == "DOTA_UNIT_CAP_RANGED_ATTACK";
};
const collectHeroMetaInfo = () => {
  console.log("collectMetaInfo");
  //
  const tokenMap: any = dotaSchinese.lang.Tokens;

  const heros: any = npcHeroes.DOTAHeroes;
  for (const k in heros) {
    const v = heros[k];
    if (
      k.startsWith("npc_dota_hero") &&
      k != "npc_dota_hero_base" &&
      !k.includes("dummy")
    ) {
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
        name_cn: tokenMap[k] || "",
        attribute: getAttribute(v.AttributePrimary),
        ranged: getRanged(v.AttackCapabilities),
        matchCount: 0,
        winCount: 0,
        winrate: 0,
        abilities: abilityList,
      };
      herosNameMap[k] = hero;
      herosIdMap[v.HeroID] = hero;
      //
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
  const strMap: any = abilitiesSchinese.lang.Tokens;
  const abilities: any = npcAbilities.DOTAAbilities;
  for (const k in abilities) {
    const v = abilities[k];
    if (activeAbilityMap[k]) {
      //
      const ability: Ability = {
        id: v.ID,
        name: k,
        name_en: "",
        name_cn:
          strMap["DOTA_Tooltip_ability_" + k] ||
          strMap["DOTA_Tooltip_Ability_" + k],
        matchCount: 0,
        winCount: 0,
        winrate: 0,
      };
      abilitiesNameMap[k] = ability;
      abilitiesIdMap[v.ID] = ability;
    }
  }
  //
  const abilityIds = Object.keys(abilitiesIdMap)
    .map((v) => {
      return +v;
    })
    .sort();
  for (let i = 0; i < abilityIds.length; i++) {
    for (let j = i + 1; j < abilityIds.length; j++) {
      const id1 = abilityIds[i];
      const id2 = abilityIds[j];
      const k = id1 + " " + id2;
      comboMap[k] = {
        id1: id1,
        id2: id2,
        name1: abilitiesIdMap[id1].name,
        name_en1: abilitiesIdMap[id1].name_en,
        name_cn1: abilitiesIdMap[id1].name_cn,
        name2: abilitiesIdMap[id2].name,
        name_en2: abilitiesIdMap[id2].name_en,
        name_cn2: abilitiesIdMap[id2].name_cn,
        matchCount: 0,
        winCount: 0,
        winrate: 0.0,
      };
    }
  }

  console.log(
    `collectAbilityMetaInfo count ${Object.keys(abilitiesNameMap).length} ${
      Object.keys(comboMap).length
    }`
  );
};

const isRadiant = (slot: number) => {
  return slot < 128;
};

const handleMatch = async (match: any) => {
  const matchData = JSON.parse(match.data);
  const radiant_win = matchData.radiant_win == 1;
  const players = matchData.players || [];
  const heros: any = {};
  const abilities: any = {};

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

const handleCombo = async (match: any) => {
  const matchData = JSON.parse(match.data);
  const radiant_win = matchData.radiant_win == 1;
  const players = matchData.players || [];
  //
  players.forEach((v: any) => {
    const radiant = isRadiant(v.player_slot);
    let win = false;
    if (radiant) {
      win = radiant_win;
    } else {
      win = !radiant_win;
    }
    const abilityUpgrade = v.ability_upgrades || [];
    const playerAbilities: any = {};
    abilityUpgrade.forEach((ability: any) => {
      playerAbilities[+ability.ability] = true;
    });
    //
    const keys = Object.keys(playerAbilities)
      .map((v) => +v)
      .sort();
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        const key = keys[i] + " " + keys[j];
        const combo = comboMap[key];
        if (combo) {
          combo.matchCount += 1;
          if (win) {
            combo.winCount += 1;
          }
          if (combo.matchCount >= 1) {
            combo.winrate = combo.winCount / combo.matchCount;
          }
        }
      }
    }
  });
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
      handleCombo(v);
    });
    lastId = matchs[matchs.length - 1].match_id + 1;
  }

  console.log("parseMatch");
};
const saveToDb = async () => {
  for (const id of Object.keys(herosIdMap)) {
    const hero = herosIdMap[+id];
    if (hero) {
      console.log("save hero ", id);
      await dbRun(`delete from hero_winrate where id=${id} `);
      if (hero.matchCount > 10) {
        await dbRun(
          `insert into hero_winrate (id,name,name_en,name_cn,match_count,win_count,winrate) values ` +
            `(${id},'${hero.name}','${hero.name_en}','${hero.name_cn}',${hero.matchCount},${hero.winCount},${hero.winrate})`
        );
      }
    }
  }
  for (const id of Object.keys(abilitiesIdMap)) {
    const ability = abilitiesIdMap[+id];
    if (ability) {
      console.log("save ability ", id);
      await dbRun(`delete from ability_winrate where id=${id} `);
      if (ability.matchCount > 10) {
        await dbRun(
          `insert into ability_winrate (id,name,name_en,name_cn,match_count,win_count,winrate) values ` +
            `(${id},'${ability.name}','${ability.name_en}','${ability.name_cn}',${ability.matchCount},${ability.winCount},${ability.winrate})`
        );
      }
    }
  }
  //combo
  //
  let combos = Object.values(comboMap);
  combos = combos.filter((v) => {
    return v.matchCount > 100;
  });
  combos.sort((a: Combo, b: Combo) => {
    return -(a.winrate - b.winrate);
  });
  combos = combos.slice(0, 300);
  //
  for (const i in combos) {
    const combo = combos[i];
    console.log("save combo ", combo.id1, combo.id2);
    await dbRun(
      `delete from combo_winrate where id1=${combo.id1} and id2=${combo.id2}`
    );
    await dbRun(
      `insert into combo_winrate (id1,id2,name1,name_en1,name_cn1,name2,name_en2,name_cn2,match_count,win_count,winrate) values ` +
        `(${combo.id1},${combo.id2},` +
        `'${combo.name1}','${combo.name_en1}','${combo.name_cn1}',` +
        `'${combo.name2}','${combo.name_en2}','${combo.name_cn2}',` +
        `${combo.matchCount},${combo.winCount},${combo.winrate})`
    );
  }
};
const main = async () => {
  collectHeroMetaInfo();
  collectAbilityMetaInfo();
  await parseMatch();
  await saveToDb();
  await setKv("statsUpdate", Date.now().toString());
};
main();

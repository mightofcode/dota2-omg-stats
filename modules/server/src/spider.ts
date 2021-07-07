import http from "http";
const https = require("https");
import dotenv from "dotenv";
import { Server } from "socket.io";
import axios from "axios";
var fs = require("fs");
const util = require("util");

dotenv.config();

import { dbRun, dbAll, dbGet } from "./utils/db";

console.log("start spider");

const getLastMatchSeq = async () => {
  let res = +(process?.env?.START_MATCH_SEQ || 0);
  const row = await dbGet(
    "select * from match order by match_seq desc limit 1"
  );
  if (row) {
    res = row["match_seq"];
    console.log("getLastMatchSeq ", res);
  }
  return res + 1;
};

const fetchMatchs = async (matchSeq: number) => {
  try {
    const url =
      `https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1?` +
      `matches_requested=100&start_at_match_seq_num=${matchSeq}&key=${process.env.STEAM_TOKEN}`;
    return await httpGet(url);
  } catch (e) {
    console.log("fetchMatchs fail", e?.response);
    return null;
  }
};

const httpGet = async (url: string) => {
  const response = await axios({
    method: "get",
    url: url,
    data: {},
  });
  return response?.data;
};

export const sleep = (time: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const saveMatch = async (match: any) => {
  const data = JSON.stringify(match);
  await dbRun(
    `insert into match (data,match_id,match_time,match_seq) values ('${data}',${match.match_id},${match.start_time},${match.match_seq_num})`
  );
};

const main = async () => {
  const res = await dbGet("select count(*) as count from match");
  console.log("match count", res);
  let lastMatch = await getLastMatchSeq();
  console.log(`start get match from ${lastMatch}`);
  while (true) {
    console.log(`start fetching seq ${lastMatch}`);
    const jsonRes = (await fetchMatchs(lastMatch)) || null;
    const matchs = jsonRes?.result.matches || [];
    console.log("end fetching count", matchs.length);
    if (matchs.length == 0) {
      console.log("sleep");
      await sleep(10000);
      continue;
    }
    matchs.forEach((v: any) => {
      if (v?.game_mode == 18) {
        console.log(`add match seq ${v.match_seq_num} id ${v.match_id}`);
        saveMatch(v);
      }
    });
    lastMatch = +matchs[matchs.length - 1].match_seq_num + 1;
  }
};
main();

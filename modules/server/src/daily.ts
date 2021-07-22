import dotenv from "dotenv";
dotenv.config();
const fs = require("fs");
import { dbRun, dbAll, dbGet } from "./utils/db";
import { setKv } from "./utils/kv";
import { crackAllProcess } from "./crack/crack";

const main = async () => {
  console.log("set crackCount 0");
  await setKv("crackCount", "0");
};
main();

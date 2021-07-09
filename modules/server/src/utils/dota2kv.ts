const { decode } = require("dota-js-kv");
//import decode from "dota-js-kv";

var fs = require("fs");

export const loadDota2Kv = (file: string) => {
  const txt = fs.readFileSync(file, "utf-8");
  const data = decode(txt);
  return data;
};

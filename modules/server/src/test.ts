//
const { decode } = require("dota-js-kv");
//import decode from "dota-js-kv";

var fs = require("fs");

const txt = fs.readFileSync("./data/test.txt", "utf-8");

const data = decode(txt);

console.log(JSON.stringify(data));

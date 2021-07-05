import http from "http";
const https = require("https");
import dotenv from "dotenv";
import { Server } from "socket.io";
import axios from "axios";
var fs = require("fs");
const util = require("util");

dotenv.config();

console.log("start stats");

var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./dbData/sqlite3.db");

var dbRun = util.promisify(db.run.bind(db));
var dbGet = util.promisify(db.get.bind(db));
var dbAll = util.promisify(db.all.bind(db));

const main = async () => {};
main();

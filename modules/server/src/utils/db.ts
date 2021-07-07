const util = require("util");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./dbData/sqlite3.db");

export const dbRun = util.promisify(db.run.bind(db));
export const dbGet = util.promisify(db.get.bind(db));
export const dbAll = util.promisify(db.all.bind(db));

import { dbRun, dbAll, dbGet } from "./db";

export const setKv = async (k: string, v: string) => {
  if (
    (await dbGet(`select count(*) as count from kv where k='${k}'`)).count != 0
  ) {
    await dbRun(`delete from kv where k='${k}'`);
  }
  await dbRun(`insert into kv (k,v) values ('${k}','${v}')`);
};

export const getKv = async (k: string) => {
  const row = await dbGet(`select * from kv where k='${k}'`);
  return row?.v || null;
};

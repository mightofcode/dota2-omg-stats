CREATE TABLE "kv" (
"k"  TEXT,
"v"  TEXT
);

CREATE UNIQUE INDEX "idx_k"
ON "kv" ("k" ASC);

CREATE INDEX "idx_v"
ON "kv" ("v" ASC);


CREATE TABLE "match" (
"data"  TEXT,
"match_id"  INTEGER PRIMARY KEY NOT NULL,
"match_time"  INTEGER,
"match_seq"  INTEGER
);

CREATE UNIQUE INDEX "idx_id"
ON "match" ("match_id" ASC);

CREATE UNIQUE INDEX "idx_seq"
ON "match" ("match_seq" ASC);

CREATE INDEX "idx_time"
ON "match" ("match_time" ASC);

CREATE TABLE "hero_winrate" (
"id"  INTEGER PRIMARY KEY NOT NULL,
"name"  TEXT,
"name_en"  TEXT,
"name_cn"  TEXT,
"match_count"  INTEGER,
"win_count"  INTEGER,
"winrate"  REAL
);

CREATE TABLE "ability_winrate" (
"id"  INTEGER PRIMARY KEY NOT NULL,
"name"  TEXT,
"name_en"  TEXT,
"name_cn"  TEXT,
"match_count"  INTEGER,
"win_count"  INTEGER,
"winrate"  REAL
);

CREATE TABLE "combo_winrate" (
"id1"  INTEGER,
"id2"  INTEGER,
"name1"  TEXT,
"name_en1"  TEXT,
"name_cn1"  TEXT,
"name2"  TEXT,
"name_en2"  TEXT,
"name_cn2"  TEXT,

"match_count"  INTEGER,
"win_count"  INTEGER,
"winrate"  REAL
);

CREATE INDEX "idx_id1"
ON "combo_winrate" ("id1" ASC);
CREATE INDEX "idx_id2"
ON "combo_winrate" ("id2" ASC);


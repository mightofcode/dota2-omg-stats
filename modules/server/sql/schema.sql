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
"match_seq"  INTEGER,
PRIMARY KEY ("match_id")
);

CREATE UNIQUE INDEX "idx_id"
ON "match" ("match_id" ASC);

CREATE UNIQUE INDEX "idx_seq"
ON "match" ("match_seq" ASC);

CREATE INDEX "idx_time"
ON "match" ("match_time" ASC);

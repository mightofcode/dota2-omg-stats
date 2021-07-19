import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
const fs = require("fs");

import { crackOneClip, crack, crackAllProcess } from "./crack/crack";

const main = async () => {
  await crackAllProcess("./data/screen.png");
  //await crackOneClip("./data/clips/0-690-164.png");
};
main();

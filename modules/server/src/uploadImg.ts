import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
const fs = require("fs");

import { uploadFile } from "./crack/crack";

const main = async () => {
  await uploadFile();
};
main();

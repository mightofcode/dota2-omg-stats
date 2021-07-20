import axios from "axios";
const fs = require("fs");

export interface KeyValue<T = any> {
  [key: string]: T;
}

export const download_image = (url: string, image_path: string) => {
  console.log(url);
  return axios({
    url,
    responseType: "stream",
    timeout: 10000,
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve(null))
          .on("error", (e: any) => reject(e));
      })
  );
};

export const sleep = (time: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

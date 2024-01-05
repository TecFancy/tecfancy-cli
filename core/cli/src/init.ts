"use strict";

import path from "path";
import fse from "fs-extra";
import log from "@tecfancy/log";

interface OptionsType {
  force?: boolean;
}

async function init(name: string, options: OptionsType) {
  const dirPath = path.join(process.cwd(), name);
  if (fse.existsSync(dirPath)) {
    log.warn("", "The directory already exists, continue to overwrite?");
    const inquirer = (await import("inquirer")).default;
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "The directory already exists, continue to overwrite?",
        },
      ])
      .then((answers) => {
        console.log("init answers: ", answers);
      })
      .catch((error) => {
        log.error("", error.message);
      });
  } else {
    fse.mkdirSync(dirPath);
    log.success("", "The directory has been created successfully!");
  }
}

export default init;

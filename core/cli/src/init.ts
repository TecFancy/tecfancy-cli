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
    log.warn('', 'The directory already exists, continue to overwrite?');
  } else {
    fse.mkdirSync(dirPath);
    log.success('', 'The directory has been created successfully!');
  }
}

export default init;

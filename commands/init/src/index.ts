"use strict";

import path from "path";
import fse from "fs-extra";
import log from "@tecfancy/log";
import createDir from "./createDir.js";
import { CACHE_DIR, NODE_MODULES_DIR } from "@tecfancy/const";

interface OptionsType {
  force?: boolean;
}

function createNodeModulesDir() {
  if (!fse.pathExistsSync(NODE_MODULES_DIR)) {
    fse.mkdirpSync(NODE_MODULES_DIR);
  }
}

function getProjectsList() {}

function cloneRepo() {}

/**
 * Initialize the project
 * @param projectName project name
 * @param options options
 */
async function init(projectName: string | undefined, options: OptionsType) {
  try {
    const dirPath = projectName
      ? path.join(process.cwd(), projectName)
      : process.cwd();
    await createDir(dirPath, options.force);
    createNodeModulesDir();
    getProjectsList();
    cloneRepo();
  } catch (error) {
    log.error("", `Initialization failed: ${error}`);
    throw new Error(`Initialization failed: ${error}`); // Propagate the exception to be handled by the caller
  }
}

export default init;

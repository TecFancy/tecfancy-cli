"use strict";

import log from "@tecfancy/log";

import printPkgVersion from "./printPkgVersion.js";
import checkUserHome from "./checkUserHome.js";
import createConfigDir from "./createConfigDir.js";
import checkEnvFile from "./checkEnvFile.js";
import setupEnvConfig from "./setupEnvConfig.js";
import registCommander from "./registCommander.js";

async function cli() {
  try {
    printPkgVersion();
    checkUserHome();
    createConfigDir();
    checkEnvFile();
    setupEnvConfig();
    registCommander();
  } catch (error: any) {
    log.error("", `Failed to execute the command: ${error}`);
    throw new Error(`Failed to execute the command: ${error}`); // Propagate the exception to be handled by the caller
  }
}

export default cli;

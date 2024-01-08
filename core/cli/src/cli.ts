"use strict";

import log from "@tecfancy/log";

import checkPkgVersion from "./checkPkgVersion.js";
import checkUserHome from "./checkUserHome.js";
import checkConfigDir from "./checkConfigDir.js";
import checkEnvFile from "./checkEnvFile.js";
import setupEnvConfig from "./setupEnvConfig.js";
import registCommander from "./registCommander.js";

async function cli() {
  try {
    checkPkgVersion();
    checkUserHome();
    checkConfigDir();
    checkEnvFile();
    setupEnvConfig();
    registCommander();
  } catch (error: any) {
    log.error("", `Failed to execute the command: ${error}`);
    throw new Error(`Failed to execute the command: ${error}`); // Propagate the exception to be handled by the caller
  }
}

export default cli;

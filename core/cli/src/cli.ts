"use strict";

import { program } from "commander";
import log from "@tecfancy/log";

import init from './init.js';
import checkPkgVersion from "./checkPkgVersion.js";
import checkUserHome from "./checkUserHome.js";
import checkConfigDir from "./checkConfigDir.js";
import checkEnvFile from "./checkEnvFile.js";
import setupEnvConfig from "./setupEnvConfig.js";

import pkg from "../package.json";

function registCommander() {
  program
    .version(pkg.version, "-v, --version", "output the current version")
    .name(Object.keys(pkg.bin)[0])
    .alias(Object.keys(pkg.bin)[1])
    .usage("<command> [options]");

  program
    .command("init [projectName]")
    .description("init project")
    .option("-f, --force", "overwrite target directory if it exist")
    .action(init);

  program.parse(process.argv);

  if (!program?.args?.length) program.outputHelp();
}

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

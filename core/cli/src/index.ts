"use strict";

import commander from "commander";
import log from "@tecfancy/log";

import pkg from "../package.json";

const program = new commander.Command();

function registCommander() {
  program
    .version(pkg.version, "-v, --version", "output the current version")
    .name(Object.keys(pkg.bin)[0])
    .alias(Object.keys(pkg.bin)[1]);

  program.parse(process.argv);

  if (!program?.args?.length) program.outputHelp();
}

async function cli() {
  try {
    registCommander();
  } catch (error: any) {}
}

module.exports = cli;

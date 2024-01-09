"use strict";

import { program } from "commander";
import init from "@tecfancy/init";
import log from "@tecfancy/log";

import pkg from "../package.json";

export default function registCommander() {
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

  program.on("command:*", function (args) {
    const availableCommands = program.commands.map((cmd) => cmd.name());
    if (availableCommands?.length) {
      log.error("", `Invalid command: ${args[0]}`);
    }
  });

  program.parse(process.argv);

  if (!program?.args?.length) program.outputHelp();
}

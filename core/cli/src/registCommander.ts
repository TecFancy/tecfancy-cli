"use strict";

import { program } from "commander";
import init from "@tecfancy/init";
import log from "@tecfancy/log";

import pkg from "../package.json";

/**
 * Set environment variables
 */
function setEnvVariablesFromCommand(command: typeof program, flag: string, variables: Record<string, string>) {
  command.options.forEach((option) => {
    if (option.flags.includes(flag)) {
      Object.keys(variables).forEach((key) => {
        process.env[key] = variables[key];
      });
    }
  });
}

function basicProgram() {
  program
    .version(pkg.version, "-v, --version", "output the current version")
    .name(Object.keys(pkg.bin)[0])
    .alias(Object.keys(pkg.bin)[1])
    .usage("<command> [options]");
}

function initProgram() {
  const initCommand = program
    .command("init [projectName]")
    .description("init project")
    .option("-f, --force", "overwrite target directory if it exist")
    .option("-c, --china", "use the mirror of China")
    .action(init);

  setEnvVariablesFromCommand(initCommand, "-c", {
    TECFANCY_CLI_REGISTRY_URL: "https://registry.npm.taobao.org",
  });
}

export default function registCommander() {
  basicProgram();
  initProgram();

  program.on("command:*", function (args) {
    const availableCommands = program.commands.map((cmd) => cmd.name());
    if (availableCommands?.length) {
      log.error("", `Invalid command: ${args[0]}`);
    }
  });

  program.parse(process.argv);

  if (!program?.args?.length) program.outputHelp();
}

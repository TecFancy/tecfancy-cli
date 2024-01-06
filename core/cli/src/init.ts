"use strict";

import path from "path";
import fse from "fs-extra";
import log from "@tecfancy/log";

interface OptionsType {
  force?: boolean;
}

/**
 * Prompt whether to empty the existing directory
 * @returns {Promise<boolean>} true: empty, false: cancel
 */
async function emptyDirPrompt(): Promise<boolean> {
  const inquirer = (await import("inquirer")).default;
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "empty",
      message: "The directory is not empty, do you want to empty it?",
    },
  ]);
  return answers.empty;
}

/**
 * Empty the directory
 * @param dirPath {string} directory path
 */
async function emptyDir(dirPath: string) {
  try {
    await fse.emptyDir(dirPath);
  } catch (error) {
    log.error("", `Failed to empty the directory: ${error}`);
    throw error; // Propagate the exception to be handled by the caller
  }
}

/**
 * Create a directory
 * @param dirPath {string} directory path
 */
async function mkdir(dirPath: string) {
  try {
    await fse.mkdir(dirPath);
    log.success("", "The directory has been created successfully!");
  } catch (error) {
    log.error("", `Failed to create the directory: ${error}`);
    throw error; // Propagate the exception to be handled by the caller
  }
}

/**
 * Initialize the project
 * @param projectName project name
 * @param options options
 */
async function init(projectName: string | undefined, options: OptionsType) {
  const dirPath = projectName ? path.join(process.cwd(), projectName) : process.cwd();

  if (fse.existsSync(dirPath)) {
    // Check if the directory is not empty
    if (fse.readdirSync(dirPath).length > 0) {
      let proceed = options.force; // If force option is true, proceed without prompt
      if (!proceed) {
        // If not forcing, ask the user to confirm overwriting
        proceed = await emptyDirPrompt();
      }
      if (proceed) {
        await emptyDir(dirPath);
      } else {
        log.info("", "Operation cancelled.");
        return; // If user chooses not to overwrite, cancel the operation
      }
    }
  } else {
    await mkdir(dirPath); // If the directory does not exist, create it
  }
}

export default init;

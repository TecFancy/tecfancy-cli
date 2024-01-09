"use strict";

import fse from "fs-extra";
import log from "@tecfancy/log";

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
    log.info("", `The directory at ${dirPath} has been emptied successfully.`);
  } catch (error) {
    log.error("", `Failed to empty the directory at ${dirPath}: ${error}`);
    throw new Error(`Failed to empty the directory at ${dirPath}: ${error}`); // Propagate the exception to be handled by the caller
  }
}

/**
 * Create a directory
 * @param dirPath {string} directory path
 */
async function mkdir(dirPath: string) {
  try {
    await fse.mkdir(dirPath);
    log.info("", `The directory at ${dirPath} has been created successfully.`);
  } catch (error) {
    log.error("", `Failed to create the directory at ${dirPath}: ${error}`);
    throw new Error(`Failed to create the directory at ${dirPath}: ${error}`); // Propagate the exception to be handled by the caller
  }
}

/**
 * Create a directory if it does not exist, or empty it if it does
 * @param dirPath directory path
 * @param force whether to force emptying the directory
 */
export default async function createDir(dirPath: string, force: boolean | undefined) {
  if (fse.existsSync(dirPath)) {
    // Check if the directory is not empty
    if (fse.readdirSync(dirPath).length > 0) {
      let proceed = force; // If force is true, proceed without prompt
      if (!proceed) {
        // If not forcing, ask the user to confirm overwriting
        proceed = await emptyDirPrompt();
      }
      if (proceed) {
        await emptyDir(dirPath);
      } else {
        log.info("", "Operation cancelled."); // If user chooses not to overwrite, cancel the operation
      }
    }
  } else {
    await mkdir(dirPath); // If the directory does not exist, create it
  }
}

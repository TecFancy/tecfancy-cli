"use strict";

import fse from "fs-extra";
import dotenv from "dotenv";
import { DEFAULT_CLI_HOME, DOTENV_PATH } from "@tecfancy/const";

/**
 * Check the configuration file of environment variables
 */
export default function checkEnvFile() {
  if (fse.pathExistsSync(DOTENV_PATH)) {
    dotenv.config({ path: DOTENV_PATH });
  } else {
    fse.writeFileSync(DOTENV_PATH, ""); // Create a default configuration file
    fse.appendFileSync(DOTENV_PATH, `TECFANCY_CLI_HOME=${DEFAULT_CLI_HOME}\n`); // Set the default configuration
    checkEnvFile(); // Recheck the configuration file
  }
}

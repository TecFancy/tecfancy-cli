"use strict";

import fse from "fs-extra";
import dotenv from "dotenv";
import { TECFANCY_CLI_HOME, TECFANCY_CLI_DOTENV_PATH } from "@tecfancy/const";

/**
 * Check the configuration file of environment variables
 */
export default function checkEnvFile() {
  if (fse.pathExistsSync(TECFANCY_CLI_DOTENV_PATH)) {
    dotenv.config({ path: TECFANCY_CLI_DOTENV_PATH });
  } else {
    fse.writeFileSync(TECFANCY_CLI_DOTENV_PATH, ""); // Create a default configuration file
    fse.appendFileSync(TECFANCY_CLI_DOTENV_PATH, `TECFANCY_CLI_HOME=${TECFANCY_CLI_HOME}\n`); // Set the default configuration
    checkEnvFile(); // Recheck the configuration file
  }
}

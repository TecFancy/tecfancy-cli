"use strict";

import fse from "fs-extra";
import { DEFAULT_CLI_HOME, DOTENV_PATH } from "@tecfancy/const";

/**
 * Set the default configuration
 */
export default function setupEnvConfig() {
  fse.appendFileSync(DOTENV_PATH, `TECFANCY_CLI_HOME=${DEFAULT_CLI_HOME}\n`); // Set the default configuration
}

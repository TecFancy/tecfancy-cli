"use strict";

import fse from "fs-extra";
import { DEFAULT_CLI_HOME } from "./const";

/**
 * Check the configuration directory
 */
export default function checkConfigDir() {
  if (!fse.pathExistsSync(DEFAULT_CLI_HOME)) {
    fse.mkdirpSync(DEFAULT_CLI_HOME);
  }
}

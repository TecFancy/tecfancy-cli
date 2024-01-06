"use strict";

import path from "path";
import { homedir as userHome } from "os";
import fse from "fs-extra";

import { DEFAULT_CLI_HOME } from "./const.js";

/**
 * Check the configuration directory
 */
export default function checkConfigDir() {
  const configDir = path.join(userHome(), '.config', DEFAULT_CLI_HOME);
  if (!fse.pathExistsSync(configDir)) {
    fse.mkdirsSync(configDir);
  }
}

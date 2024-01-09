"use strict";

import fse from "fs-extra";
import { DEFAULT_CLI_HOME } from "@tecfancy/const";

/**
 * Create the configuration directory
 */
export default function createConfigDir() {
  if (!fse.pathExistsSync(DEFAULT_CLI_HOME)) {
    fse.mkdirpSync(DEFAULT_CLI_HOME);
  }
}

"use strict";

import fse from "fs-extra";
import { TECFANCY_CLI_HOME } from "@tecfancy/const";

/**
 * Create the configuration directory
 */
export default function createConfigDir() {
  if (!fse.pathExistsSync(TECFANCY_CLI_HOME)) {
    fse.mkdirpSync(TECFANCY_CLI_HOME);
  }
}

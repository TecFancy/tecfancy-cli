"use strict";

import fse from "fs-extra";

/**
 * Check the configuration directory
 */
export default function checkConfigDir(configDir: string) {
  if (!fse.pathExistsSync(configDir)) {
    fse.mkdirpSync(configDir);
  }
}

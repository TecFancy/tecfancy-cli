"use strict";

import { homedir as userHome } from "os";
import fse from "fs-extra";

/**
 * Check if the user home directory exists
 */
export default function checkUserHome() {
  if (!userHome() || !fse.pathExistsSync(userHome())) {
    throw new Error("The user home directory does not exist.");
  }
}

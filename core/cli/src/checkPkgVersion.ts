"use strict";

import log from "@tecfancy/log";
import pkg from "../package.json";

/**
 * Check the version of the package
 */
export default function checkPkgVersion() {
  log.notice("version", pkg.version);
}

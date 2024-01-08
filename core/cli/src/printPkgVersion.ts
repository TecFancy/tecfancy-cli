"use strict";

import log from "@tecfancy/log";
import pkg from "../package.json";

/**
 * Print the version of the package
 */
export default function printPkgVersion() {
  log.notice("version", pkg.version);
}

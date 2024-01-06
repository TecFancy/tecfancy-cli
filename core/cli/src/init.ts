"use strict";

import path from "path";
import log from "@tecfancy/log";
import createDir from './createDir.js';

interface OptionsType {
  force?: boolean;
}

/**
 * Initialize the project
 * @param projectName project name
 * @param options options
 */
async function init(projectName: string | undefined, options: OptionsType) {
  try {
    const dirPath = projectName
      ? path.join(process.cwd(), projectName)
      : process.cwd();
    await createDir(dirPath, options.force);
  } catch (error) {
    log.error("", `Initialization failed: ${error}`);
    throw new Error(`Initialization failed: ${error}`); // Propagate the exception to be handled by the caller
  }
}

export default init;

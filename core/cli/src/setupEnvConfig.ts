"use strict";

import fse from "fs-extra";
import * as envVariables from "@tecfancy/const";

function updateOrCreateEnvVariables(envVariables: { [key: string]: string }) {
  let fileContent = fse.pathExistsSync(envVariables.TECFANCY_CLI_DOTENV_PATH)
    ? fse.readFileSync(envVariables.TECFANCY_CLI_DOTENV_PATH, "utf8")
    : "";
  let isFileChanged = false;
  const originalLines = fileContent.split('\n').filter(line => line.trim() !== ''); // remove empty lines
  const updatedLines = [...originalLines];

  for (const [key, value] of Object.entries(envVariables)) {
    if (key === "TECFANCY_CLI_DOTENV_PATH") continue; // skip this variable
    let hasKey = false;
    let isValueChanged = false;

    for (let i = 0; i < originalLines.length; i++) {
      const line = originalLines[i];
      if (line.trim().startsWith(key + "=")) {
        const currentValue = line.substring(key.length + 1).trim();
        if (currentValue !== value) {
          isValueChanged = true;
          updatedLines[i] = `${key}=${value}`;
          isFileChanged = true;
        }
        hasKey = true;
        break;
      }
    }

    if (!hasKey) {
      updatedLines.push(`${key}=${value}`);
      isFileChanged = true;
    } else if (isValueChanged) {
      isFileChanged = true;
    }
  }

  if (isFileChanged) {
    fse.writeFileSync(envVariables.TECFANCY_CLI_DOTENV_PATH, updatedLines.join("\n"));
  }
}

/**
 * Set the default configuration
 */
export default function setupEnvConfig() {
  updateOrCreateEnvVariables(envVariables);
}

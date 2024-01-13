'use strict';

import { program } from 'commander';

function setEnvVariables(key: string, value: string) {
  process.env[key] = value;
}

/**
 * Set environment variables from command line arguments
 */
export function setEnvVariablesFromCommand(command: typeof program, flag: string, variables: Record<string, string>) {
  command.options.forEach((option) => {
    if (option.flags.includes(flag)) {
      Object.keys(variables).forEach((key) => {
        setEnvVariables(key, variables[key]);
      });
    }
  });
}

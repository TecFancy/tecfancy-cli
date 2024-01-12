'use strict';

import { program } from 'commander';

/**
 * Set environment variables
 */
export function setEnvVariablesFromCommand(command: typeof program, flag: string, variables: Record<string, string>) {
  command.options.forEach((option) => {
    if (option.flags.includes(flag)) {
      Object.keys(variables).forEach((key) => {
        process.env[key] = variables[key];
      });
    }
  });
}

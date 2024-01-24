"use strict";

interface OptionsType {
  force?: boolean;
  china?: boolean;
}

function setEnvVariables(key: string, value: string) {
  process.env[key] = value;
}

/**
 * Set environment variables from command line arguments
 */
export function setEnvVariablesFromCommand(
  options: OptionsType,
  flag: keyof OptionsType,
  variables: Record<string, string>
) {
  if (options[flag]) {
    Object.keys(variables).forEach((key) => {
      setEnvVariables(key, variables[key]);
    });
  }
}

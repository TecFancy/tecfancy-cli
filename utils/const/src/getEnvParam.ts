"use strict";

/**
 * Get the environment variable value, if the environment variable does not exist, return the default value
 * @param envParam environment variable name
 * @param defaultParam default value
 * @returns environment variable value or default value
 */
export default function getEnvParam(envParam: string, defaultParam: string) {
  return process.env[envParam] || defaultParam;
}

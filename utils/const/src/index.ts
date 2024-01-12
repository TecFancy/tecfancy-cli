"use strict";

import path from "path";
import { homedir as userHome } from "os";

import getEnvParam from "./getEnvParam";

// configure the directory path of the configuration file
export const TECFANCY_CLI_HOME = getEnvParam(
  "TECFANCY_CLI_HOME",
  path.join(userHome(), ".config", "tecfancy")
);

// environment configuration file path
export const TECFANCY_CLI_DOTENV_PATH = getEnvParam(
  TECFANCY_CLI_HOME,
  path.join(TECFANCY_CLI_HOME, ".env")
);

// cache directory path
export const TECFANCY_CLI_CACHE_DIR = getEnvParam(
  TECFANCY_CLI_HOME,
  path.join(TECFANCY_CLI_HOME, "cache")
);

// node_modules directory path
export const TECFANCY_CLI_NODE_MODULES_DIR = getEnvParam(
  TECFANCY_CLI_CACHE_DIR,
  path.join(TECFANCY_CLI_CACHE_DIR, "node_modules")
);

// store directory path
export const STORE_DIR = getEnvParam(
  TECFANCY_CLI_CACHE_DIR,
  path.join(TECFANCY_CLI_CACHE_DIR, "store")
);

// registry url
export const REGISTRY = getEnvParam(
  "TECFANCY_CLI_REGISTRY_URL",
  "https://registry.npmjs.org"
);

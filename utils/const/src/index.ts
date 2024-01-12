"use strict";

import path from "path";
import { homedir as userHome } from "os";

import getEnvParam from "./getEnvParam";

// configure the directory path of the configuration file
export const DEFAULT_CLI_HOME = getEnvParam(
  "TECFANCY_DEFAULT_CLI_HOME",
  path.join(userHome(), ".config", "tecfancy")
);

// environment configuration file path
export const DOTENV_PATH = getEnvParam(
  DEFAULT_CLI_HOME,
  path.join(DEFAULT_CLI_HOME, ".env")
);

// cache directory path
export const CACHE_DIR = getEnvParam(
  DEFAULT_CLI_HOME,
  path.join(DEFAULT_CLI_HOME, "cache")
);

// node_modules directory path
export const NODE_MODULES_DIR = getEnvParam(
  CACHE_DIR,
  path.join(CACHE_DIR, "node_modules")
);

// store directory path
export const STORE_DIR = getEnvParam(CACHE_DIR, path.join(CACHE_DIR, "store"));

// registry url
export const REGISTRY = getEnvParam(
  "TECFANCY_CLI_REGISTRY",
  "https://registry.npmjs.org"
);

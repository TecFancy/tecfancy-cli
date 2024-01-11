"use strict";

import path from "path";
import { homedir as userHome } from "os";

// configure the directory path of the configuration file
export const DEFAULT_CLI_HOME = path.join(userHome(), ".config", "tecfancy");

// environment configuration file path
export const DOTENV_PATH = path.join(DEFAULT_CLI_HOME, ".env");

// cache directory path
export const CACHE_DIR = path.join(DEFAULT_CLI_HOME, "cache");

export const NODE_MODULES_DIR = path.join(CACHE_DIR, "node_modules");

export const STORE_DIR = path.join(CACHE_DIR, "store");

export const REGISTRY = process.env.TECFANCY_CLI_REGISTRY || "https://registry.npmjs.org";

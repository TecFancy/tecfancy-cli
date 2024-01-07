"use strict";

import path from "path";
import { homedir as userHome } from "os";

// configure the directory path of the configuration file
export const DEFAULT_CLI_HOME = path.join(userHome(), ".config", "tecfancy");

// environment configuration file path
export const DOTENV_PATH = path.resolve(DEFAULT_CLI_HOME, ".env");

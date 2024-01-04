#! /usr/bin/env node

const importLocal = require("import-local");

if (importLocal(__filename)) {
  require("npmlog").info("cli", "Welcome to use @tecfancy/cli");
} else {
  require("../lib")(process.argv.slice(2));
}

"use strict";

import log from "npmlog";

// Change the prefix of log messages
log.heading = "TecFancy";

// Set the logging level
log.level = process.env.LOG_LEVEL || "info";

// Add custom log levels
log.addLevel("success", 2000, { fg: "green", bold: true });

export default log;

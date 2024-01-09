"use strict";

/**
 * Clear the last line in the terminal
 */
export default function () {
  process.stdout.write('\x1b[1A'); // move cursor up one line
  process.stdout.write('\x1b[K'); // clear line
}

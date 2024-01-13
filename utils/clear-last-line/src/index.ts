"use strict";

/**
 * Clear the last line in the terminal
 * @param numLines number of lines to clear
 */
export default function (numLines: number = 1) {
  for (let i = 0; i < numLines; i++) {
    process.stdout.write('\x1b[1A'); // move cursor up one line
    process.stdout.write('\x1b[K'); // clear line
  }
}

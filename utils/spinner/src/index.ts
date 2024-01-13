"use strict";

import cliSpinners from "cli-spinners";

let interval: string | number | NodeJS.Timeout | undefined;
let currentSpinner: cliSpinners.Spinner;

/**
 * Start the spinner
 * @param spinnerName spinner name
 */
export function spinnerStart(spinnerName: cliSpinners.SpinnerName = "line") {
  // choose a spinner style, default is 'line'
  const spinner = cliSpinners[spinnerName];
  currentSpinner = spinner;

  // define the display logic of the spinner
  let i = 0;
  interval = setInterval(() => {
    process.stdout.write(
      "\r" + spinner.frames[(i = ++i % spinner.frames.length)]
    );
  }, spinner.interval);
}

/** Stop the spinner */
export function spinnerStop() {
  // stop the spinner
  clearInterval(interval);

  // clear the last line of the spinner
  process.stdout.write(
    "\r" + " ".repeat(currentSpinner.frames[0].length) + "\r"
  );
}

"use strict";

import pkg from "../package.json";

export default async function checkUpdate() {
  const updateNotifier = (await import("update-notifier")).default;
  updateNotifier({ pkg }).notify();
}

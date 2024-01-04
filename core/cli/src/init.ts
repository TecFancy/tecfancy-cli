'use strict';

import log from "@tecfancy/log";

interface OptionsType {
  force?: boolean;
}

function init(name: string, options: OptionsType) {
  log.info('init', name, options);
}

export default init;

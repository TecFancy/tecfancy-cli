"use strict";

import fse from "fs-extra";
import path from "path";

import log from "@tecfancy/log";

import { TECFANCY_CLI_NODE_MODULES_DIR } from "@tecfancy/const";

const content = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules
.pnp
.pnp.js
.yarn/install-state.gz

# testing
coverage

# next.js
.next/
out/

# production
build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;

const generateGitIgnoreFile = (selectedNpmName: string) => {
  const projectPath = path.join(TECFANCY_CLI_NODE_MODULES_DIR, selectedNpmName);
  const gitignoreFile = path.join(projectPath, "template", ".gitignore");
  try {
    fse.ensureDirSync(projectPath);
    fse.writeFileSync(gitignoreFile, content);
  } catch (error) {
    log.error("", `Generate .gitignore file failed: ${error}`);
  }
};

export default generateGitIgnoreFile;

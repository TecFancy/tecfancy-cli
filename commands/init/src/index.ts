"use strict";

import path from "path";
import fse from "fs-extra";
import axios from "axios";
import clearLastLine from "@tecfancy/clear-last-line";
import log from "@tecfancy/log";

import createDir from "./createDir.js";
import { CACHE_DIR, NODE_MODULES_DIR } from "@tecfancy/const";

interface OptionsType {
  force?: boolean;
}

function createNodeModulesDir() {
  if (!fse.pathExistsSync(NODE_MODULES_DIR)) {
    fse.mkdirpSync(NODE_MODULES_DIR);
  }
}

/**
 * Get the project list from github
 * @returns project list
 */
async function getProjectsList() {
  log.info("", "Getting project list...");
  const request = axios.create({
    baseURL: "https://api.github.com/repos",
    timeout: 5000,
  });
  const result = await request({
    url: "/tecfancy/tecfancy-templates/contents/templates.json",
  });
  return JSON.parse(Buffer.from(result.data.content, "base64").toString());
}

/**
 * Select the project type
 * @returns project type
 */
async function selectType() {
  const inquirer = (await import("inquirer")).default;
  return inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Please select the project type:",
      default: "Project",
      choices: [
        {
          name: "Project",
          value: "Project",
        },
        {
          name: "Component",
          value: "Component",
        },
      ],
    },
  ]) as Promise<{ type: "Project" | "Component" }>;
}

/**
 * Select the project
 * @param selectedType selected type
 * @param projectList project list data
 * @returns project name
 */
async function selectProject(
  selectedType: "Project" | "Component",
  projectList: any[]
) {
  const inquirer = (await import("inquirer")).default;
  return inquirer.prompt([
    {
      type: "list",
      name: "project",
      message: `Please select the project:`,
      choices: projectList
        .filter((project) => project.tags.includes(selectedType))
        .map((project) => {
          return {
            name: project.name.zh_CN,
            value: project.npmName,
          };
        }),
    },
  ]) as Promise<{ project: string }>;
}

function cloneRepo() {}

/**
 * Initialize the project
 * @param projectName project name
 * @param options options
 */
async function init(projectName: string | undefined, options: OptionsType) {
  try {
    const dirPath = projectName
      ? path.join(process.cwd(), projectName)
      : process.cwd();
    await createDir(dirPath, options.force);
    createNodeModulesDir();
    const projectListData = await getProjectsList();
    clearLastLine();
    const selectedType = (await selectType()).type;
    const selectedProject = (await selectProject(
      selectedType,
      projectListData
    )).project;
    log.info("", `Selected project: ${selectedProject}`);
    cloneRepo();
  } catch (error) {
    log.error("", `Initialization failed: ${error}`);
    throw new Error(`Initialization failed: ${error}`); // Propagate the exception to be handled by the caller
  }
}

export default init;

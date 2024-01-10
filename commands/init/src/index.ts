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
 * Get the project tags
 * @param projectListData project list data
 * @returns project tags
 */
function extraTags(projectListData: any[]) {
  const tagsSet = new Set<string>();
  projectListData.forEach((project) => {
    project.tags.forEach((tag: Record<string, string>) => {
      // TODO: default is English, need to be changed to the current language
      tagsSet.add(tag.default);
    });
  });
  return Array.from(tagsSet).map((tag) => ({ name: tag, value: tag }));
}

/**
 * Select the project type
 * @returns project type
 */
async function selectType(projectListData: any[]) {
  const inquirer = (await import("inquirer")).default;
  return inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Please select the project type:",
      default: "Project",
      choices: extraTags(projectListData),
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
  const filteredProjectList = projectList.filter((project) =>
    project.tags.find(
      (tag: Record<string, string>) => tag.default === selectedType
    )
  );
  const inquirer = (await import("inquirer")).default;
  return inquirer.prompt([
    {
      type: "list",
      name: "project",
      message: `Please select the project:`,
      choices: filteredProjectList.map((project) => ({
        name: project.name.default, // TODO: default is English, need to be changed to the current language
        value: project.npmName,
      })),
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
    const selectedType = (await selectType(projectListData)).type;
    const selectedProject = (await selectProject(selectedType, projectListData))
      .project;
    console.log("init selectedProject", selectedProject);
    cloneRepo();
  } catch (error) {
    log.error("", `Initialization failed: ${error}`);
    throw new Error(`Initialization failed: ${error}`); // Propagate the exception to be handled by the caller
  }
}

export default init;

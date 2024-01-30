"use strict";

import path from "path";
import fse from "fs-extra";
import axios from "axios";
import npminstall from "npminstall";
import log from "@tecfancy/log";
import { spinnerStart, spinnerStop } from "@tecfancy/spinner";
import { setEnvVariablesFromCommand } from "@tecfancy/set-env-variables";
import {
  TECFANCY_CLI_CACHE_DIR,
  TECFANCY_CLI_NODE_MODULES_DIR,
  TECFANCY_CLI_REGISTRY_URL,
} from "@tecfancy/const";

import createWorkingDir from "./createWorkingDir";
import generateGitIgnoreFile from "./GenerateGitIgnoreFile";

interface OptionsType {
  force?: boolean;
  china?: boolean;
}

function setEnvVariables(options: OptionsType) {
  setEnvVariablesFromCommand(options, "china", {
    TECFANCY_CLI_REGISTRY_URL: "https://registry.npmmirror.com",
  });
}

function createNodeModulesDir() {
  if (!fse.pathExistsSync(TECFANCY_CLI_NODE_MODULES_DIR)) {
    fse.mkdirpSync(TECFANCY_CLI_NODE_MODULES_DIR);
  }
}

/**
 * Get the project list from github
 * @returns project list
 */
async function getProjectsList() {
  spinnerStart("Getting project list...");

  try {
    const request = axios.create({
      baseURL: "https://api.github.com/repos",
      timeout: 5000,
    });
    
    const result = await request({
      url: "/tecfancy/tecfancy-templates/contents/templates.json",
    });
    spinnerStop();

    return JSON.parse(Buffer.from(result.data.content, "base64").toString());
  } catch (error) {
    spinnerStop();
    log.error("", `Get project list failed: ${error}`);
    throw new Error(`Get project list failed: ${error}`); // Propagate the exception to be handled by the caller
  }
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
      name: "npmName",
      message: `Please select the project:`,
      choices: filteredProjectList.map((project) => ({
        name: project.name.default, // TODO: default is English, need to be changed to the current language
        value: project.npmName,
      })),
    },
  ]) as Promise<{ npmName: string }>;
}

async function downloadProject(selectedNpmName: string) {
  try {
    await npminstall({
      root: TECFANCY_CLI_CACHE_DIR,
      storeDir: TECFANCY_CLI_NODE_MODULES_DIR,
      registry:
        process.env.TECFANCY_CLI_REGISTRY_URL || TECFANCY_CLI_REGISTRY_URL,
      pkgs: [{ name: selectedNpmName, version: "latest" }],
    });
    log.success("", "Download project successfully.");
  } catch (error) {
    log.info("", `Try to use the mirror of China with -c option.`);
    log.error("", `Get project failed: ${error}`);
    throw new Error(`Get project failed: ${error}`); // Propagate the exception to be handled by the caller
  }
}

function installProject(projectName: string = "", selectedNpmName: string) {
  spinnerStart("Installing project...");
  const projectPath = path.join(TECFANCY_CLI_NODE_MODULES_DIR, selectedNpmName, 'template');
  const workingPath = path.join(process.cwd(), projectName);
  fse.ensureDirSync(projectPath);
  fse.ensureDirSync(workingPath);
  fse.copySync(projectPath, workingPath, {
    dereference: true, // Follow symbolic links
  });
  spinnerStop();
  log.success("", "Install project successfully.");
}

/**
 * Initialize the project
 * @param projectName project name
 * @param options options
 */
async function init(projectName: string | undefined, options: OptionsType) {
  try {
    setEnvVariables(options);
    await createWorkingDir(projectName, options.force);
    createNodeModulesDir();
    const projectListData = await getProjectsList();
    const { type: selectedType } = await selectType(projectListData);
    const { npmName: selectedNpmName } = await selectProject(
      selectedType,
      projectListData
    );
    await downloadProject(selectedNpmName);
    generateGitIgnoreFile(selectedNpmName);
    installProject(projectName, selectedNpmName);
  } catch (error) {
    log.error("", `Initialization failed: ${error}`);
    throw new Error(`Initialization failed: ${error}`); // Propagate the exception to be handled by the caller
  }
}

export default init;

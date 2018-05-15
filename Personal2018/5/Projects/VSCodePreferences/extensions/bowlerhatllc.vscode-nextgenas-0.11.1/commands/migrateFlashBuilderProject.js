"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright 2016-2018 Bowler Hat LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const parseXML = require("@rgrove/parse-xml");
const FILE_ASCONFIG_JSON = "asconfig.json";
const FILE_ACTIONSCRIPT_PROPERTIES = ".actionScriptProperties";
const ERROR_CANNOT_FIND_PROJECT = "No Adobe Flash Builder project found in workspace.";
const ERROR_CANNOT_PARSE_PROJECT = "Failed to parse Adobe Flash Builder project.";
const ERROR_ASCONFIG_JSON_EXISTS = "Cannot migrate Adobe Flash Builder project because asconfig.json already exists.";
function migrateFlashBuilderProject(workspaceFolder) {
    if (!workspaceFolder) {
        return false;
    }
    let actionScriptPropertiesPath = path.join(workspaceFolder.fsPath, FILE_ACTIONSCRIPT_PROPERTIES);
    if (!fs.existsSync(actionScriptPropertiesPath)) {
        vscode.window.showErrorMessage(ERROR_CANNOT_FIND_PROJECT);
        return;
    }
    let asconfigPath = path.join(workspaceFolder.fsPath, FILE_ASCONFIG_JSON);
    if (fs.existsSync(asconfigPath)) {
        vscode.window.showErrorMessage(ERROR_ASCONFIG_JSON_EXISTS);
        return;
    }
    let actionScriptPropertiesText = fs.readFileSync(actionScriptPropertiesPath, "utf8");
    let actionScriptProperties = null;
    try {
        actionScriptProperties = parseXML(actionScriptPropertiesText);
    }
    catch (error) {
        vscode.window.showErrorMessage(ERROR_CANNOT_PARSE_PROJECT);
        return;
    }
    let result = {
        compilerOptions: {},
        files: [],
    };
    console.log(actionScriptProperties);
    let rootElement = actionScriptProperties.children[0];
    let mainApplicationFileName = "MyProject.as";
    if ("mainApplicationPath" in rootElement.attributes) {
        mainApplicationFileName = rootElement.attributes.mainApplicationPath;
    }
    let rootChildren = rootElement.children;
    let compilerElement = rootChildren.find((child) => {
        return child.type === "element" && child.name === "compiler";
    });
    if (compilerElement) {
        migrateCompilerElement(compilerElement, mainApplicationFileName, result);
    }
    let resultText = JSON.stringify(result, undefined, "\t");
    fs.writeFileSync(asconfigPath, resultText);
    vscode.workspace.openTextDocument(asconfigPath).then((document) => {
        vscode.window.showTextDocument(document);
    });
}
exports.default = migrateFlashBuilderProject;
function migrateCompilerElement(compilerElement, mainApplicationFileName, result) {
    let mainApplicationName = mainApplicationFileName.substr(0, mainApplicationFileName.length - path.extname(mainApplicationFileName).length);
    let attributes = compilerElement.attributes;
    if ("useApolloConfig" in attributes && attributes.useApolloConfig === "true") {
        result.config = "air";
        result.application = mainApplicationName + "-app.xml";
    }
    if ("copyDependentFiles" in attributes && attributes.copyDependentFiles === "true") {
        result.copySourcePathAssets = true;
    }
    if ("outputFolderPath" in attributes) {
        result.compilerOptions.output = path.join(attributes.outputFolderPath, mainApplicationName + ".swf");
    }
    if ("additionalCompilerArguments" in attributes) {
        result.additionalOptions = attributes.additionalCompilerArguments;
    }
    if ("generateAccessible" in attributes && attributes.generateAccessible === "true") {
        result.compilerOptions.accessible = true;
    }
    if ("targetPlayerVersion" in attributes && attributes.targetPlayerVersion !== "0.0.0") {
        result.compilerOptions["target-player"] = attributes.targetPlayerVersion;
    }
    if ("sourceFolderPath" in attributes) {
        let mainFilePath = path.join(attributes.sourceFolderPath, mainApplicationFileName);
        result.files.push(mainFilePath);
    }
    let children = compilerElement.children;
    let compilerSourcePathElement = children.find((child) => {
        return child.type === "element" && child.name === "compilerSourcePath";
    });
    if (compilerSourcePathElement) {
        migrateCompilerSourcePathElement(compilerSourcePathElement, result);
    }
    let libraryPathElement = children.find((child) => {
        return child.type === "element" && child.name === "libraryPath";
    });
    if (libraryPathElement) {
        migrateLibraryPathElement(libraryPathElement, result);
    }
}
function migrateCompilerSourcePathElement(compilerSourcePathElement, result) {
    let sourcePaths = [];
    let children = compilerSourcePathElement.children;
    children.forEach((child) => {
        if (child.type !== "element" || child.name !== "compilerSourcePathEntry") {
            return;
        }
        let attributes = child.attributes;
        if (attributes.kind !== "1") {
            return;
        }
        if ("path" in attributes) {
            let sourcePath = attributes.path;
            sourcePath = sourcePath.replace("${DOCUMENTS}", "..");
            sourcePaths.push(sourcePath);
        }
    });
    result.compilerOptions["source-path"] = sourcePaths;
}
function migrateLibraryPathElement(libraryPathElement, result) {
    let libraryPaths = [];
    let children = libraryPathElement.children;
    children.forEach((child) => {
        if (child.type !== "element" || child.name !== "libraryPathEntry") {
            return;
        }
        let attributes = child.attributes;
        if (attributes.kind !== "1" && attributes.kind !== "3") {
            return;
        }
        if ("path" in attributes) {
            let libraryPath = attributes.path;
            libraryPath = libraryPath.replace("${DOCUMENTS}", "..");
            if (attributes.kind === "3") {
                libraryPath = path.join("..", libraryPath);
            }
            libraryPaths.push(libraryPath);
        }
    });
    result.compilerOptions["library-path"] = libraryPaths;
}
//# sourceMappingURL=migrateFlashBuilderProject.js.map
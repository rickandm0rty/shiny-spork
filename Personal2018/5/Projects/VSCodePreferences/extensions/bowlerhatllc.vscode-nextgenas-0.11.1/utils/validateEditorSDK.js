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
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const getJavaClassPathDelimiter_1 = require("./getJavaClassPathDelimiter");
/**
 * Checks if the path contains a valid Apache Royale SDK. May return a modified
 * path, if the real SDK appears in royale-asjs.
 * Returns null if the SDK is not valid.
 */
function validateEditorSDK(extensionPath, javaPath, sdkPath) {
    if (!sdkPath || !javaPath || !extensionPath) {
        return null;
    }
    if (!fs.existsSync(extensionPath) ||
        !fs.existsSync(javaPath) ||
        !fs.existsSync(sdkPath) ||
        !fs.statSync(sdkPath).isDirectory()) {
        return null;
    }
    if (validatePossibleEditorSDK(extensionPath, javaPath, sdkPath)) {
        return sdkPath;
    }
    //if it's an Apache Royale SDK, the "real" SDK might be inside the
    //royale-asjs directory instead of at the root
    let royalePath = path.join(sdkPath, "royale-asjs");
    if (validatePossibleEditorSDK(extensionPath, javaPath, royalePath)) {
        return royalePath;
    }
    return null;
}
exports.default = validateEditorSDK;
function validatePossibleEditorSDK(extensionPath, javaPath, sdkPath) {
    if (!hasRequiredFilesInSDK(sdkPath)) {
        return false;
    }
    let cpDelimiter = getJavaClassPathDelimiter_1.default();
    let args = [
        "-cp",
        path.resolve(sdkPath, "lib", "*") + cpDelimiter +
            path.resolve(sdkPath, "js", "lib", "*") + cpDelimiter +
            path.resolve(extensionPath, "bin", "check-royale-version.jar"),
        "com.nextgenactionscript.vscode.CheckRoyaleVersion",
    ];
    let result = child_process.spawnSync(javaPath, args);
    if (result.status !== 0) {
        return false;
    }
    return true;
}
function hasRequiredFilesInSDK(absolutePath) {
    if (!absolutePath) {
        return false;
    }
    //the following files are required to consider this a valid SDK
    let folderPaths = [
        path.join(absolutePath, "frameworks"),
        path.join(absolutePath, "bin"),
        path.join(absolutePath, "lib"),
        path.join(absolutePath, "js", "bin"),
        path.join(absolutePath, "js", "lib"),
    ];
    for (let i = 0, count = folderPaths.length; i < count; i++) {
        let folderPath = folderPaths[i];
        if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
            return false;
        }
    }
    let filePaths = [
        path.join(absolutePath, "royale-sdk-description.xml"),
        path.join(absolutePath, "js", "bin", "mxmlc"),
        path.join(absolutePath, "js", "bin", "asjsc"),
        path.join(absolutePath, "lib", "compiler.jar"),
    ];
    for (let i = 0, count = filePaths.length; i < count; i++) {
        let filePath = filePaths[i];
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=validateEditorSDK.js.map
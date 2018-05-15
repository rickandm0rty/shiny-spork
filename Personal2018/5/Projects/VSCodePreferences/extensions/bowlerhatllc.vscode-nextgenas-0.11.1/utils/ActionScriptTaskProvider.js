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
const fs = require("fs");
const json5 = require("json5");
const path = require("path");
const vscode = require("vscode");
const getFrameworkSDKPathWithFallbacks_1 = require("./getFrameworkSDKPathWithFallbacks");
const ASCONFIG_JSON = "asconfig.json";
const FILE_EXTENSION_AS = ".as";
;
const FILE_EXTENSION_MXML = ".mxml";
const CONFIG_AIR = "air";
const CONFIG_AIRMOBILE = "airmobile";
const FIELD_CONFIG = "config";
const FIELD_APPLICATION = "application";
const FIELD_AIR_OPTIONS = "airOptions";
const FIELD_TARGET = "target";
const PLATFORM_IOS = "ios";
const PLATFORM_IOS_SIMULATOR = "ios_simulator";
const PLATFORM_ANDROID = "android";
const PLATFORM_AIR = "air";
const PLATFORM_WINDOWS = "windows";
const PLATFORM_MAC = "mac";
const TARGET_AIR = "air";
const TARGET_BUNDLE = "bundle";
const TARGET_NATIVE = "native";
const MATCHER = "$nextgenas_nomatch";
const TASK_TYPE = "actionscript";
class ActionScriptTaskProvider {
    constructor(context, javaExecutablePath) {
        this.javaExecutablePath = javaExecutablePath;
        this._context = context;
    }
    provideTasks(token) {
        if (vscode.workspace.workspaceFolders === undefined) {
            return Promise.resolve([]);
        }
        let result = [];
        vscode.workspace.workspaceFolders.forEach((workspaceFolder) => {
            this.provideTasksForWorkspace(workspaceFolder, result);
        });
        return Promise.resolve(result);
    }
    provideTasksForWorkspace(workspaceFolder, result) {
        let provideTask = false;
        let isAIRMobile = false;
        let isAIRDesktop = false;
        let isSharedOverride = false;
        let isRootTargetShared = false;
        let isRootTargetBundle = false;
        let isRootTargetNativeInstaller = false;
        let isWindowsOverrideBundle = false;
        let isMacOverrideBundle = false;
        let isWindowsOverrideNativeInstaller = false;
        let isMacOverrideNativeInstaller = false;
        let isWindowsOverrideShared = false;
        let isMacOverrideShared = false;
        let asconfigJsonPath = path.join(workspaceFolder.uri.fsPath, ASCONFIG_JSON);
        if (fs.existsSync(asconfigJsonPath)) {
            //if asconfig.json exists in the root, always provide the tasks
            provideTask = true;
            let asconfigJson = this.readASConfigJSON(asconfigJsonPath);
            if (asconfigJson !== null) {
                isAIRMobile = this.isAIRMobile(asconfigJson);
                if (!isAIRMobile) {
                    isAIRDesktop = this.isAIRDesktop(asconfigJson);
                }
                isSharedOverride = this.isSharedOverride(asconfigJson);
                isRootTargetShared = this.isRootTargetShared(asconfigJson);
                isRootTargetBundle = this.isRootTargetBundle(asconfigJson);
                isRootTargetNativeInstaller = this.isRootTargetNativeInstaller(asconfigJson);
                isWindowsOverrideShared = this.isWindowsOverrideShared(asconfigJson);
                isMacOverrideShared = this.isMacOverrideShared(asconfigJson);
                isWindowsOverrideBundle = this.isWindowsOverrideBundle(asconfigJson);
                isMacOverrideBundle = this.isMacOverrideBundle(asconfigJson);
                isWindowsOverrideNativeInstaller = this.isWindowsOverrideNativeInstaller(asconfigJson);
                isMacOverrideNativeInstaller = this.isMacOverrideNativeInstaller(asconfigJson);
            }
        }
        if (!provideTask && vscode.window.activeTextEditor) {
            let fileName = vscode.window.activeTextEditor.document.fileName;
            if (fileName.endsWith(FILE_EXTENSION_AS) || fileName.endsWith(FILE_EXTENSION_MXML)) {
                //we couldn't find asconfig.json, but an .as or .mxml file is
                //currently open, so might as well provide the tasks
                provideTask = true;
            }
        }
        if (!provideTask) {
            return;
        }
        let command = this.getCommand(workspaceFolder);
        let frameworkSDK = getFrameworkSDKPathWithFallbacks_1.default();
        if (frameworkSDK === null) {
            //we don't have a valid SDK
            return;
        }
        //compile SWF or Royale JS
        result.push(this.getTask("compile debug build", workspaceFolder, command, frameworkSDK, true, null));
        result.push(this.getTask("compile release build", workspaceFolder, command, frameworkSDK, false, null));
        //package mobile AIR application
        if (isAIRMobile) {
            result.push(this.getTask("package debug iOS application (Device)", workspaceFolder, command, frameworkSDK, true, PLATFORM_IOS));
            result.push(this.getTask("package release iOS application (Device)", workspaceFolder, command, frameworkSDK, false, PLATFORM_IOS));
            result.push(this.getTask("package debug iOS application (Simulator)", workspaceFolder, command, frameworkSDK, true, PLATFORM_IOS_SIMULATOR));
            result.push(this.getTask("package release iOS application (Simulator)", workspaceFolder, command, frameworkSDK, false, PLATFORM_IOS_SIMULATOR));
            result.push(this.getTask("package debug Android application", workspaceFolder, command, frameworkSDK, true, PLATFORM_ANDROID));
            result.push(this.getTask("package release Android application", workspaceFolder, command, frameworkSDK, false, PLATFORM_ANDROID));
        }
        //desktop platform targets are a little trickier because some can only
        //be built on certain platforms. windows can't package for mac, and mac
        //can't package for windows, for instance.
        //if the windows or mac section exists, we need to check its target
        //to determine what to display in the list of tasks.
        //captive runtime
        if (isWindowsOverrideBundle) {
            result.push(this.getTask("package release Windows application (captive runtime)", workspaceFolder, command, frameworkSDK, false, PLATFORM_WINDOWS));
        }
        else if (isMacOverrideBundle) {
            result.push(this.getTask("package release macOS application (captive runtime)", workspaceFolder, command, frameworkSDK, false, PLATFORM_MAC));
        }
        else if (isWindowsOverrideShared) {
            result.push(this.getTask("package debug Windows application (shared runtime)", workspaceFolder, command, frameworkSDK, true, PLATFORM_WINDOWS));
            result.push(this.getTask("package release Windows application (shared runtime)", workspaceFolder, command, frameworkSDK, false, PLATFORM_WINDOWS));
        }
        else if (isMacOverrideShared) {
            result.push(this.getTask("package debug macOS application (shared runtime)", workspaceFolder, command, frameworkSDK, false, PLATFORM_MAC));
            result.push(this.getTask("package release macOS application (shared runtime)", workspaceFolder, command, frameworkSDK, true, PLATFORM_MAC));
        }
        else if (isWindowsOverrideNativeInstaller) {
            result.push(this.getTask("package release Windows application (native installer)", workspaceFolder, command, frameworkSDK, false, PLATFORM_WINDOWS));
        }
        else if (isMacOverrideNativeInstaller) {
            result.push(this.getTask("package release macOS application (native installer)", workspaceFolder, command, frameworkSDK, false, PLATFORM_MAC));
        }
        //--- root target in airOptions
        //the root target is used if it hasn't been overridden for the current
        //desktop platform. if it is overridden, it should be skipped to avoid
        //duplicate items in the list.
        if (isRootTargetBundle && !isWindowsOverrideBundle && !isMacOverrideBundle) {
            result.push(this.getTask("package release desktop application (captive runtime)", workspaceFolder, command, frameworkSDK, false, PLATFORM_AIR));
        }
        else if (isRootTargetNativeInstaller && !isWindowsOverrideNativeInstaller && !isMacOverrideNativeInstaller) {
            result.push(this.getTask("package release desktop application (native installer)", workspaceFolder, command, frameworkSDK, false, PLATFORM_AIR));
        }
        else if ((isRootTargetShared || isSharedOverride) && !isWindowsOverrideShared && !isMacOverrideShared) {
            result.push(this.getTask("package debug desktop application (shared runtime)", workspaceFolder, command, frameworkSDK, true, PLATFORM_AIR));
            result.push(this.getTask("package release desktop application (shared runtime)", workspaceFolder, command, frameworkSDK, false, PLATFORM_AIR));
        }
    }
    resolveTask(task) {
        console.error("resolve task", task);
        return undefined;
    }
    getTask(description, workspaceFolder, command, sdk, debug, airPlatform) {
        let definition = { type: TASK_TYPE, debug: debug };
        if (airPlatform) {
            definition.air = airPlatform;
        }
        let options = ["--sdk", sdk];
        if (debug) {
            options.push("--debug=true");
        }
        else {
            options.push("--debug=false");
        }
        if (airPlatform) {
            options.push("--air", airPlatform);
        }
        if (command.length > 1) {
            options.unshift(...command.slice(1));
        }
        let source = airPlatform === null ? "ActionScript" : "Adobe AIR";
        let execution = new vscode.ProcessExecution(command[0], options);
        let task = new vscode.Task(definition, workspaceFolder, description, source, execution, MATCHER);
        task.group = vscode.TaskGroup.Build;
        return task;
    }
    getDefaultCommand() {
        return [this.javaExecutablePath, "-jar", path.join(this._context.extensionPath, "bin", "asconfigc.jar")];
    }
    getCommand(workspaceRoot) {
        let nodeModulesBin = path.join(workspaceRoot.uri.fsPath, "node_modules", ".bin");
        if (process.platform === "win32") {
            let executableName = "asconfigc.cmd";
            //start out by looking for asconfigc in the workspace's local Node modules
            let winPath = path.join(nodeModulesBin, executableName);
            if (fs.existsSync(winPath)) {
                return [winPath];
            }
            let useBundled = vscode.workspace.getConfiguration("nextgenas").get("asconfigc.useBundled");
            if (!useBundled) {
                //use an executable on the system path
                return [executableName];
            }
            //use the version bundled with the extension
            return this.getDefaultCommand();
        }
        let executableName = "asconfigc";
        let unixPath = path.join(nodeModulesBin, executableName);
        if (fs.existsSync(unixPath)) {
            return [unixPath];
        }
        let useBundled = vscode.workspace.getConfiguration("nextgenas").get("asconfigc.useBundled");
        if (!useBundled) {
            //use an executable on the system path
            return [executableName];
        }
        //use the version bundled with the extension
        return this.getDefaultCommand();
    }
    readASConfigJSON(filePath) {
        try {
            let contents = fs.readFileSync(filePath, "utf8");
            return json5.parse(contents);
        }
        catch (error) {
        }
        return null;
    }
    isAIRDesktop(asconfigJson) {
        if (FIELD_APPLICATION in asconfigJson) {
            return true;
        }
        if (FIELD_AIR_OPTIONS in asconfigJson) {
            return true;
        }
        if (FIELD_CONFIG in asconfigJson) {
            let config = asconfigJson[FIELD_CONFIG];
            if (config === CONFIG_AIR) {
                return true;
            }
        }
        return false;
    }
    isAIRMobile(asconfigJson) {
        if (FIELD_CONFIG in asconfigJson) {
            let config = asconfigJson[FIELD_CONFIG];
            if (config === CONFIG_AIRMOBILE) {
                return true;
            }
        }
        return false;
    }
    isWindowsOverrideShared(asconfigJson) {
        if (process.platform !== "win32") {
            return false;
        }
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(PLATFORM_WINDOWS in airOptions)) {
            return false;
        }
        let windows = airOptions[PLATFORM_WINDOWS];
        if (!(FIELD_TARGET in windows)) {
            //if target is omitted, defaults to bundle
            return false;
        }
        let target = windows[FIELD_TARGET];
        return target === TARGET_AIR;
    }
    isMacOverrideShared(asconfigJson) {
        if (process.platform !== "darwin") {
            return false;
        }
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(PLATFORM_MAC in airOptions)) {
            return false;
        }
        let mac = airOptions[PLATFORM_MAC];
        if (!(FIELD_TARGET in mac)) {
            //if target is omitted, defaults to bundle
            return false;
        }
        let target = mac[FIELD_TARGET];
        return target === TARGET_AIR;
    }
    isWindowsOverrideNativeInstaller(asconfigJson) {
        if (process.platform !== "win32") {
            return false;
        }
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(PLATFORM_WINDOWS in airOptions)) {
            return false;
        }
        let windows = airOptions[PLATFORM_WINDOWS];
        if (!(FIELD_TARGET in windows)) {
            //if target is omitted, defaults to bundle
            return false;
        }
        let target = windows[FIELD_TARGET];
        return target === TARGET_NATIVE;
    }
    isMacOverrideNativeInstaller(asconfigJson) {
        if (process.platform !== "darwin") {
            return false;
        }
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(PLATFORM_MAC in airOptions)) {
            return false;
        }
        let mac = airOptions[PLATFORM_MAC];
        if (!(FIELD_TARGET in mac)) {
            //if target is omitted, defaults to bundle
            return false;
        }
        let target = mac[FIELD_TARGET];
        return target === TARGET_NATIVE;
    }
    isSharedOverride(asconfigJson) {
        if (process.platform !== "win32") {
            return false;
        }
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        return PLATFORM_AIR in airOptions;
    }
    isWindowsOverrideBundle(asconfigJson) {
        if (process.platform !== "win32") {
            return false;
        }
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(PLATFORM_WINDOWS in airOptions)) {
            return false;
        }
        let windows = airOptions[PLATFORM_WINDOWS];
        if (!(FIELD_TARGET in windows)) {
            //if target is omitted, default to bundle
            return true;
        }
        let target = windows[FIELD_TARGET];
        return target === TARGET_BUNDLE;
    }
    isMacOverrideBundle(asconfigJson) {
        if (process.platform !== "darwin") {
            return false;
        }
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(PLATFORM_MAC in airOptions)) {
            return false;
        }
        let mac = airOptions[PLATFORM_MAC];
        if (!(FIELD_TARGET in mac)) {
            //if target is omitted, default to bundle
            return true;
        }
        let target = mac[FIELD_TARGET];
        return target === TARGET_BUNDLE;
    }
    isRootTargetShared(asconfigJson) {
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(FIELD_TARGET in airOptions)) {
            //special case for mobile
            if (this.isAIRMobile(asconfigJson)) {
                return false;
            }
            //if target is omitted, defaults to air/shared
            return true;
        }
        let target = airOptions[FIELD_TARGET];
        return target === TARGET_AIR;
    }
    isRootTargetBundle(asconfigJson) {
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(FIELD_TARGET in airOptions)) {
            //if target is omitted, defaults to air/shared
            return false;
        }
        let target = airOptions[FIELD_TARGET];
        return target === TARGET_BUNDLE;
    }
    isRootTargetNativeInstaller(asconfigJson) {
        if (!(FIELD_AIR_OPTIONS in asconfigJson)) {
            return false;
        }
        let airOptions = asconfigJson[FIELD_AIR_OPTIONS];
        if (!(FIELD_TARGET in airOptions)) {
            //if target is omitted, defaults to air/shared
            return false;
        }
        let target = airOptions[FIELD_TARGET];
        return target === TARGET_NATIVE;
    }
}
exports.default = ActionScriptTaskProvider;
//# sourceMappingURL=ActionScriptTaskProvider.js.map
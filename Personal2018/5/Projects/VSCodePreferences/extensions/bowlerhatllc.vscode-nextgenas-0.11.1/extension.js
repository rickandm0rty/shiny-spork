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
const organizeImportsInTextEditor_1 = require("./commands/organizeImportsInTextEditor");
const findJava_1 = require("./utils/findJava");
const validateJava_1 = require("./utils/validateJava");
const validateEditorSDK_1 = require("./utils/validateEditorSDK");
const ActionScriptSourcePathDataProvider_1 = require("./utils/ActionScriptSourcePathDataProvider");
const ActionScriptTaskProvider_1 = require("./utils/ActionScriptTaskProvider");
const SWFDebugConfigurationProvider_1 = require("./utils/SWFDebugConfigurationProvider");
const SWCTextDocumentContentProvider_1 = require("./utils/SWCTextDocumentContentProvider");
const getJavaClassPathDelimiter_1 = require("./utils/getJavaClassPathDelimiter");
const findSDKShortName_1 = require("./utils/findSDKShortName");
const getFrameworkSDKPathWithFallbacks_1 = require("./utils/getFrameworkSDKPathWithFallbacks");
const adapterExecutableCommandSWF_1 = require("./commands/adapterExecutableCommandSWF");
const selectWorkspaceSDK_1 = require("./commands/selectWorkspaceSDK");
const migrateFlashBuilderProject_1 = require("./commands/migrateFlashBuilderProject");
const path = require("path");
const vscode = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const logCompilerShellOutput_1 = require("./commands/logCompilerShellOutput");
const INVALID_SDK_ERROR = "nextgenas.sdk.editor in settings does not point to a valid SDK. Requires Apache Royale 0.9.0 or newer.";
const MISSING_FRAMEWORK_SDK_ERROR = "You must configure an SDK to enable all ActionScript & MXML features.";
const INVALID_JAVA_ERROR = "nextgenas.java in settings does not point to a valid executable. It cannot be a directory, and Java 1.8 or newer is required.";
const MISSING_JAVA_ERROR = "Could not locate valid Java executable. To configure Java manually, use the nextgenas.java setting.";
const MISSING_WORKSPACE_ROOT_ERROR = "Open a folder and create a file named asconfig.json to enable all ActionScript & MXML language features.";
const CANNOT_LAUNCH_QUICK_COMPILE_FAILED_ERROR = "Quick compile failed with errors. Debug launch canceled.";
const QUICK_COMPILE_LANGUAGE_SERVER_NOT_STARTED_ERROR = "Quick compile failed. Try again after ActionScript & MXML extension is initialized.";
const INITIALIZING_MESSAGE = "Initializing ActionScript & MXML language server...";
const RESTART_FAIL_MESSAGE = "Failed to restart ActionScript & MXML server. Please reload the window to continue.";
const RELOAD_WINDOW_MESSAGE = "To apply new settings for ActionScript & MXML, please reload the window.";
const RELOAD_WINDOW_BUTTON_LABEL = "Reload Window";
const CONFIGURE_SDK_LABEL = "Configure SDK";
const NO_SDK = "$(alert) No SDK";
let savedContext;
let savedLanguageClient;
let languageClientStarted = false;
let bundledCompilerPath;
let editorSDKHome;
let javaExecutablePath;
let frameworkSDKHome;
let sdkStatusBarItem;
let sourcePathDataProvider = null;
let actionScriptTaskProvider = null;
let debugConfigurationProvider = null;
let swcTextDocumentContentProvider = null;
function getValidatedEditorSDKConfiguration(javaExecutablePath) {
    let result = vscode.workspace.getConfiguration("nextgenas").get("sdk.editor");
    //this may return null
    return validateEditorSDK_1.default(savedContext.extensionPath, javaExecutablePath, result);
}
function onDidChangeConfiguration(event) {
    let javaSettingsPath = vscode.workspace.getConfiguration("nextgenas").get("java");
    let newJavaExecutablePath = findJava_1.default(javaSettingsPath, (javaPath) => {
        return validateJava_1.default(savedContext.extensionPath, javaPath);
    });
    let newEditorSDKHome = getValidatedEditorSDKConfiguration(newJavaExecutablePath);
    let newFrameworkSDKHome = getFrameworkSDKPathWithFallbacks_1.default();
    let restarting = false;
    if (editorSDKHome != newEditorSDKHome ||
        javaExecutablePath != newJavaExecutablePath) {
        //we're going to try to kill the language server and then restart
        //it with the new settings
        restarting = true;
        restartServer();
    }
    let frameworkChanged = frameworkSDKHome != newFrameworkSDKHome;
    if (editorSDKHome != newEditorSDKHome ||
        frameworkChanged) {
        editorSDKHome = newEditorSDKHome;
        frameworkSDKHome = newFrameworkSDKHome;
        updateSDKStatusBarItem();
        if (!savedLanguageClient && !restarting && frameworkChanged) {
            restartServer();
        }
    }
}
function updateSDKStatusBarItem() {
    let sdkShortName = NO_SDK;
    if (frameworkSDKHome) {
        sdkShortName = findSDKShortName_1.default(frameworkSDKHome);
    }
    sdkStatusBarItem.text = sdkShortName;
}
function restartServer() {
    if (!savedLanguageClient) {
        startClient();
        return;
    }
    let languageClient = savedLanguageClient;
    savedLanguageClient = null;
    languageClientStarted = false;
    languageClient.stop().then(() => {
        startClient();
    }, () => {
        //something went wrong restarting the language server...
        //this shouldn't happen, but if it does, the user can manually
        //restart
        vscode.window.showWarningMessage(RELOAD_WINDOW_MESSAGE, RELOAD_WINDOW_BUTTON_LABEL).then((action) => {
            if (action === RELOAD_WINDOW_BUTTON_LABEL) {
                vscode.commands.executeCommand("workbench.action.reloadWindow");
            }
        });
    });
}
function activate(context) {
    savedContext = context;
    let javaSettingsPath = vscode.workspace.getConfiguration("nextgenas").get("java");
    javaExecutablePath = findJava_1.default(javaSettingsPath, (javaPath) => {
        return validateJava_1.default(savedContext.extensionPath, javaPath);
    });
    editorSDKHome = getValidatedEditorSDKConfiguration(javaExecutablePath);
    frameworkSDKHome = getFrameworkSDKPathWithFallbacks_1.default();
    vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration);
    vscode.languages.setLanguageConfiguration("nextgenas", {
        //this code is MIT licensed from Microsoft's official TypeScript
        //extension that's built into VSCode
        //https://github.com/Microsoft/vscode/blob/9d611d4dfd5a4a101b5201b8c9e21af97f06e7a7/extensions/typescript/src/typescriptMain.ts#L186
        "onEnterRules": [
            {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: {
                    //if you press enter between /** and */ on the same line,
                    //it will insert a * on the next line
                    indentAction: vscode.IndentAction.IndentOutdent,
                    appendText: " * "
                }
            },
            {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                action: {
                    //if you press enter after /**, when there is no */, it
                    //will insert a * on the next line
                    indentAction: vscode.IndentAction.None,
                    appendText: " * "
                }
            },
            {
                beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                action: {
                    //if you press enter on a line with *, it will insert
                    //another * on the next line
                    indentAction: vscode.IndentAction.None,
                    appendText: "* "
                }
            },
            {
                beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
                action: {
                    //removes the extra space if you press enter after a line
                    //that contains only */
                    indentAction: vscode.IndentAction.None,
                    removeText: 1
                }
            },
            {
                beforeText: /^(\t|(\ \ ))*\ \*[^/]*\*\/\s*$/,
                action: {
                    //removes the extra space if you press enter after a line
                    //that starts with * and also has */ at the end
                    indentAction: vscode.IndentAction.None,
                    removeText: 1
                }
            }
        ]
    });
    vscode.commands.registerCommand("nextgenas.adapterExecutableCommandSWF", function (workspaceUri) {
        return adapterExecutableCommandSWF_1.default(workspaceUri, javaExecutablePath, editorSDKHome, frameworkSDKHome);
    });
    vscode.commands.registerCommand("nextgenas.selectWorkspaceSDK", selectWorkspaceSDK_1.default);
    vscode.commands.registerCommand("nextgenas.restartServer", restartServer);
    vscode.commands.registerCommand("nextgenas.logCompilerShellOutput", logCompilerShellOutput_1.default);
    vscode.commands.registerCommand("nextgenas.migrateFlashBuilderProject", () => {
        if (vscode.workspace.workspaceFolders) {
            migrateFlashBuilderProject_1.default(vscode.workspace.workspaceFolders[0].uri);
        }
    });
    vscode.commands.registerCommand("nextgenas.quickCompileAndDebug", () => {
        if (vscode.workspace.workspaceFolders) {
            if (!savedLanguageClient || !languageClientStarted) {
                vscode.window.showErrorMessage(QUICK_COMPILE_LANGUAGE_SERVER_NOT_STARTED_ERROR);
                return;
            }
            vscode.commands.executeCommand("nextgenas.quickCompile").then((result) => {
                if (result) {
                    vscode.commands.executeCommand("workbench.action.debug.start");
                }
                else {
                    vscode.window.showErrorMessage(CANNOT_LAUNCH_QUICK_COMPILE_FAILED_ERROR);
                }
            }, () => {
                //if the build failed, notify the user that we're not starting
                //a debug session
                vscode.window.showErrorMessage(CANNOT_LAUNCH_QUICK_COMPILE_FAILED_ERROR);
            });
        }
    });
    vscode.commands.registerTextEditorCommand("nextgenas.organizeImportsInTextEditor", organizeImportsInTextEditor_1.default);
    //don't activate these things unless we're in a workspace
    if (vscode.workspace.workspaceFolders !== undefined) {
        sdkStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        updateSDKStatusBarItem();
        sdkStatusBarItem.tooltip = "Select ActionScript SDK";
        sdkStatusBarItem.command = "nextgenas.selectWorkspaceSDK";
        sdkStatusBarItem.show();
        let rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        sourcePathDataProvider = new ActionScriptSourcePathDataProvider_1.default(rootPath);
        vscode.window.registerTreeDataProvider("actionScriptSourcePaths", sourcePathDataProvider);
        actionScriptTaskProvider = new ActionScriptTaskProvider_1.default(context, javaExecutablePath);
        vscode.workspace.registerTaskProvider("actionscript", actionScriptTaskProvider);
        debugConfigurationProvider = new SWFDebugConfigurationProvider_1.default();
        vscode.debug.registerDebugConfigurationProvider("swf", debugConfigurationProvider);
        swcTextDocumentContentProvider = new SWCTextDocumentContentProvider_1.default();
        vscode.workspace.registerTextDocumentContentProvider("swc", swcTextDocumentContentProvider);
    }
    startClient();
}
exports.activate = activate;
function deactivate() {
    savedContext = null;
}
exports.deactivate = deactivate;
function childExitListener(code) {
    console.info("Child process exited", code);
    if (code === 0) {
        return;
    }
    vscode.window.showErrorMessage("ActionScript & MXML extension exited with error code " + code);
}
function childErrorListener(error) {
    vscode.window.showErrorMessage("Failed to start ActionScript & MXML extension.");
    console.error("Error connecting to child process.");
    console.error(error);
}
function hasInvalidJava() {
    let javaPath = vscode.workspace.getConfiguration("nextgenas").get("java");
    return !javaExecutablePath && javaPath != null;
}
function hasInvalidEditorSDK() {
    let sdkPath = vscode.workspace.getConfiguration("nextgenas").get("sdk.editor");
    return !editorSDKHome && sdkPath != null;
}
function showMissingFrameworkSDKError() {
    vscode.window.showErrorMessage(MISSING_FRAMEWORK_SDK_ERROR, CONFIGURE_SDK_LABEL).then((value) => {
        if (value === CONFIGURE_SDK_LABEL) {
            selectWorkspaceSDK_1.default();
        }
    });
}
function startClient() {
    if (!savedContext) {
        //something very bad happened!
        return;
    }
    if (vscode.workspace.workspaceFolders === undefined) {
        vscode.window.showInformationMessage(MISSING_WORKSPACE_ROOT_ERROR, { title: "Help", href: "https://github.com/BowlerHatLLC/vscode-nextgenas/wiki" }).then((value) => {
            if (value && value.href) {
                let uri = vscode.Uri.parse(value.href);
                vscode.commands.executeCommand("vscode.open", uri);
            }
        });
        return;
    }
    if (hasInvalidJava()) {
        vscode.window.showErrorMessage(INVALID_JAVA_ERROR);
        return;
    }
    if (!javaExecutablePath) {
        vscode.window.showErrorMessage(MISSING_JAVA_ERROR);
        return;
    }
    if (hasInvalidEditorSDK()) {
        vscode.window.showErrorMessage(INVALID_SDK_ERROR);
        return;
    }
    if (!frameworkSDKHome) {
        showMissingFrameworkSDKError();
        return;
    }
    vscode.window.withProgress({ location: vscode.ProgressLocation.Window }, (progress) => {
        return new Promise((resolve, reject) => {
            progress.report({ message: INITIALIZING_MESSAGE });
            let clientOptions = {
                documentSelector: [
                    "nextgenas",
                    "mxml",
                ],
                synchronize: {
                    configurationSection: "nextgenas",
                }
            };
            let cpDelimiter = getJavaClassPathDelimiter_1.default();
            let cp = path.resolve(savedContext.extensionPath, "bin", "*");
            if (editorSDKHome) {
                //use the nextgenas.sdk.editor configuration
                cp += cpDelimiter +
                    //the following jars come from apache royale
                    path.resolve(editorSDKHome, "lib", "*") +
                    cpDelimiter +
                    path.resolve(editorSDKHome, "lib", "external", "*") +
                    cpDelimiter +
                    path.resolve(editorSDKHome, "js", "lib", "*");
            }
            else {
                //use the bundled compiler
                cp += cpDelimiter + path.join(savedContext.asAbsolutePath("./bundled-compiler"), "*");
            }
            let args = [
                "-Dfile.encoding=UTF8",
                "-cp",
                cp,
                "com.nextgenactionscript.vscode.Main",
            ];
            if (frameworkSDKHome) {
                args.unshift("-Droyalelib=" + path.join(frameworkSDKHome, "frameworks"));
            }
            let executable = {
                command: javaExecutablePath,
                args: args,
                options: {
                    cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
                }
            };
            let options;
            languageClientStarted = false;
            savedLanguageClient = new vscode_languageclient_1.LanguageClient("nextgenas", "ActionScript & MXML Language Server", executable, clientOptions);
            savedLanguageClient.onReady().then(() => {
                resolve();
                languageClientStarted = true;
                savedLanguageClient.onNotification("nextgenas/logCompilerShellOutput", (notification) => {
                    logCompilerShellOutput_1.default(notification, false, false);
                });
                savedLanguageClient.onNotification("nextgenas/clearCompilerShellOutput", () => {
                    logCompilerShellOutput_1.default(null, false, true);
                });
            });
            let disposable = savedLanguageClient.start();
            savedContext.subscriptions.push(disposable);
        });
    });
}
//# sourceMappingURL=extension.js.map
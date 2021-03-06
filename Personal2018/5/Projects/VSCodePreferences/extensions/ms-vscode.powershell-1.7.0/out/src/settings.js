/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils = require("./utils");
var CodeFormattingPreset;
(function (CodeFormattingPreset) {
    CodeFormattingPreset[CodeFormattingPreset["Custom"] = 0] = "Custom";
    CodeFormattingPreset[CodeFormattingPreset["Allman"] = 1] = "Allman";
    CodeFormattingPreset[CodeFormattingPreset["OTBS"] = 2] = "OTBS";
    CodeFormattingPreset[CodeFormattingPreset["Stroustrup"] = 3] = "Stroustrup";
})(CodeFormattingPreset || (CodeFormattingPreset = {}));
class HelpCompletion {
}
HelpCompletion.Disabled = "Disabled";
HelpCompletion.BlockComment = "BlockComment";
HelpCompletion.LineComment = "LineComment";
exports.HelpCompletion = HelpCompletion;
function load() {
    const configuration = vscode.workspace.getConfiguration(utils.PowerShellLanguageId);
    const defaultBugReportingSettings = {
        project: "https://github.com/PowerShell/vscode-powershell",
    };
    const defaultScriptAnalysisSettings = {
        enable: true,
        settingsPath: "",
    };
    const defaultDebuggingSettings = {
        createTemporaryIntegratedConsole: false,
    };
    const defaultDeveloperSettings = {
        featureFlags: [],
        powerShellExePath: undefined,
        bundledModulesPath: "../../../PowerShellEditorServices/module",
        editorServicesLogLevel: "Normal",
        editorServicesWaitForDebugger: false,
        powerShellExeIsWindowsDevBuild: false,
    };
    const defaultCodeFormattingSettings = {
        preset: CodeFormattingPreset.Custom,
        openBraceOnSameLine: true,
        newLineAfterOpenBrace: true,
        newLineAfterCloseBrace: true,
        whitespaceBeforeOpenBrace: true,
        whitespaceBeforeOpenParen: true,
        whitespaceAroundOperator: true,
        whitespaceAfterSeparator: true,
        ignoreOneLineBlock: true,
        alignPropertyValuePairs: true,
    };
    const defaultIntegratedConsoleSettings = {
        showOnStartup: true,
        focusConsoleOnExecute: true,
    };
    return {
        startAutomatically: configuration.get("startAutomatically", true),
        powerShellAdditionalExePaths: configuration.get("powerShellAdditionalExePaths", undefined),
        powerShellDefaultVersion: configuration.get("powerShellDefaultVersion", undefined),
        powerShellExePath: configuration.get("powerShellExePath", undefined),
        bundledModulesPath: "../../modules",
        useX86Host: configuration.get("useX86Host", false),
        enableProfileLoading: configuration.get("enableProfileLoading", false),
        helpCompletion: configuration.get("helpCompletion", HelpCompletion.BlockComment),
        scriptAnalysis: configuration.get("scriptAnalysis", defaultScriptAnalysisSettings),
        debugging: configuration.get("debugging", defaultDebuggingSettings),
        developer: getWorkspaceSettingsWithDefaults(configuration, "developer", defaultDeveloperSettings),
        codeFormatting: configuration.get("codeFormatting", defaultCodeFormattingSettings),
        integratedConsole: configuration.get("integratedConsole", defaultIntegratedConsoleSettings),
        bugReporting: configuration.get("bugReporting", defaultBugReportingSettings),
    };
}
exports.load = load;
function change(settingName, newValue, global = false) {
    const configuration = vscode.workspace.getConfiguration(utils.PowerShellLanguageId);
    return configuration.update(settingName, newValue, global);
}
exports.change = change;
function getWorkspaceSettingsWithDefaults(workspaceConfiguration, settingName, defaultSettings) {
    const importedSettings = workspaceConfiguration.get(settingName, defaultSettings);
    for (const setting in importedSettings) {
        if (importedSettings[setting]) {
            defaultSettings[setting] = importedSettings[setting];
        }
    }
    return defaultSettings;
}
//# sourceMappingURL=settings.js.map
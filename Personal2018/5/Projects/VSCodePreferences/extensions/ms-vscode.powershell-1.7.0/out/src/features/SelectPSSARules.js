"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const checkboxQuickPick_1 = require("../controls/checkboxQuickPick");
exports.GetPSSARulesRequestType = new vscode_languageclient_1.RequestType("powerShell/getPSSARules");
exports.SetPSSARulesRequestType = new vscode_languageclient_1.RequestType("powerShell/setPSSARules");
class RuleInfo {
}
class SelectPSSARulesFeature {
    constructor() {
        this.command = vscode.commands.registerCommand("PowerShell.SelectPSSARules", () => {
            if (this.languageClient === undefined) {
                return;
            }
            this.languageClient.sendRequest(exports.GetPSSARulesRequestType, null).then((returnedRules) => {
                if (returnedRules == null) {
                    vscode.window.showWarningMessage("PowerShell extension uses PSScriptAnalyzer settings file - Cannot update rules.");
                    return;
                }
                const options = returnedRules.map((rule) => {
                    return { label: rule.name, isSelected: rule.isEnabled };
                });
                checkboxQuickPick_1.showCheckboxQuickPick(options)
                    .then((updatedOptions) => {
                    if (updatedOptions === undefined) {
                        return;
                    }
                    this.languageClient.sendRequest(exports.SetPSSARulesRequestType, {
                        filepath: vscode.window.activeTextEditor.document.uri.toString(),
                        ruleInfos: updatedOptions.map((option) => {
                            return { name: option.label, isEnabled: option.isSelected };
                        }),
                    });
                });
            });
        });
    }
    dispose() {
        this.command.dispose();
    }
    setLanguageClient(languageclient) {
        this.languageClient = languageclient;
    }
}
exports.SelectPSSARulesFeature = SelectPSSARulesFeature;
//# sourceMappingURL=SelectPSSARules.js.map
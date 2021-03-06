"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
var Window = vscode.window;
const vscode_languageclient_1 = require("vscode-languageclient");
exports.ExpandAliasRequestType = new vscode_languageclient_1.RequestType("powerShell/expandAlias");
class ExpandAliasFeature {
    constructor() {
        this.command = vscode.commands.registerCommand("PowerShell.ExpandAlias", () => {
            if (this.languageClient === undefined) {
                // TODO: Log error message
                return;
            }
            const editor = Window.activeTextEditor;
            const document = editor.document;
            const selection = editor.selection;
            const sls = selection.start;
            const sle = selection.end;
            let text;
            let range;
            if ((sls.character === sle.character) && (sls.line === sle.line)) {
                text = document.getText();
                range = new vscode.Range(0, 0, document.lineCount, text.length);
            }
            else {
                text = document.getText(selection);
                range = new vscode.Range(sls.line, sls.character, sle.line, sle.character);
            }
            this.languageClient.sendRequest(exports.ExpandAliasRequestType, text).then((result) => {
                editor.edit((editBuilder) => {
                    editBuilder.replace(range, result);
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
exports.ExpandAliasFeature = ExpandAliasFeature;
//# sourceMappingURL=ExpandAlias.js.map
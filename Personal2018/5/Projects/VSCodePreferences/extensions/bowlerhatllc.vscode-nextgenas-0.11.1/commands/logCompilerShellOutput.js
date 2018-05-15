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
const OUTPUT_CHANNEL_NAME = "ActionScript & MXML: Quick Compile";
let outputChannel = null;
function logCompilerShellOutput(message, line = true, clear = false) {
    if (outputChannel === null) {
        outputChannel = vscode.window.createOutputChannel(OUTPUT_CHANNEL_NAME);
    }
    outputChannel.show();
    if (clear) {
        outputChannel.clear();
    }
    if (message) {
        if (line) {
            outputChannel.appendLine(message);
        }
        else {
            outputChannel.append(message);
        }
    }
}
exports.default = logCompilerShellOutput;
//# sourceMappingURL=logCompilerShellOutput.js.map
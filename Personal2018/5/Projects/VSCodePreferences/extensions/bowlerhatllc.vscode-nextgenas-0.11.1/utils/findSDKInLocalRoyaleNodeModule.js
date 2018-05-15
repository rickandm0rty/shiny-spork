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
const path = require("path");
const vscode = require("vscode");
const validateFrameworkSDK_1 = require("./validateFrameworkSDK");
const NODE_MODULES = "node_modules";
const MODULE_ORG = "@apache-royale";
const MODULE_NAMES = [
    "royale-js",
    "royale-js-swf",
];
function findSDKInLocalRoyaleNodeModule() {
    if (vscode.workspace.workspaceFolders === undefined) {
        return null;
    }
    for (let i = 0, count = MODULE_NAMES.length; i < count; i++) {
        let moduleName = MODULE_NAMES[i];
        let nodeModule = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, NODE_MODULES, MODULE_ORG, moduleName);
        nodeModule = validateFrameworkSDK_1.default(nodeModule);
        if (nodeModule !== null) {
            return nodeModule;
        }
    }
    return null;
}
exports.default = findSDKInLocalRoyaleNodeModule;
//# sourceMappingURL=findSDKInLocalRoyaleNodeModule.js.map
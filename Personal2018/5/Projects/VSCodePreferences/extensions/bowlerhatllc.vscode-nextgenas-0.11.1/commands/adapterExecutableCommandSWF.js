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
const getJavaClassPathDelimiter_1 = require("../utils/getJavaClassPathDelimiter");
function default_1(workspaceUri, javaPath, editorSDKPath, frameworkSDKPath) {
    let uri = vscode.Uri.parse(workspaceUri);
    let args = [
        "-Dworkspace=" + uri.fsPath,
        //uncomment to debug the SWF debugger JAR
        //"-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005",
        "-Dflexlib=" + path.resolve(frameworkSDKPath, "frameworks"),
        "-cp",
        getClassPath(editorSDKPath),
        "com.nextgenactionscript.vscode.SWFDebug"
    ];
    let result = {
        command: javaPath,
        args: args
    };
    return result;
}
exports.default = default_1;
function getClassPath(sdkPath) {
    let extension = vscode.extensions.getExtension("bowlerhatllc.vscode-nextgenas");
    let cp = path.resolve(extension.extensionPath, "bin", "*");
    if (sdkPath) {
        cp += getJavaClassPathDelimiter_1.default() + path.resolve(sdkPath, "lib", "*");
    }
    else {
        cp += getJavaClassPathDelimiter_1.default() + path.resolve(extension.extensionPath, "bundled-compiler", "*");
    }
    return cp;
}
//# sourceMappingURL=adapterExecutableCommandSWF.js.map
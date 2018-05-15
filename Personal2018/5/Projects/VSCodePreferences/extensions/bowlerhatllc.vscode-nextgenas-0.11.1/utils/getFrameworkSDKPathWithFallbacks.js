"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const validateFrameworkSDK_1 = require("./validateFrameworkSDK");
const findSDKInLocalRoyaleNodeModule_1 = require("./findSDKInLocalRoyaleNodeModule");
const findSDKInLocalFlexJSNodeModule_1 = require("./findSDKInLocalFlexJSNodeModule");
const findSDKInRoyaleHomeEnvironmentVariable_1 = require("./findSDKInRoyaleHomeEnvironmentVariable");
const findSDKInFlexHomeEnvironmentVariable_1 = require("./findSDKInFlexHomeEnvironmentVariable");
const findSDKsInPathEnvironmentVariable_1 = require("./findSDKsInPathEnvironmentVariable");
function getFrameworkSDKPathWithFallbacks() {
    if (vscode.workspace.workspaceFolders === undefined) {
        //no open workspace means no SDK
        return null;
    }
    let sdkPath = null;
    let frameworkSetting = vscode.workspace.getConfiguration("nextgenas").get("sdk.framework");
    if (frameworkSetting) {
        //no fallbacks if this SDK isn't valid!
        //this may return null
        return validateFrameworkSDK_1.default(frameworkSetting);
    }
    if (!sdkPath) {
        //for legacy reasons, we support falling back to the editor SDK
        let editorSetting = vscode.workspace.getConfiguration("nextgenas").get("sdk.editor");
        if (editorSetting) {
            //no fallbacks if this SDK isn't valid!
            //this may return null
            return validateFrameworkSDK_1.default(editorSetting);
        }
    }
    //the following SDKs are all intelligent fallbacks
    if (!sdkPath) {
        //check if an Apache Royale Node module is installed locally in the workspace
        sdkPath = findSDKInLocalRoyaleNodeModule_1.default();
    }
    if (!sdkPath) {
        //check if an Apache FlexJS Node module is installed locally in the workspace
        sdkPath = findSDKInLocalFlexJSNodeModule_1.default();
    }
    if (!sdkPath) {
        //the ROYALE_HOME environment variable may point to an SDK
        sdkPath = findSDKInRoyaleHomeEnvironmentVariable_1.default();
    }
    if (!sdkPath) {
        //the FLEX_HOME environment variable may point to an SDK
        sdkPath = findSDKInFlexHomeEnvironmentVariable_1.default();
    }
    if (!sdkPath) {
        //this should be the same SDK that is used if the user tries to run the
        //compiler from the command line without an absolute path
        let sdkPaths = findSDKsInPathEnvironmentVariable_1.default();
        if (sdkPaths.length > 0) {
            sdkPath = sdkPaths[0];
        }
    }
    return sdkPath;
}
exports.default = getFrameworkSDKPathWithFallbacks;
//# sourceMappingURL=getFrameworkSDKPathWithFallbacks.js.map
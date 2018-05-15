"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateFrameworkSDK_1 = require("./validateFrameworkSDK");
const ENVIRONMENT_VARIABLE_FLEX_HOME = "FLEX_HOME";
function findSDKInFlexHomeEnvironmentVariable() {
    if (ENVIRONMENT_VARIABLE_FLEX_HOME in process.env) {
        let flexHome = process.env.FLEX_HOME;
        //this may return null
        return validateFrameworkSDK_1.default(flexHome);
    }
    return null;
}
exports.default = findSDKInFlexHomeEnvironmentVariable;
//# sourceMappingURL=findSDKInFlexHomeEnvironmentVariable.js.map
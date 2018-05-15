"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateFrameworkSDK_1 = require("./validateFrameworkSDK");
const ENVIRONMENT_VARIABLE_ROYALE_HOME = "ROYALE_HOME";
function findSDKInRoyaleHomeEnvironmentVariable() {
    if (ENVIRONMENT_VARIABLE_ROYALE_HOME in process.env) {
        let flexHome = process.env.ROYALE_HOME;
        //this may return null
        return validateFrameworkSDK_1.default(flexHome);
    }
    return null;
}
exports.default = findSDKInRoyaleHomeEnvironmentVariable;
//# sourceMappingURL=findSDKInRoyaleHomeEnvironmentVariable.js.map
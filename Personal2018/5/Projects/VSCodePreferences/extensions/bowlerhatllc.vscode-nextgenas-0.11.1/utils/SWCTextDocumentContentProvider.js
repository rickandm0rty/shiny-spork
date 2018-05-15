"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SWCTextDocumentContentProvider {
    provideTextDocumentContent(uri, token) {
        return decodeURIComponent(uri.query);
    }
}
exports.default = SWCTextDocumentContentProvider;
//# sourceMappingURL=SWCTextDocumentContentProvider.js.map
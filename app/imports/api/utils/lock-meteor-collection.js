"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DENY_RULES = {
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; },
};
function lockCollection(collection) {
    collection.deny(DENY_RULES);
    return collection;
}
exports.default = lockCollection;
//# sourceMappingURL=lock-meteor-collection.js.map
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "meteor/accounts-base", "meteor/alanning:roles", "meteor/meteor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var accounts_base_1 = require("meteor/accounts-base");
    var alanning_roles_1 = require("meteor/alanning:roles");
    var meteor_1 = require("meteor/meteor");
    /* eslint-disable no-console */
    function createUser(email, password, role) {
        console.log("  Creating user " + email + "."); // tslint:disable-line
        var userID = accounts_base_1.Accounts.createUser({
            email: email,
            password: password,
            username: email,
        });
        if (role === 'admin') {
            alanning_roles_1.Roles.addUsersToRoles(userID, 'admin');
        }
    }
    /** When running app for first time, pass a settings file to set up a default user account. */
    if (meteor_1.Meteor.users.find().count() === 0) {
        if (meteor_1.Meteor.settings.defaultAccounts) {
            console.log('Creating the default user(s)'); // tslint:disable-line
            meteor_1.Meteor.settings.defaultAccounts.map(function (_a) {
                var email = _a.email, password = _a.password, role = _a.role;
                return createUser(email, password, role);
            });
        }
        else {
            console.log('Cannot initialize the database!  Please invoke meteor with a settings file.'); // tslint:disable-line
        }
    }
});
//# sourceMappingURL=accounts.js.map
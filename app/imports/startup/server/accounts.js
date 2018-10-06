"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_1 = require("meteor/meteor");
var accounts_base_1 = require("meteor/accounts-base");
var alanning_roles_1 = require("meteor/alanning:roles");
/* eslint-disable no-console */
function createUser(email, password, role) {
    console.log("  Creating user " + email + ".");
    var userID = accounts_base_1.Accounts.createUser({
        username: email,
        email: email,
        password: password,
    });
    if (role === 'admin') {
        alanning_roles_1.Roles.addUsersToRoles(userID, 'admin');
    }
}
/** When running app for first time, pass a settings file to set up a default user account. */
if (meteor_1.Meteor.users.find().count() === 0) {
    if (meteor_1.Meteor.settings.defaultAccounts) {
        console.log('Creating the default user(s)');
        meteor_1.Meteor.settings.defaultAccounts.map(function (_a) {
            var email = _a.email, password = _a.password, role = _a.role;
            return createUser(email, password, role);
        });
    }
    else {
        console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
    }
}
//# sourceMappingURL=accounts.js.map
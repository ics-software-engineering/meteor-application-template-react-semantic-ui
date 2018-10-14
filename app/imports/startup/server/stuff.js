(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "meteor/meteor", "meteor/alanning:roles", "../../api/stuff/stuff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var alanning_roles_1 = require("meteor/alanning:roles");
    console.time('startup/server');
    var stuff_1 = require("../../api/stuff/stuff");
    console.timeEnd('startup/server');
    /** Initialize the database with a default data document. */
    function addData(data) {
        console.log("  Adding: " + data.name + " (" + data.owner + ")");
        stuff_1.Stuffs.insert(data);
    }
    /** Initialize the collection if empty. */
    if (stuff_1.Stuffs.find().count() === 0) {
        if (meteor_1.Meteor.settings.defaultData) {
            console.log('Creating default data.');
            meteor_1.Meteor.settings.defaultData.map(function (data) { return addData(data); });
        }
    }
    /** This subscription publishes only the documents associated with the logged in user */
    meteor_1.Meteor.publish('Stuff', function publish() {
        if (this.userId) {
            var username = meteor_1.Meteor.users.findOne(this.userId).username;
            return stuff_1.Stuffs.find({ owner: username });
        }
        return this.ready();
    });
    /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
    meteor_1.Meteor.publish('StuffAdmin', function publish() {
        if (this.userId && alanning_roles_1.Roles.userIsInRole(this.userId, 'admin')) {
            return stuff_1.Stuffs.find();
        }
        return this.ready();
    });
});
//# sourceMappingURL=stuff.js.map
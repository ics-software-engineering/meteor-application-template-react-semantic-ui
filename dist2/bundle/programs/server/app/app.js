var require = meteorInstall({"imports":{"api":{"stuff":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/stuff/index.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./stuff"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  require("./stuff");
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/api/stuff/index", ["require", "exports", "./stuff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("./stuff");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stuff.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/stuff/stuff.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/mongo", "meteor/tracker", "simpl-schema"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var mongo_1 = require("meteor/mongo");

  var tracker_1 = require("meteor/tracker");

  var simpl_schema_1 = require("simpl-schema");
  /** Create a Meteor collection. */
  // console.log('creating collection stuffs');
  // console.trace('creating collection stuffs');


  var name = 'Stuffs';

  var StuffCollection =
  /** @class */
  function () {
    function StuffCollection() {// nothing to do.
    }

    StuffCollection.getInstance = function () {
      if (!StuffCollection.instance) {
        StuffCollection.instance = new StuffCollection();

        if (!mongo_1.Mongo.Collection.get(name)) {
          StuffCollection.instance.collection = new mongo_1.Mongo.Collection(name);
        } else {
          StuffCollection.instance.collection = mongo_1.Mongo.Collection.get(name);
        }
      }

      return StuffCollection.instance;
    };

    StuffCollection.prototype.getCollection = function () {
      return this.collection;
    };

    return StuffCollection;
  }();

  console.time('Stuffs'); // tslint:disable-line

  var Stuffs = StuffCollection.getInstance().getCollection();
  exports.Stuffs = Stuffs;
  console.timeEnd('Stuffs'); // tslint:disable-line

  /** Create a schema to constrain the structure of documents associated with this collection. */

  var StuffSchema = new simpl_schema_1.default({
    condition: {
      allowedValues: ['excellent', 'good', 'fair', 'poor'],
      defaultValue: 'good',
      type: String
    },
    name: String,
    owner: String,
    quantity: Number
  }, {
    tracker: tracker_1.Tracker
  });
  exports.StuffSchema = StuffSchema;
  /** Attach this schema to the collection. */

  Stuffs.attachSchema(StuffSchema);
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/api/stuff/stuff", ["require", "exports", "meteor/mongo", "meteor/tracker", "simpl-schema"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mongo_1 = require("meteor/mongo");
    const tracker_1 = require("meteor/tracker");
    const simpl_schema_1 = require("simpl-schema");
    /** Create a Meteor collection. */
    // console.log('creating collection stuffs');
    // console.trace('creating collection stuffs');
    const name = 'Stuffs';
    class StuffCollection {
        static getInstance() {
            if (!StuffCollection.instance) {
                StuffCollection.instance = new StuffCollection();
                if (!mongo_1.Mongo.Collection.get(name)) {
                    StuffCollection.instance.collection = new mongo_1.Mongo.Collection(name);
                }
                else {
                    StuffCollection.instance.collection = mongo_1.Mongo.Collection.get(name);
                }
            }
            return StuffCollection.instance;
        }
        constructor() {
            // nothing to do.
        }
        getCollection() {
            return this.collection;
        }
    }
    console.time('Stuffs'); // tslint:disable-line
    const Stuffs = StuffCollection.getInstance().getCollection();
    exports.Stuffs = Stuffs;
    console.timeEnd('Stuffs'); // tslint:disable-line
    /** Create a schema to constrain the structure of documents associated with this collection. */
    const StuffSchema = new simpl_schema_1.default({
        condition: {
            allowedValues: ['excellent', 'good', 'fair', 'poor'],
            defaultValue: 'good',
            type: String,
        },
        name: String,
        owner: String,
        quantity: Number,
    }, { tracker: tracker_1.Tracker });
    exports.StuffSchema = StuffSchema;
    /** Attach this schema to the collection. */
    Stuffs.attachSchema(StuffSchema);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"both":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/both/index.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "../../api/stuff"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  console.time('startup/both'); // tslint:disable-line

  require("../../api/stuff");

  console.timeEnd('startup/both'); // tslint:disable-line
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/startup/both/index", ["require", "exports", "imports/api/stuff/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.time('startup/both'); // tslint:disable-line
    require("/imports/api/stuff/index");
    console.timeEnd('startup/both'); // tslint:disable-line
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"accounts.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/accounts.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/accounts-base", "meteor/alanning:roles", "meteor/meteor"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var accounts_base_1 = require("meteor/accounts-base");

  var alanning_roles_1 = require("meteor/alanning:roles");

  var meteor_1 = require("meteor/meteor");
  /* eslint-disable no-console */


  function createUser(email, password, role) {
    console.log("  Creating user " + email + "."); // tslint:disable-line

    var userID = accounts_base_1.Accounts.createUser({
      email: email,
      password: password,
      username: email
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
        var email = _a.email,
            password = _a.password,
            role = _a.role;
        return createUser(email, password, role);
      });
    } else {
      console.log('Cannot initialize the database!  Please invoke meteor with a settings file.'); // tslint:disable-line
    }
  }
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/startup/server/accounts", ["require", "exports", "meteor/accounts-base", "meteor/alanning:roles", "meteor/meteor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const accounts_base_1 = require("meteor/accounts-base");
    const alanning_roles_1 = require("meteor/alanning:roles");
    const meteor_1 = require("meteor/meteor");
    /* eslint-disable no-console */
    function createUser(email, password, role) {
        console.log(`  Creating user ${email}.`); // tslint:disable-line
        const userID = accounts_base_1.Accounts.createUser({
            email,
            password,
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
            meteor_1.Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
        }
        else {
            console.log('Cannot initialize the database!  Please invoke meteor with a settings file.'); // tslint:disable-line
        }
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/index.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./accounts", "./stuff"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  require("./accounts");

  require("./stuff");
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/startup/server/index", ["require", "exports", "imports/startup/server/accounts", "./stuff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("/imports/startup/server/accounts");
    require("./stuff");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stuff.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/stuff.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/alanning:roles", "meteor/meteor", "../../api/stuff/stuff"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var alanning_roles_1 = require("meteor/alanning:roles");

  var meteor_1 = require("meteor/meteor");

  console.time('startup/server'); // tslint:disable-line

  var stuff_1 = require("../../api/stuff/stuff");

  console.timeEnd('startup/server'); // tslint:disable-line

  /** Initialize the database with a default data document. */

  function addData(data) {
    console.log("  Adding: " + data.name + " (" + data.owner + ")"); // tslint:disable-line

    stuff_1.Stuffs.insert(data);
  }
  /** Initialize the collection if empty. */


  if (stuff_1.Stuffs.find().count() === 0) {
    if (meteor_1.Meteor.settings.defaultData) {
      console.log('Creating default data.'); // tslint:disable-line

      meteor_1.Meteor.settings.defaultData.map(function (data) {
        return addData(data);
      });
    }
  }
  /** This subscription publishes only the documents associated with the logged in user */


  meteor_1.Meteor.publish('Stuff', function publish() {
    if (this.userId) {
      var username = meteor_1.Meteor.users.findOne(this.userId).username;
      return stuff_1.Stuffs.find({
        owner: username
      });
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

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/startup/server/stuff", ["require", "exports", "meteor/alanning:roles", "meteor/meteor", "imports/api/stuff/stuff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const alanning_roles_1 = require("meteor/alanning:roles");
    const meteor_1 = require("meteor/meteor");
    console.time('startup/server'); // tslint:disable-line
    const stuff_1 = require("/imports/api/stuff/stuff");
    console.timeEnd('startup/server'); // tslint:disable-line
    /** Initialize the database with a default data document. */
    function addData(data) {
        console.log(`  Adding: ${data.name} (${data.owner})`); // tslint:disable-line
        stuff_1.Stuffs.insert(data);
    }
    /** Initialize the collection if empty. */
    if (stuff_1.Stuffs.find().count() === 0) {
        if (meteor_1.Meteor.settings.defaultData) {
            console.log('Creating default data.'); // tslint:disable-line
            meteor_1.Meteor.settings.defaultData.map((data) => addData(data));
        }
    }
    /** This subscription publishes only the documents associated with the logged in user */
    meteor_1.Meteor.publish('Stuff', function publish() {
        if (this.userId) {
            const username = meteor_1.Meteor.users.findOne(this.userId).username;
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "../imports/startup/both", "../imports/startup/server"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  console.time('server/main');

  require("../imports/startup/both");

  require("../imports/startup/server");

  console.timeEnd('server/main');
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("server/main", ["require", "exports", "imports/startup/both/index", "imports/startup/server/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.time('server/main');
    require("/imports/startup/both/index");
    require("/imports/startup/server/index");
    console.timeEnd('server/main');
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts",
    ".tsx",
    ".jsx"
  ]
});

require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW5kZXgudHMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3N0dWZmL2luZGV4LnRzIiwibWV0ZW9yOi8v8J+Su2FwcC9zdHVmZi50cyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvc3R1ZmYvc3R1ZmYudHMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9ib3RoL2luZGV4LnRzIiwibWV0ZW9yOi8v8J+Su2FwcC9hY2NvdW50cy50cyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci9hY2NvdW50cy50cyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci9pbmRleC50cyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci9zdHVmZi50cyIsIm1ldGVvcjovL/CfkrthcHAvbWFpbi50cyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQ0FBLG1CQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ2pCOztBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFFQSxNQUFNLElBQUksR0FBVyxRQUFyQjs7QUFFQTtBQUFBO0FBQUE7QUFlRSxnQ0FDRTtBQUNEOztBQWhCYSxrQ0FBZDtBQUNFLFVBQUksQ0FBQyxlQUFlLENBQUMsUUFBckIsRUFBK0I7QUFDN0IsdUJBQWUsQ0FBQyxRQUFoQixHQUEyQixJQUFJLGVBQUosRUFBM0I7O0FBQ0EsWUFBSSxDQUFDLGNBQU0sVUFBTixDQUFpQixHQUFqQixDQUFxQixJQUFyQixDQUFMLEVBQWlDO0FBQy9CLHlCQUFlLENBQUMsUUFBaEIsQ0FBeUIsVUFBekIsR0FBc0MsSUFBSSxjQUFNLFVBQVYsQ0FBcUIsSUFBckIsQ0FBdEM7QUFDRCxT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T0FBTyxjQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDekM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILGlIQUFpSDtJQUNqSCxlQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksc0JBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtZQUMzRCxPQUFPLGNBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DSCxTQUFPLENBQUMsSUFBUixDQUFhLGFBQWI7O0FBQ0E7O0FBQ0E7O0FBQ0EsU0FBTyxDQUFDLE9BQVIsQ0FBZ0IsYUFBaEI7Ozs7Ozs7Ozs7Ozs7O0lDSEEsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixzQ0FBaUM7SUFDakMsd0NBQW1DO0lBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbCwiaW1wb3J0ICcuL3N0dWZmJztcbiIsbnVsbCwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5pbXBvcnQgeyBUcmFja2VyIH0gZnJvbSAnbWV0ZW9yL3RyYWNrZXInO1xuaW1wb3J0IHNpbXBsU2NoZW1hIGZyb20gJ3NpbXBsLXNjaGVtYSc7XG5cbi8qKiBDcmVhdGUgYSBNZXRlb3IgY29sbGVjdGlvbi4gKi9cbi8vIGNvbnNvbGUubG9nKCdjcmVhdGluZyBjb2xsZWN0aW9uIHN0dWZmcycpO1xuLy8gY29uc29sZS50cmFjZSgnY3JlYXRpbmcgY29sbGVjdGlvbiBzdHVmZnMnKTtcblxuY29uc3QgbmFtZTogc3RyaW5nID0gJ1N0dWZmcyc7XG5cbmNsYXNzIFN0dWZmQ29sbGVjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKCFTdHVmZkNvbGxlY3Rpb24uaW5zdGFuY2UpIHtcbiAgICAgIFN0dWZmQ29sbGVjdGlvbi5pbnN0YW5jZSA9IG5ldyBTdHVmZkNvbGxlY3Rpb24oKTtcbiAgICAgIGlmICghTW9uZ28uQ29sbGVjdGlvbi5nZXQobmFtZSkpIHtcbiAgICAgICAgU3R1ZmZDb2xsZWN0aW9uLmluc3RhbmNlLmNvbGxlY3Rpb24gPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFN0dWZmQ29sbGVjdGlvbi5pbnN0YW5jZS5jb2xsZWN0aW9uID0gTW9uZ28uQ29sbGVjdGlvbi5nZXQobmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTdHVmZkNvbGxlY3Rpb24uaW5zdGFuY2U7XG4gIH1cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFN0dWZmQ29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBjb2xsZWN0aW9uOiBNb25nby5Db2xsZWN0aW9uPGFueT47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBub3RoaW5nIHRvIGRvLlxuICB9XG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb247XG4gIH1cbn1cbmNvbnNvbGUudGltZSgnU3R1ZmZzJyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbmNvbnN0IFN0dWZmcyA9IFN0dWZmQ29sbGVjdGlvbi5nZXRJbnN0YW5jZSgpLmdldENvbGxlY3Rpb24oKTtcbmNvbnNvbGUudGltZUVuZCgnU3R1ZmZzJyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuLyoqIENyZWF0ZSBhIHNjaGVtYSB0byBjb25zdHJhaW4gdGhlIHN0cnVjdHVyZSBvZiBkb2N1bWVudHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY29sbGVjdGlvbi4gKi9cbmNvbnN0IFN0dWZmU2NoZW1hID0gbmV3IHNpbXBsU2NoZW1hKHtcbiAgY29uZGl0aW9uOiB7XG4gICAgYWxsb3dlZFZhbHVlczogWydleGNlbGxlbnQnLCAnZ29vZCcsICdmYWlyJywgJ3Bvb3InXSxcbiAgICBkZWZhdWx0VmFsdWU6ICdnb29kJyxcbiAgICB0eXBlOiBTdHJpbmcsXG4gIH0sXG4gIG5hbWU6IFN0cmluZyxcbiAgb3duZXI6IFN0cmluZyxcbiAgcXVhbnRpdHk6IE51bWJlcixcbn0sIHsgdHJhY2tlcjogVHJhY2tlciB9KTtcblxuLyoqIEF0dGFjaCB0aGlzIHNjaGVtYSB0byB0aGUgY29sbGVjdGlvbi4gKi9cblN0dWZmcy5hdHRhY2hTY2hlbWEoU3R1ZmZTY2hlbWEpO1xuXG4vKiogTWFrZSB0aGUgY29sbGVjdGlvbiBhbmQgc2NoZW1hIGF2YWlsYWJsZSB0byBvdGhlciBjb2RlLiAqL1xuZXhwb3J0IHsgU3R1ZmZzLCBTdHVmZlNjaGVtYSB9O1xuIiwiY29uc29sZS50aW1lKCdzdGFydHVwL2JvdGgnKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuaW1wb3J0ICcuLi8uLi9hcGkvc3R1ZmYnO1xuY29uc29sZS50aW1lRW5kKCdzdGFydHVwL2JvdGgnKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuIixudWxsLCJpbXBvcnQgeyBBY2NvdW50cyB9IGZyb20gJ21ldGVvci9hY2NvdW50cy1iYXNlJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnbWV0ZW9yL2FsYW5uaW5nOnJvbGVzJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZXIoZW1haWwsIHBhc3N3b3JkLCByb2xlKSB7XG4gIGNvbnNvbGUubG9nKGAgIENyZWF0aW5nIHVzZXIgJHtlbWFpbH0uYCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgY29uc3QgdXNlcklEID0gQWNjb3VudHMuY3JlYXRlVXNlcih7XG4gICAgZW1haWwsXG4gICAgcGFzc3dvcmQsXG4gICAgdXNlcm5hbWU6IGVtYWlsLFxuICB9KTtcbiAgaWYgKHJvbGUgPT09ICdhZG1pbicpIHtcbiAgICBSb2xlcy5hZGRVc2Vyc1RvUm9sZXModXNlcklELCAnYWRtaW4nKTtcbiAgfVxufVxuXG4vKiogV2hlbiBydW5uaW5nIGFwcCBmb3IgZmlyc3QgdGltZSwgcGFzcyBhIHNldHRpbmdzIGZpbGUgdG8gc2V0IHVwIGEgZGVmYXVsdCB1c2VyIGFjY291bnQuICovXG5pZiAoTWV0ZW9yLnVzZXJzLmZpbmQoKS5jb3VudCgpID09PSAwKSB7XG4gIGlmIChNZXRlb3Iuc2V0dGluZ3MuZGVmYXVsdEFjY291bnRzKSB7XG4gICAgY29uc29sZS5sb2coJ0NyZWF0aW5nIHRoZSBkZWZhdWx0IHVzZXIocyknKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgIE1ldGVvci5zZXR0aW5ncy5kZWZhdWx0QWNjb3VudHMubWFwKCh7IGVtYWlsLCBwYXNzd29yZCwgcm9sZSB9KSA9PiBjcmVhdGVVc2VyKGVtYWlsLCBwYXNzd29yZCwgcm9sZSkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgaW5pdGlhbGl6ZSB0aGUgZGF0YWJhc2UhICBQbGVhc2UgaW52b2tlIG1ldGVvciB3aXRoIGEgc2V0dGluZ3MgZmlsZS4nKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICB9XG59XG4iLCJpbXBvcnQgJy4vYWNjb3VudHMnO1xuaW1wb3J0ICcuL3N0dWZmJztcbiIsImltcG9ydCB7IFJvbGVzIH0gZnJvbSAnbWV0ZW9yL2FsYW5uaW5nOnJvbGVzJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuY29uc29sZS50aW1lKCdzdGFydHVwL3NlcnZlcicpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5pbXBvcnQgeyBTdHVmZnMgfSBmcm9tICcuLi8uLi9hcGkvc3R1ZmYvc3R1ZmYnO1xuY29uc29sZS50aW1lRW5kKCdzdGFydHVwL3NlcnZlcicpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbi8qKiBJbml0aWFsaXplIHRoZSBkYXRhYmFzZSB3aXRoIGEgZGVmYXVsdCBkYXRhIGRvY3VtZW50LiAqL1xuZnVuY3Rpb24gYWRkRGF0YShkYXRhKSB7XG4gIGNvbnNvbGUubG9nKGAgIEFkZGluZzogJHtkYXRhLm5hbWV9ICgke2RhdGEub3duZXJ9KWApOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gIFN0dWZmcy5pbnNlcnQoZGF0YSk7XG59XG5cbi8qKiBJbml0aWFsaXplIHRoZSBjb2xsZWN0aW9uIGlmIGVtcHR5LiAqL1xuaWYgKFN0dWZmcy5maW5kKCkuY291bnQoKSA9PT0gMCkge1xuICBpZiAoTWV0ZW9yLnNldHRpbmdzLmRlZmF1bHREYXRhKSB7XG4gICAgY29uc29sZS5sb2coJ0NyZWF0aW5nIGRlZmF1bHQgZGF0YS4nKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgIE1ldGVvci5zZXR0aW5ncy5kZWZhdWx0RGF0YS5tYXAoKGRhdGEpID0+IGFkZERhdGEoZGF0YSkpO1xuICB9XG59XG5cbi8qKiBUaGlzIHN1YnNjcmlwdGlvbiBwdWJsaXNoZXMgb25seSB0aGUgZG9jdW1lbnRzIGFzc29jaWF0ZWQgd2l0aCB0aGUgbG9nZ2VkIGluIHVzZXIgKi9cbk1ldGVvci5wdWJsaXNoKCdTdHVmZicsIGZ1bmN0aW9uIHB1Ymxpc2goKSB7XG4gIGlmICh0aGlzLnVzZXJJZCkge1xuICAgIGNvbnN0IHVzZXJuYW1lID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUodGhpcy51c2VySWQpLnVzZXJuYW1lO1xuICAgIHJldHVybiBTdHVmZnMuZmluZCh7IG93bmVyOiB1c2VybmFtZSB9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5yZWFkeSgpO1xufSk7XG5cbi8qKiBUaGlzIHN1YnNjcmlwdGlvbiBwdWJsaXNoZXMgYWxsIGRvY3VtZW50cyByZWdhcmRsZXNzIG9mIHVzZXIsIGJ1dCBvbmx5IGlmIHRoZSBsb2dnZWQgaW4gdXNlciBpcyB0aGUgQWRtaW4uICovXG5NZXRlb3IucHVibGlzaCgnU3R1ZmZBZG1pbicsIGZ1bmN0aW9uIHB1Ymxpc2goKSB7XG4gIGlmICh0aGlzLnVzZXJJZCAmJiBSb2xlcy51c2VySXNJblJvbGUodGhpcy51c2VySWQsICdhZG1pbicpKSB7XG4gICAgcmV0dXJuIFN0dWZmcy5maW5kKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMucmVhZHkoKTtcbn0pO1xuIixudWxsLCJjb25zb2xlLnRpbWUoJ3NlcnZlci9tYWluJyk7XG5pbXBvcnQgJy4uL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnLi4vaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5jb25zb2xlLnRpbWVFbmQoJ3NlcnZlci9tYWluJyk7XG5cbiJdfQ==

var require = meteorInstall({"imports":{"api":{"stuff":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/stuff/index.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
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
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
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
    var mongo_1 = require("meteor/mongo");
    var tracker_1 = require("meteor/tracker");
    var simpl_schema_1 = require("simpl-schema");
    /** Create a Meteor collection. */
    // console.log('creating collection stuffs');
    // console.trace('creating collection stuffs');
    var name = 'Stuffs';
    var StuffCollection = /** @class */ (function () {
        function StuffCollection() {
            // nothing to do.
        }
        StuffCollection.getInstance = function () {
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
        };
        StuffCollection.prototype.getCollection = function () {
            return this.collection;
        };
        return StuffCollection;
    }());
    console.time('Stuffs'); // tslint:disable-line
    var Stuffs = StuffCollection.getInstance().getCollection();
    exports.Stuffs = Stuffs;
    console.timeEnd('Stuffs'); // tslint:disable-line
    /** Create a schema to constrain the structure of documents associated with this collection. */
    var StuffSchema = new simpl_schema_1.default({
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
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
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

}},"client":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/client/index.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./startup"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  require("./startup");
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/startup/client/index", ["require", "exports", "./startup"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("./startup");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"startup.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/client/startup.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/meteor", "react", "react-dom", "../../ui/layouts/App"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var meteor_1 = require("meteor/meteor");

  var React = require("react");

  var react_dom_1 = require("react-dom");

  var App_1 = require("../../ui/layouts/App");
  /** Startup the application by rendering the App layout component. */


  meteor_1.Meteor.startup(function () {
    react_dom_1.render(React.createElement(App_1.default, null), document.getElementById('root')); // eslint-disable-line
  });
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/startup/client/startup", ["require", "exports", "meteor/meteor", "react", "react-dom", "../../ui/layouts/App"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var React = require("react");
    var react_dom_1 = require("react-dom");
    var App_1 = require("../../ui/layouts/App");
    /** Startup the application by rendering the App layout component. */
    meteor_1.Meteor.startup(function () {
        react_dom_1.render(React.createElement(App_1.default, null), document.getElementById('root')); // eslint-disable-line
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"ui":{"components":{"Footer.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Footer.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var React = require("react");
  /** The Footer appears at the bottom of every page. Rendered by the App Layout component. */


  var Footer =
  /** @class */
  function (_super) {
    __extends(Footer, _super);

    function Footer() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Footer.prototype.render = function () {
      var divStyle = {
        paddingTop: '15px'
      };
      return React.createElement("footer", null, React.createElement("div", {
        style: divStyle,
        className: "ui center aligned container"
      }, React.createElement("hr", null), "Department of Information and Computer Sciences ", React.createElement("br", null), "University of Hawaii", React.createElement("br", null), "Honolulu, HI 96822"));
    };

    return Footer;
  }(React.Component);

  exports.default = Footer;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/components/Footer", ["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    /** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
    var Footer = /** @class */ (function (_super) {
        __extends(Footer, _super);
        function Footer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Footer.prototype.render = function () {
            var divStyle = { paddingTop: '15px' };
            return (React.createElement("footer", null,
                React.createElement("div", { style: divStyle, className: "ui center aligned container" },
                    React.createElement("hr", null),
                    "Department of Information and Computer Sciences ",
                    React.createElement("br", null),
                    "University of Hawaii",
                    React.createElement("br", null),
                    "Honolulu, HI 96822")));
        };
        return Footer;
    }(React.Component));
    exports.default = Footer;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NavBar.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/NavBar.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/alanning:roles", "meteor/meteor", "meteor/react-meteor-data", "react", "react-router-dom", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var alanning_roles_1 = require("meteor/alanning:roles");

  var meteor_1 = require("meteor/meteor");

  var react_meteor_data_1 = require("meteor/react-meteor-data");

  var React = require("react");

  var react_router_dom_1 = require("react-router-dom");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /** The NavBar appears at the top of every page. Rendered by the App Layout component. */


  var NavBar =
  /** @class */
  function (_super) {
    __extends(NavBar, _super);

    function NavBar() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    NavBar.prototype.render = function () {
      var menuStyle = {
        marginBottom: '10px'
      };
      return React.createElement(semantic_ui_react_1.Menu, {
        style: menuStyle,
        attached: "top",
        borderless: true,
        inverted: true
      }, React.createElement(semantic_ui_react_1.Menu.Item, {
        as: react_router_dom_1.NavLink,
        activeClassName: "",
        exact: true,
        to: "/"
      }, React.createElement(semantic_ui_react_1.Header, {
        inverted: true,
        as: "h1"
      }, "meteor-application-template")), this.props.currentUser ? [React.createElement(semantic_ui_react_1.Menu.Item, {
        as: react_router_dom_1.NavLink,
        activeClassName: "active",
        exact: true,
        to: "/add",
        key: "add"
      }, "Add Stuff"), React.createElement(semantic_ui_react_1.Menu.Item, {
        as: react_router_dom_1.NavLink,
        activeClassName: "active",
        exact: true,
        to: "/list",
        key: "list"
      }, "List Stuff")] : '', alanning_roles_1.Roles.userIsInRole(meteor_1.Meteor.userId(), 'admin') ? React.createElement(semantic_ui_react_1.Menu.Item, {
        as: react_router_dom_1.NavLink,
        activeClassName: "active",
        exact: true,
        to: "/admin",
        key: "admin"
      }, "Admin") : '', React.createElement(semantic_ui_react_1.Menu.Item, {
        position: "right"
      }, this.props.currentUser === '' ? React.createElement(semantic_ui_react_1.Dropdown, {
        text: "Login",
        pointing: "top right",
        icon: 'user'
      }, React.createElement(semantic_ui_react_1.Dropdown.Menu, null, React.createElement(semantic_ui_react_1.Dropdown.Item, {
        icon: "user",
        text: "Sign In",
        as: react_router_dom_1.NavLink,
        exact: true,
        to: "/signin"
      }), React.createElement(semantic_ui_react_1.Dropdown.Item, {
        icon: "add user",
        text: "Sign Up",
        as: react_router_dom_1.NavLink,
        exact: true,
        to: "/signup"
      }))) : React.createElement(semantic_ui_react_1.Dropdown, {
        text: this.props.currentUser,
        pointing: "top right",
        icon: 'user'
      }, React.createElement(semantic_ui_react_1.Dropdown.Menu, null, React.createElement(semantic_ui_react_1.Dropdown.Item, {
        icon: "sign out",
        text: "Sign Out",
        as: react_router_dom_1.NavLink,
        exact: true,
        to: "/signout"
      })))));
    };

    return NavBar;
  }(React.Component);
  /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */


  var NavBarContainer = react_meteor_data_1.withTracker(function () {
    return {
      currentUser: meteor_1.Meteor.user() ? meteor_1.Meteor.user().username : ''
    };
  })(NavBar);
  /** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */

  exports.default = react_router_dom_1.withRouter(NavBarContainer);
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/components/NavBar", ["require", "exports", "meteor/alanning:roles", "meteor/meteor", "meteor/react-meteor-data", "react", "react-router-dom", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var alanning_roles_1 = require("meteor/alanning:roles");
    var meteor_1 = require("meteor/meteor");
    var react_meteor_data_1 = require("meteor/react-meteor-data");
    var React = require("react");
    var react_router_dom_1 = require("react-router-dom");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /** The NavBar appears at the top of every page. Rendered by the App Layout component. */
    var NavBar = /** @class */ (function (_super) {
        __extends(NavBar, _super);
        function NavBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NavBar.prototype.render = function () {
            var menuStyle = { marginBottom: '10px' };
            return (React.createElement(semantic_ui_react_1.Menu, { style: menuStyle, attached: "top", borderless: true, inverted: true },
                React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "", exact: true, to: "/" },
                    React.createElement(semantic_ui_react_1.Header, { inverted: true, as: "h1" }, "meteor-application-template")),
                this.props.currentUser ? ([React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "active", exact: true, to: "/add", key: "add" }, "Add Stuff"),
                    React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "active", exact: true, to: "/list", key: "list" }, "List Stuff")]) : '',
                alanning_roles_1.Roles.userIsInRole(meteor_1.Meteor.userId(), 'admin') ? (React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "active", exact: true, to: "/admin", key: "admin" }, "Admin")) : '',
                React.createElement(semantic_ui_react_1.Menu.Item, { position: "right" }, this.props.currentUser === '' ? (React.createElement(semantic_ui_react_1.Dropdown, { text: "Login", pointing: "top right", icon: 'user' },
                    React.createElement(semantic_ui_react_1.Dropdown.Menu, null,
                        React.createElement(semantic_ui_react_1.Dropdown.Item, { icon: "user", text: "Sign In", as: react_router_dom_1.NavLink, exact: true, to: "/signin" }),
                        React.createElement(semantic_ui_react_1.Dropdown.Item, { icon: "add user", text: "Sign Up", as: react_router_dom_1.NavLink, exact: true, to: "/signup" })))) : (React.createElement(semantic_ui_react_1.Dropdown, { text: this.props.currentUser, pointing: "top right", icon: 'user' },
                    React.createElement(semantic_ui_react_1.Dropdown.Menu, null,
                        React.createElement(semantic_ui_react_1.Dropdown.Item, { icon: "sign out", text: "Sign Out", as: react_router_dom_1.NavLink, exact: true, to: "/signout" })))))));
        };
        return NavBar;
    }(React.Component));
    /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
    var NavBarContainer = react_meteor_data_1.withTracker(function () { return ({
        currentUser: meteor_1.Meteor.user() ? meteor_1.Meteor.user().username : '',
    }); })(NavBar);
    /** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
    exports.default = react_router_dom_1.withRouter(NavBarContainer);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"StuffItem.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/StuffItem.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "react-router-dom", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var React = require("react");

  var react_router_dom_1 = require("react-router-dom");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */


  var StuffItem =
  /** @class */
  function (_super) {
    __extends(StuffItem, _super);

    function StuffItem() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    StuffItem.prototype.render = function () {
      return React.createElement(semantic_ui_react_1.Table.Row, null, React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.name), React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.quantity), React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.condition), React.createElement(semantic_ui_react_1.Table.Cell, null, React.createElement(react_router_dom_1.Link, {
        to: "/edit/" + this.props.stuff._id
      }, "Edit")));
    };

    return StuffItem;
  }(React.Component);
  /** Wrap this component in withRouter since we use the <Link> React Router element. */


  exports.default = react_router_dom_1.withRouter(StuffItem);
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/components/StuffItem", ["require", "exports", "react", "react-router-dom", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var react_router_dom_1 = require("react-router-dom");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
    var StuffItem = /** @class */ (function (_super) {
        __extends(StuffItem, _super);
        function StuffItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StuffItem.prototype.render = function () {
            return (React.createElement(semantic_ui_react_1.Table.Row, null,
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.name),
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.quantity),
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.condition),
                React.createElement(semantic_ui_react_1.Table.Cell, null,
                    React.createElement(react_router_dom_1.Link, { to: "/edit/" + this.props.stuff._id }, "Edit"))));
        };
        return StuffItem;
    }(React.Component));
    /** Wrap this component in withRouter since we use the <Link> React Router element. */
    exports.default = react_router_dom_1.withRouter(StuffItem);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"StuffItemAdmin.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/StuffItemAdmin.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */


  var StuffItemAdmin =
  /** @class */
  function (_super) {
    __extends(StuffItemAdmin, _super);

    function StuffItemAdmin() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    StuffItemAdmin.prototype.render = function () {
      return React.createElement(semantic_ui_react_1.Table.Row, null, React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.name), React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.quantity), React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.condition), React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.owner));
    };

    return StuffItemAdmin;
  }(React.Component);

  exports.default = StuffItemAdmin;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/components/StuffItemAdmin", ["require", "exports", "react", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
    var StuffItemAdmin = /** @class */ (function (_super) {
        __extends(StuffItemAdmin, _super);
        function StuffItemAdmin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StuffItemAdmin.prototype.render = function () {
            return (React.createElement(semantic_ui_react_1.Table.Row, null,
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.name),
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.quantity),
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.condition),
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.owner)));
        };
        return StuffItemAdmin;
    }(React.Component));
    exports.default = StuffItemAdmin;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layouts":{"App.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/layouts/App.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/alanning:roles", "meteor/meteor", "react", "react-router-dom", "semantic-ui-css/semantic.css", "../components/Footer", "../components/NavBar", "../pages/AddStuff", "../pages/EditStuff", "../pages/Landing", "../pages/ListStuff", "../pages/ListStuffAdmin", "../pages/NotFound", "../pages/Signin", "../pages/Signout", "../pages/Signup"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var alanning_roles_1 = require("meteor/alanning:roles");

  var meteor_1 = require("meteor/meteor");

  var React = require("react");

  var react_router_dom_1 = require("react-router-dom");

  require("semantic-ui-css/semantic.css");

  var Footer_1 = require("../components/Footer");

  var NavBar_1 = require("../components/NavBar");

  var AddStuff_1 = require("../pages/AddStuff");

  var EditStuff_1 = require("../pages/EditStuff");

  var Landing_1 = require("../pages/Landing");

  var ListStuff_1 = require("../pages/ListStuff");

  var ListStuffAdmin_1 = require("../pages/ListStuffAdmin");

  var NotFound_1 = require("../pages/NotFound");

  var Signin_1 = require("../pages/Signin");

  var Signout_1 = require("../pages/Signout");

  var Signup_1 = require("../pages/Signup");
  /** Top-level layout component for this application. Called in imports/startup/client/startup.tsx. */


  var App =
  /** @class */
  function (_super) {
    __extends(App, _super);

    function App() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    App.prototype.render = function () {
      return React.createElement(react_router_dom_1.HashRouter, null, React.createElement("div", null, React.createElement(NavBar_1.default, null), React.createElement(react_router_dom_1.Switch, null, React.createElement(react_router_dom_1.Route, {
        exact: true,
        path: "/",
        component: Landing_1.default
      }), React.createElement(react_router_dom_1.Route, {
        path: "/signin",
        component: Signin_1.default
      }), React.createElement(react_router_dom_1.Route, {
        path: "/signup",
        component: Signup_1.default
      }), React.createElement(ProtectedRoute, {
        path: "/list",
        component: ListStuff_1.default
      }), React.createElement(ProtectedRoute, {
        path: "/add",
        component: AddStuff_1.default
      }), React.createElement(ProtectedRoute, {
        path: "/edit/:_id",
        component: EditStuff_1.default
      }), React.createElement(AdminProtectedRoute, {
        path: "/admin",
        component: ListStuffAdmin_1.default
      }), React.createElement(ProtectedRoute, {
        path: "/signout",
        component: Signout_1.default
      }), React.createElement(react_router_dom_1.Route, {
        component: NotFound_1.default
      })), React.createElement(Footer_1.default, null)));
    };

    return App;
  }(React.Component);
  /**
   * ProtectedRoute (see React Router v4 sample)
   * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
   * @param {any} { component: Component, ...rest }
   */


  var ProtectedRoute = function (_a) {
    var Component = _a.component,
        rest = __rest(_a, ["component"]);

    return React.createElement(react_router_dom_1.Route, __assign({}, rest, {
      render: function (props) {
        var isLogged = meteor_1.Meteor.userId() !== null;
        return isLogged ? React.createElement(Component, __assign({}, props)) : React.createElement(react_router_dom_1.Redirect, {
          to: {
            pathname: '/signin',
            state: {
              from: props.location
            }
          }
        });
      }
    }));
  };
  /**
   * AdminProtectedRoute (see React Router v4 sample)
   * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
   * @param {any} { component: Component, ...rest }
   */


  var AdminProtectedRoute = function (_a) {
    var Component = _a.component,
        rest = __rest(_a, ["component"]);

    return React.createElement(react_router_dom_1.Route, __assign({}, rest, {
      render: function (props) {
        var isLogged = meteor_1.Meteor.userId() !== null;
        var isAdmin = alanning_roles_1.Roles.userIsInRole(meteor_1.Meteor.userId(), 'admin');
        return isLogged && isAdmin ? React.createElement(Component, __assign({}, props)) : React.createElement(react_router_dom_1.Redirect, {
          to: {
            pathname: '/signin',
            state: {
              from: props.location
            }
          }
        });
      }
    }));
  };

  exports.default = App;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/layouts/App", ["require", "exports", "meteor/alanning:roles", "meteor/meteor", "react", "react-router-dom", "semantic-ui-css/semantic.css", "imports/ui/components/Footer", "imports/ui/components/NavBar", "../pages/AddStuff", "../pages/EditStuff", "../pages/Landing", "../pages/ListStuff", "../pages/ListStuffAdmin", "../pages/NotFound", "../pages/Signin", "../pages/Signout", "../pages/Signup"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var alanning_roles_1 = require("meteor/alanning:roles");
    var meteor_1 = require("meteor/meteor");
    var React = require("react");
    var react_router_dom_1 = require("react-router-dom");
    require("semantic-ui-css/semantic.css");
    var Footer_1 = require("/imports/ui/components/Footer");
    var NavBar_1 = require("/imports/ui/components/NavBar");
    var AddStuff_1 = require("../pages/AddStuff");
    var EditStuff_1 = require("../pages/EditStuff");
    var Landing_1 = require("../pages/Landing");
    var ListStuff_1 = require("../pages/ListStuff");
    var ListStuffAdmin_1 = require("../pages/ListStuffAdmin");
    var NotFound_1 = require("../pages/NotFound");
    var Signin_1 = require("../pages/Signin");
    var Signout_1 = require("../pages/Signout");
    var Signup_1 = require("../pages/Signup");
    /** Top-level layout component for this application. Called in imports/startup/client/startup.tsx. */
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            return (React.createElement(react_router_dom_1.HashRouter, null,
                React.createElement("div", null,
                    React.createElement(NavBar_1.default, null),
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Landing_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/signin", component: Signin_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/signup", component: Signup_1.default }),
                        React.createElement(ProtectedRoute, { path: "/list", component: ListStuff_1.default }),
                        React.createElement(ProtectedRoute, { path: "/add", component: AddStuff_1.default }),
                        React.createElement(ProtectedRoute, { path: "/edit/:_id", component: EditStuff_1.default }),
                        React.createElement(AdminProtectedRoute, { path: "/admin", component: ListStuffAdmin_1.default }),
                        React.createElement(ProtectedRoute, { path: "/signout", component: Signout_1.default }),
                        React.createElement(react_router_dom_1.Route, { component: NotFound_1.default })),
                    React.createElement(Footer_1.default, null))));
        };
        return App;
    }(React.Component));
    /**
     * ProtectedRoute (see React Router v4 sample)
     * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
     * @param {any} { component: Component, ...rest }
     */
    var ProtectedRoute = function (_a) {
        var Component = _a.component, rest = __rest(_a, ["component"]);
        return (React.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) {
                var isLogged = meteor_1.Meteor.userId() !== null;
                return isLogged ?
                    (React.createElement(Component, __assign({}, props))) :
                    (React.createElement(react_router_dom_1.Redirect, { to: { pathname: '/signin', state: { from: props.location } } }));
            } })));
    };
    /**
     * AdminProtectedRoute (see React Router v4 sample)
     * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
     * @param {any} { component: Component, ...rest }
     */
    var AdminProtectedRoute = function (_a) {
        var Component = _a.component, rest = __rest(_a, ["component"]);
        return (React.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) {
                var isLogged = meteor_1.Meteor.userId() !== null;
                var isAdmin = alanning_roles_1.Roles.userIsInRole(meteor_1.Meteor.userId(), 'admin');
                return (isLogged && isAdmin) ?
                    (React.createElement(Component, __assign({}, props))) :
                    (React.createElement(react_router_dom_1.Redirect, { to: { pathname: '/signin', state: { from: props.location } } }));
            } })));
    };
    exports.default = App;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pages":{"AddStuff.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/AddStuff.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/meteor", "meteor/themeteorchef:bert", "react", "semantic-ui-react", "uniforms-semantic/AutoForm", "uniforms-semantic/ErrorsField", "uniforms-semantic/HiddenField", "uniforms-semantic/NumField", "uniforms-semantic/SelectField", "uniforms-semantic/SubmitField", "uniforms-semantic/TextField", "../../api/stuff/stuff"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var meteor_1 = require("meteor/meteor");

  var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");

  var AutoForm_1 = require("uniforms-semantic/AutoForm");

  var ErrorsField_1 = require("uniforms-semantic/ErrorsField");

  var HiddenField_1 = require("uniforms-semantic/HiddenField");

  var NumField_1 = require("uniforms-semantic/NumField");

  var SelectField_1 = require("uniforms-semantic/SelectField");

  var SubmitField_1 = require("uniforms-semantic/SubmitField");

  var TextField_1 = require("uniforms-semantic/TextField");

  var stuff_1 = require("../../api/stuff/stuff");
  /** Renders the Page for adding a document. */


  var AddStuff =
  /** @class */
  function (_super) {
    __extends(AddStuff, _super);
    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */


    function AddStuff(props) {
      var _this = _super.call(this, props) || this;

      _this.submit = _this.submit.bind(_this);
      _this.insertCallback = _this.insertCallback.bind(_this);
      _this.formRef = null;
      return _this;
    }
    /** Notify the user of the results of the submit. If successful, clear the form. */


    AddStuff.prototype.insertCallback = function (error) {
      if (error) {
        themeteorchef_bert_1.Bert.alert({
          type: 'danger',
          message: "Add failed: " + error.message
        });
      } else {
        themeteorchef_bert_1.Bert.alert({
          type: 'success',
          message: 'Add succeeded'
        });
        this.formRef.reset();
      }
    };
    /** On submit, insert the data. */


    AddStuff.prototype.submit = function (data) {
      var name = data.name,
          quantity = data.quantity,
          condition = data.condition;
      var owner = meteor_1.Meteor.user().username;
      stuff_1.Stuffs.insert({
        name: name,
        quantity: quantity,
        condition: condition,
        owner: owner
      }, this.insertCallback);
    };
    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */


    AddStuff.prototype.render = function () {
      var _this = this;

      return React.createElement(semantic_ui_react_1.Grid, {
        container: true,
        centered: true
      }, React.createElement(semantic_ui_react_1.Grid.Column, null, React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, "Add Stuff"), React.createElement(AutoForm_1.default, {
        ref: function (ref) {
          _this.formRef = ref;
        },
        schema: stuff_1.StuffSchema,
        onSubmit: this.submit
      }, React.createElement(semantic_ui_react_1.Segment, null, React.createElement(TextField_1.default, {
        name: "name"
      }), React.createElement(NumField_1.default, {
        name: "quantity",
        decimal: false
      }), React.createElement(SelectField_1.default, {
        name: "condition"
      }), React.createElement(SubmitField_1.default, {
        value: "Submit"
      }), React.createElement(ErrorsField_1.default, null), React.createElement(HiddenField_1.default, {
        name: "owner",
        value: "fakeuser@foo.com"
      })))));
    };

    return AddStuff;
  }(React.Component);

  exports.default = AddStuff;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/AddStuff", ["require", "exports", "meteor/meteor", "meteor/themeteorchef:bert", "react", "semantic-ui-react", "uniforms-semantic/AutoForm", "uniforms-semantic/ErrorsField", "uniforms-semantic/HiddenField", "uniforms-semantic/NumField", "uniforms-semantic/SelectField", "uniforms-semantic/SubmitField", "uniforms-semantic/TextField", "imports/api/stuff/stuff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    var AutoForm_1 = require("uniforms-semantic/AutoForm");
    var ErrorsField_1 = require("uniforms-semantic/ErrorsField");
    var HiddenField_1 = require("uniforms-semantic/HiddenField");
    var NumField_1 = require("uniforms-semantic/NumField");
    var SelectField_1 = require("uniforms-semantic/SelectField");
    var SubmitField_1 = require("uniforms-semantic/SubmitField");
    var TextField_1 = require("uniforms-semantic/TextField");
    var stuff_1 = require("/imports/api/stuff/stuff");
    /** Renders the Page for adding a document. */
    var AddStuff = /** @class */ (function (_super) {
        __extends(AddStuff, _super);
        /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
        function AddStuff(props) {
            var _this = _super.call(this, props) || this;
            _this.submit = _this.submit.bind(_this);
            _this.insertCallback = _this.insertCallback.bind(_this);
            _this.formRef = null;
            return _this;
        }
        /** Notify the user of the results of the submit. If successful, clear the form. */
        AddStuff.prototype.insertCallback = function (error) {
            if (error) {
                themeteorchef_bert_1.Bert.alert({ type: 'danger', message: "Add failed: " + error.message });
            }
            else {
                themeteorchef_bert_1.Bert.alert({ type: 'success', message: 'Add succeeded' });
                this.formRef.reset();
            }
        };
        /** On submit, insert the data. */
        AddStuff.prototype.submit = function (data) {
            var name = data.name, quantity = data.quantity, condition = data.condition;
            var owner = meteor_1.Meteor.user().username;
            stuff_1.Stuffs.insert({ name: name, quantity: quantity, condition: condition, owner: owner }, this.insertCallback);
        };
        /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
        AddStuff.prototype.render = function () {
            var _this = this;
            return (React.createElement(semantic_ui_react_1.Grid, { container: true, centered: true },
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Add Stuff"),
                    React.createElement(AutoForm_1.default, { ref: function (ref) { _this.formRef = ref; }, schema: stuff_1.StuffSchema, onSubmit: this.submit },
                        React.createElement(semantic_ui_react_1.Segment, null,
                            React.createElement(TextField_1.default, { name: "name" }),
                            React.createElement(NumField_1.default, { name: "quantity", decimal: false }),
                            React.createElement(SelectField_1.default, { name: "condition" }),
                            React.createElement(SubmitField_1.default, { value: "Submit" }),
                            React.createElement(ErrorsField_1.default, null),
                            React.createElement(HiddenField_1.default, { name: "owner", value: "fakeuser@foo.com" }))))));
        };
        return AddStuff;
    }(React.Component));
    exports.default = AddStuff;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"EditStuff.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/EditStuff.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/meteor", "meteor/react-meteor-data", "meteor/themeteorchef:bert", "react", "semantic-ui-react", "uniforms-semantic/AutoForm", "uniforms-semantic/ErrorsField", "uniforms-semantic/HiddenField", "uniforms-semantic/NumField", "uniforms-semantic/SelectField", "uniforms-semantic/SubmitField", "uniforms-semantic/TextField", "../../api/stuff/stuff"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var meteor_1 = require("meteor/meteor");

  var react_meteor_data_1 = require("meteor/react-meteor-data");

  var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");

  var AutoForm_1 = require("uniforms-semantic/AutoForm");

  var ErrorsField_1 = require("uniforms-semantic/ErrorsField");

  var HiddenField_1 = require("uniforms-semantic/HiddenField");

  var NumField_1 = require("uniforms-semantic/NumField");

  var SelectField_1 = require("uniforms-semantic/SelectField");

  var SubmitField_1 = require("uniforms-semantic/SubmitField");

  var TextField_1 = require("uniforms-semantic/TextField");

  var stuff_1 = require("../../api/stuff/stuff");
  /** Renders the Page for editing a single document. */


  var EditStuff =
  /** @class */
  function (_super) {
    __extends(EditStuff, _super);

    function EditStuff() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    /** On successful submit, insert the data. */


    EditStuff.prototype.submit = function (data) {
      var name = data.name,
          quantity = data.quantity,
          condition = data.condition,
          _id = data._id;
      stuff_1.Stuffs.update(_id, {
        $set: {
          name: name,
          quantity: quantity,
          condition: condition
        }
      }, {}, function (error) {
        return error ? themeteorchef_bert_1.Bert.alert({
          type: 'danger',
          message: "Update failed: " + error.message
        }) : themeteorchef_bert_1.Bert.alert({
          type: 'success',
          message: 'Update succeeded'
        });
      });
    };
    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */


    EditStuff.prototype.render = function () {
      return this.props.ready ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, {
        active: true
      }, "Getting data");
    };
    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */


    EditStuff.prototype.renderPage = function () {
      return React.createElement(semantic_ui_react_1.Grid, {
        container: true,
        centered: true
      }, React.createElement(semantic_ui_react_1.Grid.Column, null, React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, "Edit Stuff"), React.createElement(AutoForm_1.default, {
        schema: stuff_1.StuffSchema,
        onSubmit: this.submit,
        model: this.props.doc
      }, React.createElement(semantic_ui_react_1.Segment, null, React.createElement(TextField_1.default, {
        name: "name"
      }), React.createElement(NumField_1.default, {
        name: "quantity",
        decimal: false
      }), React.createElement(SelectField_1.default, {
        name: "condition"
      }), React.createElement(SubmitField_1.default, {
        value: "Submit"
      }), React.createElement(ErrorsField_1.default, null), React.createElement(HiddenField_1.default, {
        name: "owner"
      })))));
    };

    return EditStuff;
  }(React.Component);
  /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */


  exports.default = react_meteor_data_1.withTracker(function (_a) {
    var match = _a.match; // Get the documentID from the URL field. See imports/ui/layouts/App.tsx for the route containing :_id.

    var documentId = match.params._id; // Get access to Stuff documents.

    var subscription = meteor_1.Meteor.subscribe('Stuff');
    return {
      doc: stuff_1.Stuffs.findOne(documentId),
      ready: subscription.ready()
    };
  })(EditStuff);
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/EditStuff", ["require", "exports", "meteor/meteor", "meteor/react-meteor-data", "meteor/themeteorchef:bert", "react", "semantic-ui-react", "uniforms-semantic/AutoForm", "uniforms-semantic/ErrorsField", "uniforms-semantic/HiddenField", "uniforms-semantic/NumField", "uniforms-semantic/SelectField", "uniforms-semantic/SubmitField", "uniforms-semantic/TextField", "imports/api/stuff/stuff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var react_meteor_data_1 = require("meteor/react-meteor-data");
    var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    var AutoForm_1 = require("uniforms-semantic/AutoForm");
    var ErrorsField_1 = require("uniforms-semantic/ErrorsField");
    var HiddenField_1 = require("uniforms-semantic/HiddenField");
    var NumField_1 = require("uniforms-semantic/NumField");
    var SelectField_1 = require("uniforms-semantic/SelectField");
    var SubmitField_1 = require("uniforms-semantic/SubmitField");
    var TextField_1 = require("uniforms-semantic/TextField");
    var stuff_1 = require("/imports/api/stuff/stuff");
    /** Renders the Page for editing a single document. */
    var EditStuff = /** @class */ (function (_super) {
        __extends(EditStuff, _super);
        function EditStuff() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** On successful submit, insert the data. */
        EditStuff.prototype.submit = function (data) {
            var name = data.name, quantity = data.quantity, condition = data.condition, _id = data._id;
            stuff_1.Stuffs.update(_id, { $set: { name: name, quantity: quantity, condition: condition } }, {}, function (error) { return (error ?
                themeteorchef_bert_1.Bert.alert({ type: 'danger', message: "Update failed: " + error.message }) :
                themeteorchef_bert_1.Bert.alert({ type: 'success', message: 'Update succeeded' })); });
        };
        /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
        EditStuff.prototype.render = function () {
            return (this.props.ready) ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, { active: true }, "Getting data");
        };
        /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
        EditStuff.prototype.renderPage = function () {
            return (React.createElement(semantic_ui_react_1.Grid, { container: true, centered: true },
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Edit Stuff"),
                    React.createElement(AutoForm_1.default, { schema: stuff_1.StuffSchema, onSubmit: this.submit, model: this.props.doc },
                        React.createElement(semantic_ui_react_1.Segment, null,
                            React.createElement(TextField_1.default, { name: "name" }),
                            React.createElement(NumField_1.default, { name: "quantity", decimal: false }),
                            React.createElement(SelectField_1.default, { name: "condition" }),
                            React.createElement(SubmitField_1.default, { value: "Submit" }),
                            React.createElement(ErrorsField_1.default, null),
                            React.createElement(HiddenField_1.default, { name: "owner" }))))));
        };
        return EditStuff;
    }(React.Component));
    /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
    exports.default = react_meteor_data_1.withTracker(function (_a) {
        var match = _a.match;
        // Get the documentID from the URL field. See imports/ui/layouts/App.tsx for the route containing :_id.
        var documentId = match.params._id;
        // Get access to Stuff documents.
        var subscription = meteor_1.Meteor.subscribe('Stuff');
        return {
            doc: stuff_1.Stuffs.findOne(documentId),
            ready: subscription.ready(),
        };
    })(EditStuff);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Landing.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/Landing.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /** A simple static component to render some text for the landing page. */


  var Landing =
  /** @class */
  function (_super) {
    __extends(Landing, _super);

    function Landing() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Landing.prototype.render = function () {
      return React.createElement(semantic_ui_react_1.Grid, {
        verticalAlign: "middle",
        textAlign: "center",
        container: true
      }, React.createElement(semantic_ui_react_1.Grid.Column, {
        width: 4
      }, React.createElement(semantic_ui_react_1.Image, {
        size: "small",
        circular: true,
        src: "/images/meteor-logo.png"
      })), React.createElement(semantic_ui_react_1.Grid.Column, {
        width: 8
      }, React.createElement("h1", null, "Welcome to this template"), React.createElement("p", null, "Now get to work and modify this app!")));
    };

    return Landing;
  }(React.Component);

  exports.default = Landing;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/Landing", ["require", "exports", "react", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /** A simple static component to render some text for the landing page. */
    var Landing = /** @class */ (function (_super) {
        __extends(Landing, _super);
        function Landing() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Landing.prototype.render = function () {
            return (React.createElement(semantic_ui_react_1.Grid, { verticalAlign: "middle", textAlign: "center", container: true },
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 4 },
                    React.createElement(semantic_ui_react_1.Image, { size: "small", circular: true, src: "/images/meteor-logo.png" })),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 8 },
                    React.createElement("h1", null, "Welcome to this template"),
                    React.createElement("p", null, "Now get to work and modify this app!"))));
        };
        return Landing;
    }(React.Component));
    exports.default = Landing;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ListStuff.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/ListStuff.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/meteor", "meteor/react-meteor-data", "react", "semantic-ui-react", "../../api/stuff/stuff", "../../ui/components/StuffItem"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var meteor_1 = require("meteor/meteor");

  var react_meteor_data_1 = require("meteor/react-meteor-data");

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");

  var stuff_1 = require("../../api/stuff/stuff");

  var StuffItem_1 = require("../../ui/components/StuffItem");
  /** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */


  var ListStuff =
  /** @class */
  function (_super) {
    __extends(ListStuff, _super);

    function ListStuff() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */


    ListStuff.prototype.render = function () {
      return this.props.ready ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, {
        active: true
      }, "Getting data");
    };
    /** Render the page once subscriptions have been received. */


    ListStuff.prototype.renderPage = function () {
      return React.createElement(semantic_ui_react_1.Container, null, React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, "List Stuff"), React.createElement(semantic_ui_react_1.Table, {
        celled: true
      }, React.createElement(semantic_ui_react_1.Table.Header, null, React.createElement(semantic_ui_react_1.Table.Row, null, React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Name"), React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Quantity"), React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Condition"), React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Edit"))), React.createElement(semantic_ui_react_1.Table.Body, null, this.props.stuffs.map(function (stuff) {
        return React.createElement(StuffItem_1.default, {
          key: stuff._id,
          stuff: stuff
        });
      }))));
    };

    return ListStuff;
  }(React.Component);
  /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */


  exports.default = react_meteor_data_1.withTracker(function () {
    // Get access to Stuff documents.
    var subscription = meteor_1.Meteor.subscribe('Stuff');
    return {
      ready: subscription.ready(),
      stuffs: stuff_1.Stuffs.find({}).fetch()
    };
  })(ListStuff);
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/ListStuff", ["require", "exports", "meteor/meteor", "meteor/react-meteor-data", "react", "semantic-ui-react", "imports/api/stuff/stuff", "imports/ui/components/StuffItem"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var react_meteor_data_1 = require("meteor/react-meteor-data");
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    var stuff_1 = require("/imports/api/stuff/stuff");
    var StuffItem_1 = require("/imports/ui/components/StuffItem");
    /** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
    var ListStuff = /** @class */ (function (_super) {
        __extends(ListStuff, _super);
        function ListStuff() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
        ListStuff.prototype.render = function () {
            return (this.props.ready) ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, { active: true }, "Getting data");
        };
        /** Render the page once subscriptions have been received. */
        ListStuff.prototype.renderPage = function () {
            return (React.createElement(semantic_ui_react_1.Container, null,
                React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "List Stuff"),
                React.createElement(semantic_ui_react_1.Table, { celled: true },
                    React.createElement(semantic_ui_react_1.Table.Header, null,
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Name"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Quantity"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Condition"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Edit"))),
                    React.createElement(semantic_ui_react_1.Table.Body, null, this.props.stuffs.map(function (stuff) { return React.createElement(StuffItem_1.default, { key: stuff._id, stuff: stuff }); })))));
        };
        return ListStuff;
    }(React.Component));
    /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
    exports.default = react_meteor_data_1.withTracker(function () {
        // Get access to Stuff documents.
        var subscription = meteor_1.Meteor.subscribe('Stuff');
        return {
            ready: subscription.ready(),
            stuffs: stuff_1.Stuffs.find({}).fetch(),
        };
    })(ListStuff);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ListStuffAdmin.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/ListStuffAdmin.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/meteor", "meteor/react-meteor-data", "react", "semantic-ui-react", "../../api/stuff/stuff", "../../ui/components/StuffItemAdmin"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var meteor_1 = require("meteor/meteor");

  var react_meteor_data_1 = require("meteor/react-meteor-data");

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");

  var stuff_1 = require("../../api/stuff/stuff");

  var StuffItemAdmin_1 = require("../../ui/components/StuffItemAdmin");
  /** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */


  var ListStuffAdmin =
  /** @class */
  function (_super) {
    __extends(ListStuffAdmin, _super);

    function ListStuffAdmin() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */


    ListStuffAdmin.prototype.render = function () {
      return this.props.ready ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, {
        active: true
      }, "Getting data");
    };
    /** Render the page once subscriptions have been received. */


    ListStuffAdmin.prototype.renderPage = function () {
      return React.createElement(semantic_ui_react_1.Container, null, React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, "List Stuff (Admin)"), React.createElement(semantic_ui_react_1.Table, {
        celled: true
      }, React.createElement(semantic_ui_react_1.Table.Header, null, React.createElement(semantic_ui_react_1.Table.Row, null, React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Name"), React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Quantity"), React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Condition"), React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Owner"))), React.createElement(semantic_ui_react_1.Table.Body, null, this.props.stuffs.map(function (stuff) {
        return React.createElement(StuffItemAdmin_1.default, {
          key: stuff._id,
          stuff: stuff
        });
      }))));
    };

    return ListStuffAdmin;
  }(React.Component);
  /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */


  exports.default = react_meteor_data_1.withTracker(function () {
    // Get access to Stuff documents.
    var subscription = meteor_1.Meteor.subscribe('StuffAdmin');
    return {
      ready: subscription.ready(),
      stuffs: stuff_1.Stuffs.find({}).fetch()
    };
  })(ListStuffAdmin);
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/ListStuffAdmin", ["require", "exports", "meteor/meteor", "meteor/react-meteor-data", "react", "semantic-ui-react", "imports/api/stuff/stuff", "imports/ui/components/StuffItemAdmin"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var react_meteor_data_1 = require("meteor/react-meteor-data");
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    var stuff_1 = require("/imports/api/stuff/stuff");
    var StuffItemAdmin_1 = require("/imports/ui/components/StuffItemAdmin");
    /** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
    var ListStuffAdmin = /** @class */ (function (_super) {
        __extends(ListStuffAdmin, _super);
        function ListStuffAdmin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
        ListStuffAdmin.prototype.render = function () {
            return (this.props.ready) ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, { active: true }, "Getting data");
        };
        /** Render the page once subscriptions have been received. */
        ListStuffAdmin.prototype.renderPage = function () {
            return (React.createElement(semantic_ui_react_1.Container, null,
                React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "List Stuff (Admin)"),
                React.createElement(semantic_ui_react_1.Table, { celled: true },
                    React.createElement(semantic_ui_react_1.Table.Header, null,
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Name"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Quantity"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Condition"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Owner"))),
                    React.createElement(semantic_ui_react_1.Table.Body, null, this.props.stuffs.map(function (stuff) { return React.createElement(StuffItemAdmin_1.default, { key: stuff._id, stuff: stuff }); })))));
        };
        return ListStuffAdmin;
    }(React.Component));
    /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
    exports.default = react_meteor_data_1.withTracker(function () {
        // Get access to Stuff documents.
        var subscription = meteor_1.Meteor.subscribe('StuffAdmin');
        return {
            ready: subscription.ready(),
            stuffs: stuff_1.Stuffs.find({}).fetch(),
        };
    })(ListStuffAdmin);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NotFound.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/NotFound.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /** Render a Not Found page if the user enters a URL that doesn't match any route. */


  var NotFound =
  /** @class */
  function (_super) {
    __extends(NotFound, _super);

    function NotFound() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    NotFound.prototype.render = function () {
      return React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, React.createElement("p", null, "Page not found"));
    };

    return NotFound;
  }(React.Component);

  exports.default = NotFound;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/NotFound", ["require", "exports", "react", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /** Render a Not Found page if the user enters a URL that doesn't match any route. */
    var NotFound = /** @class */ (function (_super) {
        __extends(NotFound, _super);
        function NotFound() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NotFound.prototype.render = function () {
            return (React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" },
                React.createElement("p", null, "Page not found")));
        };
        return NotFound;
    }(React.Component));
    exports.default = NotFound;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signin.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/Signin.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/meteor", "react", "react-router-dom", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var meteor_1 = require("meteor/meteor");

  var React = require("react");

  var react_router_dom_1 = require("react-router-dom");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /**
   * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
   * Authentication errors modify the component’s state to be displayed
   */


  var Signin =
  /** @class */
  function (_super) {
    __extends(Signin, _super);
    /** Initialize component state with properties for login and redirection. */


    function Signin(props) {
      var _this = _super.call(this, props) || this;

      _this.state = {
        email: '',
        password: '',
        error: '',
        redirectToReferer: false
      }; // Ensure that 'this' is bound to this component in these two functions.
      // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56

      _this.handleSubmit = _this.handleSubmit.bind(_this);
      _this.handleChange = _this.handleChange.bind(_this);
      return _this;
    }
    /** Update the form controls each time the user interacts with them. */


    Signin.prototype.handleChange = function (e) {
      var change = {};
      change[e.target.name] = e.target.value;
      this.setState(change);
    };
    /** Handle Signin submission using Meteor's account mechanism. */


    Signin.prototype.handleSubmit = function () {
      var _this = this;

      var _a = this.state,
          email = _a.email,
          password = _a.password;
      meteor_1.Meteor.loginWithPassword(email, password, function (err) {
        if (err) {
          _this.setState({
            error: err.reason
          });
        } else {
          _this.setState({
            error: '',
            redirectToReferer: true
          });
        }
      });
    };
    /** Render the signin form. */


    Signin.prototype.render = function () {
      var from = (this.props.location.state || {
        from: {
          pathname: '/'
        }
      }).from; // if correct authentication, redirect to page instead of login screen

      if (this.state.redirectToReferer) {
        return React.createElement(react_router_dom_1.Redirect, {
          to: from
        });
      } // Otherwise return the Login form.


      return React.createElement(semantic_ui_react_1.Container, null, React.createElement(semantic_ui_react_1.Grid, {
        textAlign: "center",
        verticalAlign: "middle",
        centered: true,
        columns: 2
      }, React.createElement(semantic_ui_react_1.Grid.Column, null, React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, "Login to your account"), React.createElement(semantic_ui_react_1.Form, {
        onSubmit: this.handleSubmit
      }, React.createElement(semantic_ui_react_1.Segment, {
        stacked: true
      }, React.createElement(semantic_ui_react_1.Form.Input, {
        label: "Email",
        icon: "user",
        iconPosition: "left",
        name: "email",
        type: "email",
        placeholder: "E-mail address",
        onChange: this.handleChange
      }), React.createElement(semantic_ui_react_1.Form.Input, {
        label: "Password",
        icon: "lock",
        iconPosition: "left",
        name: "password",
        placeholder: "Password",
        type: "password",
        onChange: this.handleChange
      }), React.createElement(semantic_ui_react_1.Form.Button, {
        content: "Submit"
      }))), React.createElement(semantic_ui_react_1.Message, null, React.createElement(react_router_dom_1.Link, {
        to: "/signup"
      }, "Click here to Register")), this.state.error === '' ? // tslint:disable-line
      '' : React.createElement(semantic_ui_react_1.Message, {
        error: true,
        header: "Login was not successful",
        content: this.state.error
      }))));
    };

    return Signin;
  }(React.Component);

  exports.default = Signin;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/Signin", ["require", "exports", "meteor/meteor", "react", "react-router-dom", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var React = require("react");
    var react_router_dom_1 = require("react-router-dom");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /**
     * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
     * Authentication errors modify the component’s state to be displayed
     */
    var Signin = /** @class */ (function (_super) {
        __extends(Signin, _super);
        /** Initialize component state with properties for login and redirection. */
        function Signin(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { email: '', password: '', error: '', redirectToReferer: false };
            // Ensure that 'this' is bound to this component in these two functions.
            // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
            _this.handleSubmit = _this.handleSubmit.bind(_this);
            _this.handleChange = _this.handleChange.bind(_this);
            return _this;
        }
        /** Update the form controls each time the user interacts with them. */
        Signin.prototype.handleChange = function (e) {
            var change = {};
            change[e.target.name] = e.target.value;
            this.setState(change);
        };
        /** Handle Signin submission using Meteor's account mechanism. */
        Signin.prototype.handleSubmit = function () {
            var _this = this;
            var _a = this.state, email = _a.email, password = _a.password;
            meteor_1.Meteor.loginWithPassword(email, password, function (err) {
                if (err) {
                    _this.setState({ error: err.reason });
                }
                else {
                    _this.setState({ error: '', redirectToReferer: true });
                }
            });
        };
        /** Render the signin form. */
        Signin.prototype.render = function () {
            var from = (this.props.location.state || { from: { pathname: '/' } }).from;
            // if correct authentication, redirect to page instead of login screen
            if (this.state.redirectToReferer) {
                return React.createElement(react_router_dom_1.Redirect, { to: from });
            }
            // Otherwise return the Login form.
            return (React.createElement(semantic_ui_react_1.Container, null,
                React.createElement(semantic_ui_react_1.Grid, { textAlign: "center", verticalAlign: "middle", centered: true, columns: 2 },
                    React.createElement(semantic_ui_react_1.Grid.Column, null,
                        React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Login to your account"),
                        React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit },
                            React.createElement(semantic_ui_react_1.Segment, { stacked: true },
                                React.createElement(semantic_ui_react_1.Form.Input, { label: "Email", icon: "user", iconPosition: "left", name: "email", type: "email", placeholder: "E-mail address", onChange: this.handleChange }),
                                React.createElement(semantic_ui_react_1.Form.Input, { label: "Password", icon: "lock", iconPosition: "left", name: "password", placeholder: "Password", type: "password", onChange: this.handleChange }),
                                React.createElement(semantic_ui_react_1.Form.Button, { content: "Submit" }))),
                        React.createElement(semantic_ui_react_1.Message, null,
                            React.createElement(react_router_dom_1.Link, { to: "/signup" }, "Click here to Register")),
                        this.state.error === '' ? ( // tslint:disable-line
                        '') : (React.createElement(semantic_ui_react_1.Message, { error: true, header: "Login was not successful", content: this.state.error }))))));
        };
        return Signin;
    }(React.Component));
    exports.default = Signin;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signout.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/Signout.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/meteor", "react", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var meteor_1 = require("meteor/meteor");

  var React = require("react");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */


  var Signout =
  /** @class */
  function (_super) {
    __extends(Signout, _super);

    function Signout() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Signout.prototype.render = function () {
      meteor_1.Meteor.logout();
      return React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, React.createElement("p", null, "You are signed out."));
    };

    return Signout;
  }(React.Component);

  exports.default = Signout;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/Signout", ["require", "exports", "meteor/meteor", "react", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
    var Signout = /** @class */ (function (_super) {
        __extends(Signout, _super);
        function Signout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Signout.prototype.render = function () {
            meteor_1.Meteor.logout();
            return (React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" },
                React.createElement("p", null, "You are signed out.")));
        };
        return Signout;
    }(React.Component));
    exports.default = Signout;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signup.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/Signup.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "meteor/accounts-base", "react", "react-router-dom", "semantic-ui-react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var accounts_base_1 = require("meteor/accounts-base");

  var React = require("react");

  var react_router_dom_1 = require("react-router-dom");

  var semantic_ui_react_1 = require("semantic-ui-react");
  /**
   * Signup component is similar to signin component, but we attempt to create a new user instead.
   */


  var Signup =
  /** @class */
  function (_super) {
    __extends(Signup, _super);
    /** Initialize state fields. */


    function Signup(props) {
      var _this = _super.call(this, props) || this;

      _this.state = {
        email: '',
        password: '',
        error: ''
      }; // Ensure that 'this' is bound to this component in these two functions.
      // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56

      _this.handleSubmit = _this.handleSubmit.bind(_this);
      _this.handleChange = _this.handleChange.bind(_this);
      return _this;
    }
    /** Update the form controls each time the user interacts with them. */


    Signup.prototype.handleChange = function (e) {
      var change = {};
      change[e.target.name] = e.target.value;
      this.setState(change);
    };
    /** Handle Signup submission using Meteor's account mechanism. */


    Signup.prototype.handleSubmit = function () {
      var _this = this;

      var _a = this.state,
          email = _a.email,
          password = _a.password;
      accounts_base_1.Accounts.createUser({
        email: email,
        password: password,
        username: email
      }, function (err) {
        if (err) {
          _this.setState({
            error: err.reason
          });
        } else {// browserHistory.push('/login');
        }
      });
    };
    /** Display the signup form. */


    Signup.prototype.render = function () {
      return React.createElement(semantic_ui_react_1.Container, null, React.createElement(semantic_ui_react_1.Grid, {
        textAlign: "center",
        verticalAlign: "middle",
        centered: true,
        columns: 2
      }, React.createElement(semantic_ui_react_1.Grid.Column, null, React.createElement(semantic_ui_react_1.Header, {
        as: "h2",
        textAlign: "center"
      }, "Register your account"), React.createElement(semantic_ui_react_1.Form, {
        onSubmit: this.handleSubmit
      }, React.createElement(semantic_ui_react_1.Segment, {
        stacked: true
      }, React.createElement(semantic_ui_react_1.Form.Input, {
        label: "Email",
        icon: "user",
        iconPosition: "left",
        name: "email",
        type: "email",
        placeholder: "E-mail address",
        onChange: this.handleChange
      }), React.createElement(semantic_ui_react_1.Form.Input, {
        label: "Password",
        icon: "lock",
        iconPosition: "left",
        name: "password",
        placeholder: "Password",
        type: "password",
        onChange: this.handleChange
      }), React.createElement(semantic_ui_react_1.Form.Button, {
        content: "Submit"
      }))), React.createElement(semantic_ui_react_1.Message, null, "Already have an account? Login ", React.createElement(react_router_dom_1.Link, {
        to: "/signin"
      }, "here")), this.state.error === '' ? // tslint:disable-line
      '' : React.createElement(semantic_ui_react_1.Message, {
        error: true,
        header: "Registration was not successful",
        content: this.state.error
      }))));
    };

    return Signup;
  }(React.Component);

  exports.default = Signup;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("imports/ui/pages/Signup", ["require", "exports", "meteor/accounts-base", "react", "react-router-dom", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var accounts_base_1 = require("meteor/accounts-base");
    var React = require("react");
    var react_router_dom_1 = require("react-router-dom");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /**
     * Signup component is similar to signin component, but we attempt to create a new user instead.
     */
    var Signup = /** @class */ (function (_super) {
        __extends(Signup, _super);
        /** Initialize state fields. */
        function Signup(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { email: '', password: '', error: '' };
            // Ensure that 'this' is bound to this component in these two functions.
            // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
            _this.handleSubmit = _this.handleSubmit.bind(_this);
            _this.handleChange = _this.handleChange.bind(_this);
            return _this;
        }
        /** Update the form controls each time the user interacts with them. */
        Signup.prototype.handleChange = function (e) {
            var change = {};
            change[e.target.name] = e.target.value;
            this.setState(change);
        };
        /** Handle Signup submission using Meteor's account mechanism. */
        Signup.prototype.handleSubmit = function () {
            var _this = this;
            var _a = this.state, email = _a.email, password = _a.password;
            accounts_base_1.Accounts.createUser({ email: email, password: password, username: email }, function (err) {
                if (err) {
                    _this.setState({ error: err.reason });
                }
                else {
                    // browserHistory.push('/login');
                }
            });
        };
        /** Display the signup form. */
        Signup.prototype.render = function () {
            return (React.createElement(semantic_ui_react_1.Container, null,
                React.createElement(semantic_ui_react_1.Grid, { textAlign: "center", verticalAlign: "middle", centered: true, columns: 2 },
                    React.createElement(semantic_ui_react_1.Grid.Column, null,
                        React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Register your account"),
                        React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit },
                            React.createElement(semantic_ui_react_1.Segment, { stacked: true },
                                React.createElement(semantic_ui_react_1.Form.Input, { label: "Email", icon: "user", iconPosition: "left", name: "email", type: "email", placeholder: "E-mail address", onChange: this.handleChange }),
                                React.createElement(semantic_ui_react_1.Form.Input, { label: "Password", icon: "lock", iconPosition: "left", name: "password", placeholder: "Password", type: "password", onChange: this.handleChange }),
                                React.createElement(semantic_ui_react_1.Form.Button, { content: "Submit" }))),
                        React.createElement(semantic_ui_react_1.Message, null,
                            "Already have an account? Login ",
                            React.createElement(react_router_dom_1.Link, { to: "/signin" }, "here")),
                        this.state.error === '' ? ( // tslint:disable-line
                        '') : (React.createElement(semantic_ui_react_1.Message, { error: true, header: "Registration was not successful", content: this.state.error }))))));
        };
        return Signup;
    }(React.Component));
    exports.default = Signup;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"client":{"style.css":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/style.css                                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) === "object" && (0, _typeof2.default)(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "../imports/startup/both", "../imports/startup/client", "./style.css"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  require("../imports/startup/both");

  require("../imports/startup/client");

  require("./style.css");
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("client/main", ["require", "exports", "imports/startup/both/index", "imports/startup/client/index", "./style.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("/imports/startup/both/index");
    require("/imports/startup/client/index");
    require("./style.css");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".ts",
    ".tsx",
    ".css",
    ".jsx"
  ]
});

require("/client/main.js");
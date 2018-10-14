(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ReactMeteorData;

var require = meteorInstall({"node_modules":{"meteor":{"react-meteor-data":{"react-meteor-data.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/react-meteor-data/react-meteor-data.jsx                                                    //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
let checkNpmVersions;
module.link("meteor/tmeasday:check-npm-versions", {
  checkNpmVersions(v) {
    checkNpmVersions = v;
  }

}, 0);
module.link("./createContainer.jsx", {
  default: "createContainer"
}, 1);
module.link("./ReactMeteorData.jsx", {
  default: "withTracker"
}, 2);
module.link("./ReactMeteorData.jsx", {
  ReactMeteorData: "ReactMeteorData"
}, 3);
checkNpmVersions({
  react: '15.3 - 16'
}, 'react-meteor-data');
/////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ReactMeteorData.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/react-meteor-data/ReactMeteorData.jsx                                                      //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

module.export({
  ReactMeteorData: () => ReactMeteorData,
  default: () => connect
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Tracker;
module.link("meteor/tracker", {
  Tracker(v) {
    Tracker = v;
  }

}, 2);

// A class to keep the state and utility methods needed to manage
// the Meteor data for a component.
class MeteorDataManager {
  constructor(component) {
    this.component = component;
    this.computation = null;
    this.oldData = null;
  }

  dispose() {
    if (this.computation) {
      this.computation.stop();
      this.computation = null;
    }
  }

  calculateData() {
    const component = this.component;

    if (!component.getMeteorData) {
      return null;
    } // When rendering on the server, we don't want to use the Tracker.
    // We only do the first rendering on the server so we can get the data right away


    if (Meteor.isServer) {
      return component.getMeteorData();
    }

    if (this.computation) {
      this.computation.stop();
      this.computation = null;
    }

    let data; // Use Tracker.nonreactive in case we are inside a Tracker Computation.
    // This can happen if someone calls `ReactDOM.render` inside a Computation.
    // In that case, we want to opt out of the normal behavior of nested
    // Computations, where if the outer one is invalidated or stopped,
    // it stops the inner one.

    this.computation = Tracker.nonreactive(() => Tracker.autorun(c => {
      if (c.firstRun) {
        const savedSetState = component.setState;

        try {
          component.setState = () => {
            throw new Error('Can\'t call `setState` inside `getMeteorData` as this could ' + 'cause an endless loop. To respond to Meteor data changing, ' + 'consider making this component a \"wrapper component\" that ' + 'only fetches data and passes it in as props to a child ' + 'component. Then you can use `componentWillReceiveProps` in ' + 'that child component.');
          };

          data = component.getMeteorData();
        } finally {
          component.setState = savedSetState;
        }
      } else {
        // Stop this computation instead of using the re-run.
        // We use a brand-new autorun for each call to getMeteorData
        // to capture dependencies on any reactive data sources that
        // are accessed.  The reason we can't use a single autorun
        // for the lifetime of the component is that Tracker only
        // re-runs autoruns at flush time, while we need to be able to
        // re-call getMeteorData synchronously whenever we want, e.g.
        // from componentWillUpdate.
        c.stop(); // Calling forceUpdate() triggers componentWillUpdate which
        // recalculates getMeteorData() and re-renders the component.

        component.forceUpdate();
      }
    }));

    if (Package.mongo && Package.mongo.Mongo) {
      Object.keys(data).forEach(key => {
        if (data[key] instanceof Package.mongo.Mongo.Cursor) {
          console.warn('Warning: you are returning a Mongo cursor from getMeteorData. ' + 'This value will not be reactive. You probably want to call ' + '`.fetch()` on the cursor before returning it.');
        }
      });
    }

    return data;
  }

  updateData(newData) {
    const component = this.component;
    const oldData = this.oldData;

    if (!(newData && typeof newData === 'object')) {
      throw new Error('Expected object returned from getMeteorData');
    } // update componentData in place based on newData


    for (let key in newData) {
      component.data[key] = newData[key];
    } // if there is oldData (which is every time this method is called
    // except the first), delete keys in newData that aren't in
    // oldData.  don't interfere with other keys, in case we are
    // co-existing with something else that writes to a component's
    // this.data.


    if (oldData) {
      for (let key in oldData) {
        if (!(key in newData)) {
          delete component.data[key];
        }
      }
    }

    this.oldData = newData;
  }

}

const ReactMeteorData = {
  componentWillMount() {
    this.data = {};
    this._meteorDataManager = new MeteorDataManager(this);

    const newData = this._meteorDataManager.calculateData();

    this._meteorDataManager.updateData(newData);
  },

  componentWillUpdate(nextProps, nextState) {
    const saveProps = this.props;
    const saveState = this.state;
    let newData;

    try {
      // Temporarily assign this.state and this.props,
      // so that they are seen by getMeteorData!
      // This is a simulation of how the proposed Observe API
      // for React will work, which calls observe() after
      // componentWillUpdate and after props and state are
      // updated, but before render() is called.
      // See https://github.com/facebook/react/issues/3398.
      this.props = nextProps;
      this.state = nextState;
      newData = this._meteorDataManager.calculateData();
    } finally {
      this.props = saveProps;
      this.state = saveState;
    }

    this._meteorDataManager.updateData(newData);
  },

  componentWillUnmount() {
    this._meteorDataManager.dispose();
  }

};

class ReactComponent extends React.Component {}

Object.assign(ReactComponent.prototype, ReactMeteorData);

class ReactPureComponent extends React.PureComponent {}

Object.assign(ReactPureComponent.prototype, ReactMeteorData);

function connect(options) {
  let expandedOptions = options;

  if (typeof options === 'function') {
    expandedOptions = {
      getMeteorData: options
    };
  }

  const {
    getMeteorData,
    pure = true
  } = expandedOptions;
  const BaseComponent = pure ? ReactPureComponent : ReactComponent;
  return WrappedComponent => class ReactMeteorDataComponent extends BaseComponent {
    getMeteorData() {
      return getMeteorData(this.props);
    }

    render() {
      return React.createElement(WrappedComponent, (0, _extends2.default)({}, this.props, this.data));
    }

  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

},"createContainer.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/react-meteor-data/createContainer.jsx                                                      //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
module.export({
  default: () => createContainer
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);
let connect;
module.link("./ReactMeteorData.jsx", {
  default(v) {
    connect = v;
  }

}, 2);
let hasDisplayedWarning = false;

function createContainer(options, Component) {
  if (!hasDisplayedWarning && Meteor.isDevelopment) {
    console.warn('Warning: createContainer was deprecated in react-meteor-data@0.2.13. Use withTracker instead.\n' + 'https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage');
    hasDisplayedWarning = true;
  }

  return connect(options)(Component);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});

var exports = require("/node_modules/meteor/react-meteor-data/react-meteor-data.jsx");

/* Exports */
Package._define("react-meteor-data", exports, {
  ReactMeteorData: ReactMeteorData
});

})();

//# sourceURL=meteor://💻app/packages/react-meteor-data.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmVhY3QtbWV0ZW9yLWRhdGEvcmVhY3QtbWV0ZW9yLWRhdGEuanN4IiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yZWFjdC1tZXRlb3ItZGF0YS9SZWFjdE1ldGVvckRhdGEuanN4IiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yZWFjdC1tZXRlb3ItZGF0YS9jcmVhdGVDb250YWluZXIuanN4Il0sIm5hbWVzIjpbImNoZWNrTnBtVmVyc2lvbnMiLCJtb2R1bGUiLCJsaW5rIiwidiIsImRlZmF1bHQiLCJSZWFjdE1ldGVvckRhdGEiLCJyZWFjdCIsImV4cG9ydCIsImNvbm5lY3QiLCJSZWFjdCIsIk1ldGVvciIsIlRyYWNrZXIiLCJNZXRlb3JEYXRhTWFuYWdlciIsImNvbnN0cnVjdG9yIiwiY29tcG9uZW50IiwiY29tcHV0YXRpb24iLCJvbGREYXRhIiwiZGlzcG9zZSIsInN0b3AiLCJjYWxjdWxhdGVEYXRhIiwiZ2V0TWV0ZW9yRGF0YSIsImlzU2VydmVyIiwiZGF0YSIsIm5vbnJlYWN0aXZlIiwiYXV0b3J1biIsImMiLCJmaXJzdFJ1biIsInNhdmVkU2V0U3RhdGUiLCJzZXRTdGF0ZSIsIkVycm9yIiwiZm9yY2VVcGRhdGUiLCJQYWNrYWdlIiwibW9uZ28iLCJNb25nbyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiQ3Vyc29yIiwiY29uc29sZSIsIndhcm4iLCJ1cGRhdGVEYXRhIiwibmV3RGF0YSIsImNvbXBvbmVudFdpbGxNb3VudCIsIl9tZXRlb3JEYXRhTWFuYWdlciIsImNvbXBvbmVudFdpbGxVcGRhdGUiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJzYXZlUHJvcHMiLCJwcm9wcyIsInNhdmVTdGF0ZSIsInN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJSZWFjdENvbXBvbmVudCIsIkNvbXBvbmVudCIsImFzc2lnbiIsInByb3RvdHlwZSIsIlJlYWN0UHVyZUNvbXBvbmVudCIsIlB1cmVDb21wb25lbnQiLCJvcHRpb25zIiwiZXhwYW5kZWRPcHRpb25zIiwicHVyZSIsIkJhc2VDb21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwiUmVhY3RNZXRlb3JEYXRhQ29tcG9uZW50IiwicmVuZGVyIiwiY3JlYXRlQ29udGFpbmVyIiwiaGFzRGlzcGxheWVkV2FybmluZyIsImlzRGV2ZWxvcG1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGdCQUFKO0FBQXFCQyxNQUFNLENBQUNDLElBQVAsQ0FBWSxvQ0FBWixFQUFpRDtBQUFDRixrQkFBZ0IsQ0FBQ0csQ0FBRCxFQUFHO0FBQUNILG9CQUFnQixHQUFDRyxDQUFqQjtBQUFtQjs7QUFBeEMsQ0FBakQsRUFBMkYsQ0FBM0Y7QUFBOEZGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEVBQW9DO0FBQUNFLFNBQU8sRUFBQztBQUFULENBQXBDLEVBQWdFLENBQWhFO0FBQW1FSCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFQUFvQztBQUFDRSxTQUFPLEVBQUM7QUFBVCxDQUFwQyxFQUE0RCxDQUE1RDtBQUErREgsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRUFBb0M7QUFBQ0csaUJBQWUsRUFBQztBQUFqQixDQUFwQyxFQUF3RSxDQUF4RTtBQUVyUEwsZ0JBQWdCLENBQUM7QUFDZk0sT0FBSyxFQUFFO0FBRFEsQ0FBRCxFQUViLG1CQUZhLENBQWhCLEM7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBTCxNQUFNLENBQUNNLE1BQVAsQ0FBYztBQUFDRixpQkFBZSxFQUFDLE1BQUlBLGVBQXJCO0FBQXFDRCxTQUFPLEVBQUMsTUFBSUk7QUFBakQsQ0FBZDtBQUF5RSxJQUFJQyxLQUFKO0FBQVVSLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLE9BQVosRUFBb0I7QUFBQ0UsU0FBTyxDQUFDRCxDQUFELEVBQUc7QUFBQ00sU0FBSyxHQUFDTixDQUFOO0FBQVE7O0FBQXBCLENBQXBCLEVBQTBDLENBQTFDO0FBQTZDLElBQUlPLE1BQUo7QUFBV1QsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDUSxRQUFNLENBQUNQLENBQUQsRUFBRztBQUFDTyxVQUFNLEdBQUNQLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSVEsT0FBSjtBQUFZVixNQUFNLENBQUNDLElBQVAsQ0FBWSxnQkFBWixFQUE2QjtBQUFDUyxTQUFPLENBQUNSLENBQUQsRUFBRztBQUFDUSxXQUFPLEdBQUNSLENBQVI7QUFBVTs7QUFBdEIsQ0FBN0IsRUFBcUQsQ0FBckQ7O0FBTzVNO0FBQ0E7QUFDQSxNQUFNUyxpQkFBTixDQUF3QjtBQUN0QkMsYUFBVyxDQUFDQyxTQUFELEVBQVk7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDRDs7QUFFREMsU0FBTyxHQUFHO0FBQ1IsUUFBSSxLQUFLRixXQUFULEVBQXNCO0FBQ3BCLFdBQUtBLFdBQUwsQ0FBaUJHLElBQWpCO0FBQ0EsV0FBS0gsV0FBTCxHQUFtQixJQUFuQjtBQUNEO0FBQ0Y7O0FBRURJLGVBQWEsR0FBRztBQUNkLFVBQU1MLFNBQVMsR0FBRyxLQUFLQSxTQUF2Qjs7QUFFQSxRQUFJLENBQUNBLFNBQVMsQ0FBQ00sYUFBZixFQUE4QjtBQUM1QixhQUFPLElBQVA7QUFDRCxLQUxhLENBT2Q7QUFDQTs7O0FBQ0EsUUFBSVYsTUFBTSxDQUFDVyxRQUFYLEVBQXFCO0FBQ25CLGFBQU9QLFNBQVMsQ0FBQ00sYUFBVixFQUFQO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLTCxXQUFULEVBQXNCO0FBQ3BCLFdBQUtBLFdBQUwsQ0FBaUJHLElBQWpCO0FBQ0EsV0FBS0gsV0FBTCxHQUFtQixJQUFuQjtBQUNEOztBQUVELFFBQUlPLElBQUosQ0FsQmMsQ0FtQmQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxTQUFLUCxXQUFMLEdBQW1CSixPQUFPLENBQUNZLFdBQVIsQ0FBb0IsTUFDckNaLE9BQU8sQ0FBQ2EsT0FBUixDQUFpQkMsQ0FBRCxJQUFPO0FBQ3JCLFVBQUlBLENBQUMsQ0FBQ0MsUUFBTixFQUFnQjtBQUNkLGNBQU1DLGFBQWEsR0FBR2IsU0FBUyxDQUFDYyxRQUFoQzs7QUFDQSxZQUFJO0FBQ0ZkLG1CQUFTLENBQUNjLFFBQVYsR0FBcUIsTUFBTTtBQUN6QixrQkFBTSxJQUFJQyxLQUFKLENBQ0osaUVBQ0UsNkRBREYsR0FFRSw4REFGRixHQUdFLHlEQUhGLEdBSUUsNkRBSkYsR0FLRSx1QkFORSxDQUFOO0FBT0QsV0FSRDs7QUFVQVAsY0FBSSxHQUFHUixTQUFTLENBQUNNLGFBQVYsRUFBUDtBQUNELFNBWkQsU0FZVTtBQUNSTixtQkFBUyxDQUFDYyxRQUFWLEdBQXFCRCxhQUFyQjtBQUNEO0FBQ0YsT0FqQkQsTUFpQk87QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FGLFNBQUMsQ0FBQ1AsSUFBRixHQVRLLENBVUw7QUFDQTs7QUFDQUosaUJBQVMsQ0FBQ2dCLFdBQVY7QUFDRDtBQUNGLEtBaENELENBRGlCLENBQW5COztBQW9DQSxRQUFJQyxPQUFPLENBQUNDLEtBQVIsSUFBaUJELE9BQU8sQ0FBQ0MsS0FBUixDQUFjQyxLQUFuQyxFQUEwQztBQUN4Q0MsWUFBTSxDQUFDQyxJQUFQLENBQVliLElBQVosRUFBa0JjLE9BQWxCLENBQTJCQyxHQUFELElBQVM7QUFDakMsWUFBSWYsSUFBSSxDQUFDZSxHQUFELENBQUosWUFBcUJOLE9BQU8sQ0FBQ0MsS0FBUixDQUFjQyxLQUFkLENBQW9CSyxNQUE3QyxFQUFxRDtBQUNuREMsaUJBQU8sQ0FBQ0MsSUFBUixDQUNFLG1FQUNFLDZEQURGLEdBRUUsK0NBSEo7QUFLRDtBQUNGLE9BUkQ7QUFTRDs7QUFFRCxXQUFPbEIsSUFBUDtBQUNEOztBQUVEbUIsWUFBVSxDQUFDQyxPQUFELEVBQVU7QUFDbEIsVUFBTTVCLFNBQVMsR0FBRyxLQUFLQSxTQUF2QjtBQUNBLFVBQU1FLE9BQU8sR0FBRyxLQUFLQSxPQUFyQjs7QUFFQSxRQUFJLEVBQUUwQixPQUFPLElBQUssT0FBT0EsT0FBUixLQUFxQixRQUFsQyxDQUFKLEVBQWlEO0FBQy9DLFlBQU0sSUFBSWIsS0FBSixDQUFVLDZDQUFWLENBQU47QUFDRCxLQU5pQixDQU9sQjs7O0FBQ0EsU0FBSyxJQUFJUSxHQUFULElBQWdCSyxPQUFoQixFQUF5QjtBQUN2QjVCLGVBQVMsQ0FBQ1EsSUFBVixDQUFlZSxHQUFmLElBQXNCSyxPQUFPLENBQUNMLEdBQUQsQ0FBN0I7QUFDRCxLQVZpQixDQVdsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxRQUFJckIsT0FBSixFQUFhO0FBQ1gsV0FBSyxJQUFJcUIsR0FBVCxJQUFnQnJCLE9BQWhCLEVBQXlCO0FBQ3ZCLFlBQUksRUFBRXFCLEdBQUcsSUFBSUssT0FBVCxDQUFKLEVBQXVCO0FBQ3JCLGlCQUFPNUIsU0FBUyxDQUFDUSxJQUFWLENBQWVlLEdBQWYsQ0FBUDtBQUNEO0FBQ0Y7QUFDRjs7QUFDRCxTQUFLckIsT0FBTCxHQUFlMEIsT0FBZjtBQUNEOztBQWpIcUI7O0FBb0hqQixNQUFNckMsZUFBZSxHQUFHO0FBQzdCc0Msb0JBQWtCLEdBQUc7QUFDbkIsU0FBS3JCLElBQUwsR0FBWSxFQUFaO0FBQ0EsU0FBS3NCLGtCQUFMLEdBQTBCLElBQUloQyxpQkFBSixDQUFzQixJQUF0QixDQUExQjs7QUFDQSxVQUFNOEIsT0FBTyxHQUFHLEtBQUtFLGtCQUFMLENBQXdCekIsYUFBeEIsRUFBaEI7O0FBQ0EsU0FBS3lCLGtCQUFMLENBQXdCSCxVQUF4QixDQUFtQ0MsT0FBbkM7QUFDRCxHQU40Qjs7QUFRN0JHLHFCQUFtQixDQUFDQyxTQUFELEVBQVlDLFNBQVosRUFBdUI7QUFDeEMsVUFBTUMsU0FBUyxHQUFHLEtBQUtDLEtBQXZCO0FBQ0EsVUFBTUMsU0FBUyxHQUFHLEtBQUtDLEtBQXZCO0FBQ0EsUUFBSVQsT0FBSjs7QUFDQSxRQUFJO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFLTyxLQUFMLEdBQWFILFNBQWI7QUFDQSxXQUFLSyxLQUFMLEdBQWFKLFNBQWI7QUFDQUwsYUFBTyxHQUFHLEtBQUtFLGtCQUFMLENBQXdCekIsYUFBeEIsRUFBVjtBQUNELEtBWEQsU0FXVTtBQUNSLFdBQUs4QixLQUFMLEdBQWFELFNBQWI7QUFDQSxXQUFLRyxLQUFMLEdBQWFELFNBQWI7QUFDRDs7QUFFRCxTQUFLTixrQkFBTCxDQUF3QkgsVUFBeEIsQ0FBbUNDLE9BQW5DO0FBQ0QsR0E3QjRCOztBQStCN0JVLHNCQUFvQixHQUFHO0FBQ3JCLFNBQUtSLGtCQUFMLENBQXdCM0IsT0FBeEI7QUFDRDs7QUFqQzRCLENBQXhCOztBQW9DUCxNQUFNb0MsY0FBTixTQUE2QjVDLEtBQUssQ0FBQzZDLFNBQW5DLENBQTZDOztBQUM3Q3BCLE1BQU0sQ0FBQ3FCLE1BQVAsQ0FBY0YsY0FBYyxDQUFDRyxTQUE3QixFQUF3Q25ELGVBQXhDOztBQUNBLE1BQU1vRCxrQkFBTixTQUFpQ2hELEtBQUssQ0FBQ2lELGFBQXZDLENBQXFEOztBQUNyRHhCLE1BQU0sQ0FBQ3FCLE1BQVAsQ0FBY0Usa0JBQWtCLENBQUNELFNBQWpDLEVBQTRDbkQsZUFBNUM7O0FBRWUsU0FBU0csT0FBVCxDQUFpQm1ELE9BQWpCLEVBQTBCO0FBQ3ZDLE1BQUlDLGVBQWUsR0FBR0QsT0FBdEI7O0FBQ0EsTUFBSSxPQUFPQSxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQyxtQkFBZSxHQUFHO0FBQ2hCeEMsbUJBQWEsRUFBRXVDO0FBREMsS0FBbEI7QUFHRDs7QUFFRCxRQUFNO0FBQUV2QyxpQkFBRjtBQUFpQnlDLFFBQUksR0FBRztBQUF4QixNQUFpQ0QsZUFBdkM7QUFFQSxRQUFNRSxhQUFhLEdBQUdELElBQUksR0FBR0osa0JBQUgsR0FBd0JKLGNBQWxEO0FBQ0EsU0FBUVUsZ0JBQUQsSUFDTCxNQUFNQyx3QkFBTixTQUF1Q0YsYUFBdkMsQ0FBcUQ7QUFDbkQxQyxpQkFBYSxHQUFHO0FBQ2QsYUFBT0EsYUFBYSxDQUFDLEtBQUs2QixLQUFOLENBQXBCO0FBQ0Q7O0FBQ0RnQixVQUFNLEdBQUc7QUFDUCxhQUFPLG9CQUFDLGdCQUFELDZCQUFzQixLQUFLaEIsS0FBM0IsRUFBc0MsS0FBSzNCLElBQTNDLEVBQVA7QUFDRDs7QUFOa0QsR0FEdkQ7QUFVRCxDOzs7Ozs7Ozs7OztBQzNMRHJCLE1BQU0sQ0FBQ00sTUFBUCxDQUFjO0FBQUNILFNBQU8sRUFBQyxNQUFJOEQ7QUFBYixDQUFkO0FBQTZDLElBQUl4RCxNQUFKO0FBQVdULE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ1EsUUFBTSxDQUFDUCxDQUFELEVBQUc7QUFBQ08sVUFBTSxHQUFDUCxDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFELElBQUlNLEtBQUo7QUFBVVIsTUFBTSxDQUFDQyxJQUFQLENBQVksT0FBWixFQUFvQjtBQUFDRSxTQUFPLENBQUNELENBQUQsRUFBRztBQUFDTSxTQUFLLEdBQUNOLENBQU47QUFBUTs7QUFBcEIsQ0FBcEIsRUFBMEMsQ0FBMUM7QUFBNkMsSUFBSUssT0FBSjtBQUFZUCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFQUFvQztBQUFDRSxTQUFPLENBQUNELENBQUQsRUFBRztBQUFDSyxXQUFPLEdBQUNMLENBQVI7QUFBVTs7QUFBdEIsQ0FBcEMsRUFBNEQsQ0FBNUQ7QUFRaEwsSUFBSWdFLG1CQUFtQixHQUFHLEtBQTFCOztBQUVlLFNBQVNELGVBQVQsQ0FBeUJQLE9BQXpCLEVBQWtDTCxTQUFsQyxFQUE2QztBQUMxRCxNQUFJLENBQUNhLG1CQUFELElBQXdCekQsTUFBTSxDQUFDMEQsYUFBbkMsRUFBa0Q7QUFDaEQ3QixXQUFPLENBQUNDLElBQVIsQ0FDRSxvR0FDRSxzRkFGSjtBQUlBMkIsdUJBQW1CLEdBQUcsSUFBdEI7QUFDRDs7QUFFRCxTQUFPM0QsT0FBTyxDQUFDbUQsT0FBRCxDQUFQLENBQWlCTCxTQUFqQixDQUFQO0FBQ0QsQyIsImZpbGUiOiIvcGFja2FnZXMvcmVhY3QtbWV0ZW9yLWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjaGVja05wbVZlcnNpb25zIH0gZnJvbSAnbWV0ZW9yL3RtZWFzZGF5OmNoZWNrLW5wbS12ZXJzaW9ucyc7XG5cbmNoZWNrTnBtVmVyc2lvbnMoe1xuICByZWFjdDogJzE1LjMgLSAxNicsXG59LCAncmVhY3QtbWV0ZW9yLWRhdGEnKTtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBjcmVhdGVDb250YWluZXIgfSBmcm9tICcuL2NyZWF0ZUNvbnRhaW5lci5qc3gnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoVHJhY2tlciB9IGZyb20gJy4vUmVhY3RNZXRlb3JEYXRhLmpzeCc7XG5leHBvcnQgeyBSZWFjdE1ldGVvckRhdGEgfSBmcm9tICcuL1JlYWN0TWV0ZW9yRGF0YS5qc3gnO1xuIiwiLyogZ2xvYmFsIFBhY2thZ2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3ByZWZlci1zdGF0ZWxlc3MtZnVuY3Rpb24gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgVHJhY2tlciB9IGZyb20gJ21ldGVvci90cmFja2VyJztcblxuLy8gQSBjbGFzcyB0byBrZWVwIHRoZSBzdGF0ZSBhbmQgdXRpbGl0eSBtZXRob2RzIG5lZWRlZCB0byBtYW5hZ2Vcbi8vIHRoZSBNZXRlb3IgZGF0YSBmb3IgYSBjb21wb25lbnQuXG5jbGFzcyBNZXRlb3JEYXRhTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIHRoaXMuY29tcHV0YXRpb24gPSBudWxsO1xuICAgIHRoaXMub2xkRGF0YSA9IG51bGw7XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIGlmICh0aGlzLmNvbXB1dGF0aW9uKSB7XG4gICAgICB0aGlzLmNvbXB1dGF0aW9uLnN0b3AoKTtcbiAgICAgIHRoaXMuY29tcHV0YXRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGEoKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQ7XG5cbiAgICBpZiAoIWNvbXBvbmVudC5nZXRNZXRlb3JEYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHJlbmRlcmluZyBvbiB0aGUgc2VydmVyLCB3ZSBkb24ndCB3YW50IHRvIHVzZSB0aGUgVHJhY2tlci5cbiAgICAvLyBXZSBvbmx5IGRvIHRoZSBmaXJzdCByZW5kZXJpbmcgb24gdGhlIHNlcnZlciBzbyB3ZSBjYW4gZ2V0IHRoZSBkYXRhIHJpZ2h0IGF3YXlcbiAgICBpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LmdldE1ldGVvckRhdGEoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb21wdXRhdGlvbikge1xuICAgICAgdGhpcy5jb21wdXRhdGlvbi5zdG9wKCk7XG4gICAgICB0aGlzLmNvbXB1dGF0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgZGF0YTtcbiAgICAvLyBVc2UgVHJhY2tlci5ub25yZWFjdGl2ZSBpbiBjYXNlIHdlIGFyZSBpbnNpZGUgYSBUcmFja2VyIENvbXB1dGF0aW9uLlxuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiBzb21lb25lIGNhbGxzIGBSZWFjdERPTS5yZW5kZXJgIGluc2lkZSBhIENvbXB1dGF0aW9uLlxuICAgIC8vIEluIHRoYXQgY2FzZSwgd2Ugd2FudCB0byBvcHQgb3V0IG9mIHRoZSBub3JtYWwgYmVoYXZpb3Igb2YgbmVzdGVkXG4gICAgLy8gQ29tcHV0YXRpb25zLCB3aGVyZSBpZiB0aGUgb3V0ZXIgb25lIGlzIGludmFsaWRhdGVkIG9yIHN0b3BwZWQsXG4gICAgLy8gaXQgc3RvcHMgdGhlIGlubmVyIG9uZS5cbiAgICB0aGlzLmNvbXB1dGF0aW9uID0gVHJhY2tlci5ub25yZWFjdGl2ZSgoKSA9PiAoXG4gICAgICBUcmFja2VyLmF1dG9ydW4oKGMpID0+IHtcbiAgICAgICAgaWYgKGMuZmlyc3RSdW4pIHtcbiAgICAgICAgICBjb25zdCBzYXZlZFNldFN0YXRlID0gY29tcG9uZW50LnNldFN0YXRlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb21wb25lbnQuc2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAnQ2FuXFwndCBjYWxsIGBzZXRTdGF0ZWAgaW5zaWRlIGBnZXRNZXRlb3JEYXRhYCBhcyB0aGlzIGNvdWxkICdcbiAgICAgICAgICAgICAgICArICdjYXVzZSBhbiBlbmRsZXNzIGxvb3AuIFRvIHJlc3BvbmQgdG8gTWV0ZW9yIGRhdGEgY2hhbmdpbmcsICdcbiAgICAgICAgICAgICAgICArICdjb25zaWRlciBtYWtpbmcgdGhpcyBjb21wb25lbnQgYSBcXFwid3JhcHBlciBjb21wb25lbnRcXFwiIHRoYXQgJ1xuICAgICAgICAgICAgICAgICsgJ29ubHkgZmV0Y2hlcyBkYXRhIGFuZCBwYXNzZXMgaXQgaW4gYXMgcHJvcHMgdG8gYSBjaGlsZCAnXG4gICAgICAgICAgICAgICAgKyAnY29tcG9uZW50LiBUaGVuIHlvdSBjYW4gdXNlIGBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzYCBpbiAnXG4gICAgICAgICAgICAgICAgKyAndGhhdCBjaGlsZCBjb21wb25lbnQuJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkYXRhID0gY29tcG9uZW50LmdldE1ldGVvckRhdGEoKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgY29tcG9uZW50LnNldFN0YXRlID0gc2F2ZWRTZXRTdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU3RvcCB0aGlzIGNvbXB1dGF0aW9uIGluc3RlYWQgb2YgdXNpbmcgdGhlIHJlLXJ1bi5cbiAgICAgICAgICAvLyBXZSB1c2UgYSBicmFuZC1uZXcgYXV0b3J1biBmb3IgZWFjaCBjYWxsIHRvIGdldE1ldGVvckRhdGFcbiAgICAgICAgICAvLyB0byBjYXB0dXJlIGRlcGVuZGVuY2llcyBvbiBhbnkgcmVhY3RpdmUgZGF0YSBzb3VyY2VzIHRoYXRcbiAgICAgICAgICAvLyBhcmUgYWNjZXNzZWQuICBUaGUgcmVhc29uIHdlIGNhbid0IHVzZSBhIHNpbmdsZSBhdXRvcnVuXG4gICAgICAgICAgLy8gZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgY29tcG9uZW50IGlzIHRoYXQgVHJhY2tlciBvbmx5XG4gICAgICAgICAgLy8gcmUtcnVucyBhdXRvcnVucyBhdCBmbHVzaCB0aW1lLCB3aGlsZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG9cbiAgICAgICAgICAvLyByZS1jYWxsIGdldE1ldGVvckRhdGEgc3luY2hyb25vdXNseSB3aGVuZXZlciB3ZSB3YW50LCBlLmcuXG4gICAgICAgICAgLy8gZnJvbSBjb21wb25lbnRXaWxsVXBkYXRlLlxuICAgICAgICAgIGMuc3RvcCgpO1xuICAgICAgICAgIC8vIENhbGxpbmcgZm9yY2VVcGRhdGUoKSB0cmlnZ2VycyBjb21wb25lbnRXaWxsVXBkYXRlIHdoaWNoXG4gICAgICAgICAgLy8gcmVjYWxjdWxhdGVzIGdldE1ldGVvckRhdGEoKSBhbmQgcmUtcmVuZGVycyB0aGUgY29tcG9uZW50LlxuICAgICAgICAgIGNvbXBvbmVudC5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICkpO1xuXG4gICAgaWYgKFBhY2thZ2UubW9uZ28gJiYgUGFja2FnZS5tb25nby5Nb25nbykge1xuICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBQYWNrYWdlLm1vbmdvLk1vbmdvLkN1cnNvcikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICdXYXJuaW5nOiB5b3UgYXJlIHJldHVybmluZyBhIE1vbmdvIGN1cnNvciBmcm9tIGdldE1ldGVvckRhdGEuICdcbiAgICAgICAgICAgICsgJ1RoaXMgdmFsdWUgd2lsbCBub3QgYmUgcmVhY3RpdmUuIFlvdSBwcm9iYWJseSB3YW50IHRvIGNhbGwgJ1xuICAgICAgICAgICAgKyAnYC5mZXRjaCgpYCBvbiB0aGUgY3Vyc29yIGJlZm9yZSByZXR1cm5pbmcgaXQuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgdXBkYXRlRGF0YShuZXdEYXRhKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQ7XG4gICAgY29uc3Qgb2xkRGF0YSA9IHRoaXMub2xkRGF0YTtcblxuICAgIGlmICghKG5ld0RhdGEgJiYgKHR5cGVvZiBuZXdEYXRhKSA9PT0gJ29iamVjdCcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG9iamVjdCByZXR1cm5lZCBmcm9tIGdldE1ldGVvckRhdGEnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIGNvbXBvbmVudERhdGEgaW4gcGxhY2UgYmFzZWQgb24gbmV3RGF0YVxuICAgIGZvciAobGV0IGtleSBpbiBuZXdEYXRhKSB7XG4gICAgICBjb21wb25lbnQuZGF0YVtrZXldID0gbmV3RGF0YVtrZXldO1xuICAgIH1cbiAgICAvLyBpZiB0aGVyZSBpcyBvbGREYXRhICh3aGljaCBpcyBldmVyeSB0aW1lIHRoaXMgbWV0aG9kIGlzIGNhbGxlZFxuICAgIC8vIGV4Y2VwdCB0aGUgZmlyc3QpLCBkZWxldGUga2V5cyBpbiBuZXdEYXRhIHRoYXQgYXJlbid0IGluXG4gICAgLy8gb2xkRGF0YS4gIGRvbid0IGludGVyZmVyZSB3aXRoIG90aGVyIGtleXMsIGluIGNhc2Ugd2UgYXJlXG4gICAgLy8gY28tZXhpc3Rpbmcgd2l0aCBzb21ldGhpbmcgZWxzZSB0aGF0IHdyaXRlcyB0byBhIGNvbXBvbmVudCdzXG4gICAgLy8gdGhpcy5kYXRhLlxuICAgIGlmIChvbGREYXRhKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gb2xkRGF0YSkge1xuICAgICAgICBpZiAoIShrZXkgaW4gbmV3RGF0YSkpIHtcbiAgICAgICAgICBkZWxldGUgY29tcG9uZW50LmRhdGFba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9sZERhdGEgPSBuZXdEYXRhO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSZWFjdE1ldGVvckRhdGEgPSB7XG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLl9tZXRlb3JEYXRhTWFuYWdlciA9IG5ldyBNZXRlb3JEYXRhTWFuYWdlcih0aGlzKTtcbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5fbWV0ZW9yRGF0YU1hbmFnZXIuY2FsY3VsYXRlRGF0YSgpO1xuICAgIHRoaXMuX21ldGVvckRhdGFNYW5hZ2VyLnVwZGF0ZURhdGEobmV3RGF0YSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHNhdmVQcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2F2ZVN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgbmV3RGF0YTtcbiAgICB0cnkge1xuICAgICAgLy8gVGVtcG9yYXJpbHkgYXNzaWduIHRoaXMuc3RhdGUgYW5kIHRoaXMucHJvcHMsXG4gICAgICAvLyBzbyB0aGF0IHRoZXkgYXJlIHNlZW4gYnkgZ2V0TWV0ZW9yRGF0YSFcbiAgICAgIC8vIFRoaXMgaXMgYSBzaW11bGF0aW9uIG9mIGhvdyB0aGUgcHJvcG9zZWQgT2JzZXJ2ZSBBUElcbiAgICAgIC8vIGZvciBSZWFjdCB3aWxsIHdvcmssIHdoaWNoIGNhbGxzIG9ic2VydmUoKSBhZnRlclxuICAgICAgLy8gY29tcG9uZW50V2lsbFVwZGF0ZSBhbmQgYWZ0ZXIgcHJvcHMgYW5kIHN0YXRlIGFyZVxuICAgICAgLy8gdXBkYXRlZCwgYnV0IGJlZm9yZSByZW5kZXIoKSBpcyBjYWxsZWQuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMzk4LlxuICAgICAgdGhpcy5wcm9wcyA9IG5leHRQcm9wcztcbiAgICAgIHRoaXMuc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgICBuZXdEYXRhID0gdGhpcy5fbWV0ZW9yRGF0YU1hbmFnZXIuY2FsY3VsYXRlRGF0YSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnByb3BzID0gc2F2ZVByb3BzO1xuICAgICAgdGhpcy5zdGF0ZSA9IHNhdmVTdGF0ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9tZXRlb3JEYXRhTWFuYWdlci51cGRhdGVEYXRhKG5ld0RhdGEpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX21ldGVvckRhdGFNYW5hZ2VyLmRpc3Bvc2UoKTtcbiAgfSxcbn07XG5cbmNsYXNzIFJlYWN0Q29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHt9XG5PYmplY3QuYXNzaWduKFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RNZXRlb3JEYXRhKTtcbmNsYXNzIFJlYWN0UHVyZUNvbXBvbmVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge31cbk9iamVjdC5hc3NpZ24oUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RNZXRlb3JEYXRhKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29ubmVjdChvcHRpb25zKSB7XG4gIGxldCBleHBhbmRlZE9wdGlvbnMgPSBvcHRpb25zO1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBleHBhbmRlZE9wdGlvbnMgPSB7XG4gICAgICBnZXRNZXRlb3JEYXRhOiBvcHRpb25zLFxuICAgIH07XG4gIH1cblxuICBjb25zdCB7IGdldE1ldGVvckRhdGEsIHB1cmUgPSB0cnVlIH0gPSBleHBhbmRlZE9wdGlvbnM7XG5cbiAgY29uc3QgQmFzZUNvbXBvbmVudCA9IHB1cmUgPyBSZWFjdFB1cmVDb21wb25lbnQgOiBSZWFjdENvbXBvbmVudDtcbiAgcmV0dXJuIChXcmFwcGVkQ29tcG9uZW50KSA9PiAoXG4gICAgY2xhc3MgUmVhY3RNZXRlb3JEYXRhQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgICBnZXRNZXRlb3JEYXRhKCkge1xuICAgICAgICByZXR1cm4gZ2V0TWV0ZW9yRGF0YSh0aGlzLnByb3BzKTtcbiAgICAgIH1cbiAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSB7Li4udGhpcy5kYXRhfSAvPjtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG4iLCIvKipcbiAqIENvbnRhaW5lciBoZWxwZXIgdXNpbmcgcmVhY3QtbWV0ZW9yLWRhdGEuXG4gKi9cblxuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNvbm5lY3QgZnJvbSAnLi9SZWFjdE1ldGVvckRhdGEuanN4JztcblxubGV0IGhhc0Rpc3BsYXllZFdhcm5pbmcgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKG9wdGlvbnMsIENvbXBvbmVudCkge1xuICBpZiAoIWhhc0Rpc3BsYXllZFdhcm5pbmcgJiYgTWV0ZW9yLmlzRGV2ZWxvcG1lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnV2FybmluZzogY3JlYXRlQ29udGFpbmVyIHdhcyBkZXByZWNhdGVkIGluIHJlYWN0LW1ldGVvci1kYXRhQDAuMi4xMy4gVXNlIHdpdGhUcmFja2VyIGluc3RlYWQuXFxuJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbWV0ZW9yL3JlYWN0LXBhY2thZ2VzL3RyZWUvZGV2ZWwvcGFja2FnZXMvcmVhY3QtbWV0ZW9yLWRhdGEjdXNhZ2UnLFxuICAgICk7XG4gICAgaGFzRGlzcGxheWVkV2FybmluZyA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gY29ubmVjdChvcHRpb25zKShDb21wb25lbnQpO1xufVxuIl19

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Template = Package['templating-runtime'].Template;
var Session = Package.session.Session;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Bert;

var require = meteorInstall({"node_modules":{"meteor":{"themeteorchef:bert":{"templates":{"template.bert-alert.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/themeteorchef_bert/templates/template.bert-alert.js                                   //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //

Template.__checkName("bertAlert");
Template["bertAlert"] = new Template("Template.bertAlert", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "bert-alert ", Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "style")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "type")), " clearfix" ];
    }
  }, "\n    ", HTML.DIV({
    class: "bert-container"
  }, "\n      ", HTML.DIV({
    class: "bert-gem"
  }, "\n        ", HTML.I({
    class: function() {
      return [ "fa ", Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "icon")) ];
    }
  }), "\n      "), "\n      ", HTML.DIV({
    class: "bert-content"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("alert"), "title"));
  }, function() {
    return HTML.H5(Blaze.View("lookup:alert.title", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "title"));
    }));
  }), "\n        ", HTML.P(Blaze.View("lookup:alert.message", function() {
    return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "message")));
  })), "\n      "), "\n    "), "\n  ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////

},"bert-alert.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/themeteorchef_bert/templates/bert-alert.js                                            //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Template.bertAlert.helpers({
  alert() {
    return Session.get('bertAlert');
  }

});
////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.body.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/themeteorchef_bert/templates/template.body.js                                         //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //

Template.body.addContent((function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("bertAlert"));
}));
Meteor.startup(Template.body.renderToDocument);

////////////////////////////////////////////////////////////////////////////////////////////////////

}},"bert.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/themeteorchef_bert/bert.js                                                            //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
class BertAlert {
  constructor() {
    this.styles = ['fixed-top', 'fixed-bottom', 'growl-top-left', 'growl-top-right', 'growl-bottom-left', 'growl-bottom-right'];
    this.types = ['default', 'success', 'info', 'warning', 'danger'];
    this.icons = {
      default: 'fa-bell',
      success: 'fa-check',
      info: 'fa-info',
      warning: 'fa-warning',
      danger: 'fa-remove'
    };
    this.defaults = {
      hideDelay: 3500,
      style: 'fixed-top',
      type: 'default'
    };
  }

  alert() {
    if (this.isVisible()) {
      this.hide();
      setTimeout(() => {
        this.handleAlert(arguments);
      }, 300);
    } else {
      this.handleAlert(arguments);
    }
  }

  isVisible() {
    return $('.bert-alert').hasClass('show');
  }

  handleAlert(alert) {
    this.registerClickHandler();
    this.setBertOnSession(alert);
    setTimeout(() => {
      this.show();
    }, 20);
    this.bertTimer();
  }

  registerClickHandler() {
    $('.bert-alert').off('click');
    $('.bert-alert').on('click', () => {
      this.hide();
    });
  }

  bertTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.hide();
    }, this.defaults.hideDelay);
    return this.timer;
  }

  show() {
    $('.bert-alert').addClass('show').delay(25).queue(() => {
      $('.bert-alert').addClass('animate').dequeue();
    });
  }

  hide() {
    $('.bert-alert').removeClass('animate');
    setTimeout(() => {
      $('.bert-alert').removeClass('show');
      Session.set('bertAlert', null);
    }, 300);
  }

  setBertOnSession(alert) {
    if (typeof alert[0] === 'object') {
      let type = alert[0].type || this.defaults.type;
      Session.set('bertAlert', {
        title: alert[0].title || "",
        message: alert[0].message || "",
        type: type,
        style: alert[0].style || this.defaults.style,
        icon: alert[0].icon || this.icons[type]
      });
    } else {
      let type = alert[1] || this.defaults.type;
      Session.set('bertAlert', {
        message: alert[0] || "",
        type: type,
        style: alert[2] || this.defaults.style,
        icon: alert[3] || this.icons[type]
      });
    }
  }

}

Bert = new BertAlert();
////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".scss"
  ]
});

require("/node_modules/meteor/themeteorchef:bert/templates/template.bert-alert.js");
require("/node_modules/meteor/themeteorchef:bert/templates/bert-alert.js");
require("/node_modules/meteor/themeteorchef:bert/templates/template.body.js");
require("/node_modules/meteor/themeteorchef:bert/bert.js");

/* Exports */
Package._define("themeteorchef:bert", {
  Bert: Bert
});

})();

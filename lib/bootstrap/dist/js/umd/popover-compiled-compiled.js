'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './tooltip'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./tooltip'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Tooltip);
    global.popover = mod.exports;
  }
})(undefined, function (exports, module, _tooltip) {
  'use strict';

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
          return undefined;
        } else {
          _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
        }
      } else if ('value' in desc) {
        return desc.value;
      } else {
        var getter = desc.get;if (getter === undefined) {
          return undefined;
        }return getter.call(receiver);
      }
    }
  };

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _Tooltip2 = _interopRequireDefault(_tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'popover';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = $.extend({}, _Tooltip2['default'].Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
    });

    var DefaultType = $.extend({}, _Tooltip2['default'].DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      TITLE: '.popover-title',
      CONTENT: '.popover-content',
      ARROW: '.popover-arrow'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Popover = function (_Tooltip) {
      _inherits(Popover, _Tooltip);

      function Popover() {
        _classCallCheck(this, Popover);

        _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
      }

      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */

      _createClass(Popover, [{
        key: 'isWithContent',

        // overrides

        value: function isWithContent() {
          return this.getTitle() || this._getContent();
        }
      }, {
        key: 'getTipElement',
        value: function getTipElement() {
          return this.tip = this.tip || $(this.config.template)[0];
        }
      }, {
        key: 'setContent',
        value: function setContent() {
          var $tip = $(this.getTipElement());

          // we use append for html objects to maintain js events
          this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
          this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

          $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

          this.cleanupTether();
        }

        // private

      }, {
        key: '_getContent',
        value: function _getContent() {
          return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);
            var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

            if (!data && /destroy|hide/.test(config)) {
              return;
            }

            if (!data) {
              data = new Popover(this, _config);
              $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        }
      }, {
        key: 'VERSION',

        // getters

        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(_Tooltip2['default']);

    $.fn[NAME] = Popover._jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }(jQuery);

  module.exports = Popover;
});

//# sourceMappingURL=popover-compiled.js.map

//# sourceMappingURL=popover-compiled-compiled.js.map
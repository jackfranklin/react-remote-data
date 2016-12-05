(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('remote-data-js'), require('remote-data-js/lib/states')) :
  typeof define === 'function' && define.amd ? define(['react', 'remote-data-js', 'remote-data-js/lib/states'], factory) :
  (global.ReactRemoteDataJS = factory(global.React,global.RemoteDataJs,global.remoteDataJs_lib_states));
}(this, (function (React,RemoteDataJs,remoteDataJs_lib_states) { 'use strict';

React = 'default' in React ? React['default'] : React;
RemoteDataJs = 'default' in RemoteDataJs ? RemoteDataJs['default'] : RemoteDataJs;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var RemoteData = function (_React$Component) {
  inherits(RemoteData, _React$Component);

  function RemoteData() {
    classCallCheck(this, RemoteData);
    return possibleConstructorReturn(this, (RemoteData.__proto__ || Object.getPrototypeOf(RemoteData)).apply(this, arguments));
  }

  createClass(RemoteData, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.setState({
        remoteData: new RemoteDataJs({
          url: this.props.url,
          onChange: function onChange(data) {
            return _this2.remoteDataChange(data);
          }
        })
      });
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _state$remoteData;

      return (_state$remoteData = this.state.remoteData).fetch.apply(_state$remoteData, arguments);
    }
  }, {
    key: 'remoteDataChange',
    value: function remoteDataChange(remoteData) {
      this.setState({ remoteData: remoteData });
    }
  }, {
    key: 'propsForChildStates',
    value: function propsForChildStates(state) {
      var _this3 = this;

      return Object.assign({}, this.props, {
        fetch: function fetch() {
          return _this3.fetch.apply(_this3, arguments);
        },
        request: this.state.remoteData
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return this.state.remoteData.case({
        NotAsked: function NotAsked() {
          return _this4.props.notAsked(_this4.propsForChildStates(remoteDataJs_lib_states.NOT_ASKED));
        },
        Pending: function Pending() {
          return _this4.props.pending(_this4.propsForChildStates(remoteDataJs_lib_states.PENDING));
        },
        Success: function Success() {
          return _this4.props.success(_this4.propsForChildStates(remoteDataJs_lib_states.SUCCESS));
        },
        Failure: function Failure() {
          return _this4.props.failure(_this4.propsForChildStates(remoteDataJs_lib_states.FAILURE));
        }
      });
    }
  }]);
  return RemoteData;
}(React.Component);

return RemoteData;

})));

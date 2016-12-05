'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _remoteDataJs = require('remote-data-js');

var _remoteDataJs2 = babelHelpers.interopRequireDefault(_remoteDataJs);

var _states = require('remote-data-js/lib/states');

var FINAL_STATES = [_states.SUCCESS, _states.FAILURE];

var RemoteData = function (_React$Component) {
  babelHelpers.inherits(RemoteData, _React$Component);

  function RemoteData() {
    babelHelpers.classCallCheck(this, RemoteData);
    return babelHelpers.possibleConstructorReturn(this, (RemoteData.__proto__ || Object.getPrototypeOf(RemoteData)).apply(this, arguments));
  }

  babelHelpers.createClass(RemoteData, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.setState({
        remoteData: new _remoteDataJs2.default({
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
          return _this4.props.notAsked(_this4.propsForChildStates(_states.NOT_ASKED));
        },
        Pending: function Pending() {
          return _this4.props.pending(_this4.propsForChildStates(_states.PENDING));
        },
        Success: function Success() {
          return _this4.props.success(_this4.propsForChildStates(_states.SUCCESS));
        },
        Failure: function Failure() {
          return _this4.props.failure(_this4.propsForChildStates(_states.FAILURE));
        }
      });
    }
  }]);
  return RemoteData;
}(_react2.default.Component);

exports.default = RemoteData;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NameEditor = function (_React$Component) {
  _inherits(NameEditor, _React$Component);

  function NameEditor(props) {
    _classCallCheck(this, NameEditor);

    return _possibleConstructorReturn(this, (NameEditor.__proto__ || Object.getPrototypeOf(NameEditor)).call(this, props));
  }

  _createClass(NameEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.inputRef.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("input", {
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        type: "text",
        ref: function ref(val) {
          return _this2.inputRef = val;
        },
        value: this.props.name,
        onChange: function onChange(e) {
          return _this2.props.updateName(e.target.value);
        }
      });
    }
  }]);

  return NameEditor;
}(React.Component);

var Name = function (_React$Component2) {
  _inherits(Name, _React$Component2);

  function Name(props) {
    _classCallCheck(this, Name);

    var _this3 = _possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).call(this, props));

    _this3.state = { editing: props.name == "" };
    return _this3;
  }

  _createClass(Name, [{
    key: "setEditing",
    value: function setEditing(to) {
      if (!to) {
        this.props.triggerUpdate();
      }
      this.setState(Object.assign({}, this.state, { editing: to }));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.name != "" && this.props.name == "") {
        this.setEditing(true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "div",
        {
          className: "name",
          onClick: function onClick() {
            return _this4.setEditing(!_this4.state.editing);
          },
          onKeyDown: function onKeyDown(e) {
            if (e.which == 13) {
              _this4.setEditing(false);
            }
          }
        },
        React.createElement(
          "span",
          { onClick: function onClick(e) {
              e.stopPropagation();
              _this4.props.remove();
            } },
          "\u2715"
        ),
        this.state.editing ? React.createElement(NameEditor, { name: this.props.name, updateName: this.props.updateName }) : React.createElement(
          "p",
          null,
          this.props.name
        ),
        this.props.match && React.createElement(
          "p",
          null,
          "(",
          this.props.match,
          ")"
        )
      );
    }
  }]);

  return Name;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this5 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this5.state = {
      names: [""],
      matches: []
    };
    return _this5;
  }

  _createClass(App, [{
    key: "updateName",
    value: function updateName(index) {
      var _this6 = this;

      return function (name) {
        var names = _this6.state.names.slice();
        names[index] = name;
        _this6.setState(Object.assign({}, _this6.state, { names: names }));
      };
    }
  }, {
    key: "remove",
    value: function remove(index) {
      var _this7 = this;

      return function () {
        var names = _this7.state.names.slice();
        if (index == names.length - 1) {
          names[index] = "";
        } else {
          names.splice(index, 1);
        }
        _this7.setState(Object.assign({}, _this7.state, { names: names }));
      };
    }
  }, {
    key: "triggerUpdate",
    value: function triggerUpdate(index) {
      var _this8 = this;

      return function () {
        if (index == _this8.state.names.length - 1 && _this8.state.names[index] != "") {
          var names = _this8.state.names.slice();
          names.push("");
          _this8.setState(Object.assign({}, _this8.state, { names: names }));
        }
      };
    }
  }, {
    key: "createMatches",
    value: function createMatches() {
      var names = this.state.names.filter(function (name) {
        return name != "";
      });
      while (true) {
        var copy = names.slice();
        var matches = [];
        while (copy.length > 0) {
          matches.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
        }
        var no_self_maps = true;
        for (var i = 0; i < names.length; i++) {
          if (matches[i] == names[i]) {
            no_self_maps = false;
            break;
          }
        }
        if (no_self_maps) {
          this.setState(Object.assign({}, this.state, { matches: matches }));
          break;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "names" },
          this.state.names.map(function (name, i) {
            return React.createElement(Name, {
              name: name,
              match: _this9.state.matches[i],
              key: i,
              updateName: _this9.updateName(i),
              triggerUpdate: _this9.triggerUpdate(i),
              remove: _this9.remove(i)
            });
          })
        ),
        React.createElement(
          "div",
          { className: "button-holder" },
          React.createElement(
            "button",
            { onClick: function onClick() {
                return _this9.createMatches();
              } },
            "Create Matches"
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
//
//  react-dropdown-input
//  Displays a ReactBootstrap.Input element
//  with a ReactBootstrap.DropdownMenu of possible options.
//

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react/addons");
var ReactBootstrap = require("react-bootstrap");
var joinClasses = require("react/lib/joinClasses");
var cx = require("classnames");

var BootstrapMixin = ReactBootstrap.BootstrapMixin;
var DropdownStateMixin = ReactBootstrap.DropdownStateMixin;
var DropdownMenu = ReactBootstrap.DropdownMenu;
var Input = ReactBootstrap.Input;
var MenuItem = ReactBootstrap.MenuItem;

var defaultMaxText = "+# more not shown";

var defaultFilter = function defaultFilter(filterText, optionName) {
  // also optionIndex as third arg
  return optionName.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
};

var genLength = function genLength(list) {
  // deal with both regular arrays and immutablejs objects, which have .count() instead of length
  return typeof list.count !== "undefined" ? list.count() : list.length;
};

var genGet = function genGet(list, i) {
  // deal with both regular arrays and immutablejs objects, which have list.get(i) instead of list[i]
  return typeof list.get !== "undefined" ? list.get(i) : list[i];
};

var caseInsensIndexOf = function caseInsensIndexOf(list, str) {
  var lowerList = list.map(function (item) {
    return item.toLowerCase();
  });
  return lowerList.indexOf(str.toLowerCase());
};

var DropdownInput = React.createClass({
  displayName: "DropdownInput",

  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight: React.PropTypes.bool,
    dropup: React.PropTypes.bool,
    defaultValue: React.PropTypes.string,
    menuClassName: React.PropTypes.string,
    max: React.PropTypes.number,
    maxText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    navItem: React.PropTypes.bool,
    options: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
    filter: React.PropTypes.func,
    // the rest are to make eslint happy
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    bsSize: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.defaultValue || "",
      activeIndex: -1
    };
  },

  filteredOptions: function filteredOptions() {
    var filter = this.props.filter || defaultFilter;
    return this.props.options.filter(filter.bind(undefined, this.state.value));
  },

  cappedLength: function cappedLength(options) {
    var total = genLength(options);
    if (total > this.props.max) {
      // if it exceeded the max, we took an extra one off
      total = this.props.max - 1;
    }
    return total;
  },

  render: function render() {
    var classes = {
      dropdown: true,
      open: this.state.open,
      dropup: this.props.dropup
    };
    // you can provide a filter prop, which is a function(filterText, optionName, optionIndex) which should
    // return true to show option with the given name and index, given the input filterText.
    var filteredOptions = this.filteredOptions();
    var numFiltered = genLength(filteredOptions);
    var maxMenuItem = null;
    var maxText = typeof this.props.maxText === "undefined" ? defaultMaxText : this.props.maxText;
    if (this.props.max && numFiltered > this.props.max) {
      // take an extra one off, to leave space for the maxText
      filteredOptions = filteredOptions.slice(0, this.props.max - 1);
      maxText = maxText.replace("#", numFiltered - this.props.max + 1);
      maxMenuItem = this.renderAsMenuItem(maxText, this.props.max, null, true);
    }
    var dropdown = null;
    if (numFiltered > 0) {
      dropdown = React.createElement(
        DropdownMenu,
        {
          className: this.props.menuClassName,
          ref: "menu",
          "aria-labelledby": this.props.id,
          pullRight: this.props.pullRight,
          key: 1,
          onSelect: null },
        filteredOptions.map(this.renderAsMenuItem),
        maxMenuItem
      );
    }
    return React.createElement(
      "div",
      { className: joinClasses(this.props.className, cx(classes)) },
      React.createElement(Input, _extends({}, this.props, {
        menuClassName: null,
        options: null,
        type: "text",
        bsSize: this.props.bsSize,
        ref: "dropdownInput",
        onClick: this.handleDropdownClick,
        key: 0,
        navDropdown: this.props.navItem,
        navItem: null,
        pullRight: null,
        onSelect: null,
        onChange: this.handleInputChange,
        onKeyDown: this.handleKeyDown,
        dropup: null,
        value: this.state.value })),
      dropdown
    );
  },

  renderAsMenuItem: function renderAsMenuItem(item, index, options, disabled) {
    var start = item.toLowerCase().indexOf(this.state.value.toLowerCase()),
        end = start + this.state.value.length,
        part1 = item.slice(0, start),
        part2 = item.slice(start, end),
        part3 = item.slice(end);
    var classes = cx({ active: this.state.activeIndex === index, disabled: disabled === true });
    if (disabled) {
      // don't highlight parts of disabled items, eg. the maxText
      part1 = item;
      part2 = null;
      part3 = null;
    }
    return React.createElement(
      MenuItem,
      {
        key: index,
        onSelect: this.handleOptionSelect.bind(this, index, item),
        className: classes,
        onMouseEnter: this.handleMouseEnter.bind(this, index) },
      part1,
      React.createElement(
        "b",
        null,
        part2
      ),
      part3
    );
  },

  handleInputChange: function handleInputChange(e) {
    // the user changed the input text
    this.setState({ value: e.target.value, activeIndex: -1 });
    this.setDropdownState(true);
    // fire the supplied onChange event.
    this.sendChange({ value: e.target.value });
  },

  handleKeyDown: function handleKeyDown(e) {
    // catch arrow keys and the Enter key
    var filteredOptions = this.filteredOptions();
    var numOptions = this.cappedLength(filteredOptions);
    var newName;
    switch (e.keyCode) {

      case 38:
        // up arrow
        if (this.state.activeIndex > 0) {
          this.setState({ activeIndex: this.state.activeIndex - 1 });
        } else {
          this.setState({ activeIndex: numOptions - 1 });
        }
        break;

      case 40:
        // down arrow
        this.setState({ activeIndex: (this.state.activeIndex + 1) % numOptions });
        break;

      case 13:
        // enter
        var newIndex = caseInsensIndexOf(this.props.options, this.state.value); // may need this
        if (this.state.open) {
          e.preventDefault();
        }
        if (this.state.activeIndex >= 0 && this.state.activeIndex < numOptions) {
          newIndex = this.state.activeIndex;
          newName = genGet(filteredOptions, this.state.activeIndex);
          this.setDropdownState(false);
        } else if (this.state.activeIndex === -1 && newIndex >= 0) {
          newName = genGet(this.props.options, newIndex);
          this.setDropdownState(false);
        } else {
          newIndex = this.state.activeIndex;
          newName = this.state.value;
        }
        this.sendSelect({ value: newName, index: newIndex });
        this.sendChange({ value: newName });
        this.setState({ value: newName, activeIndex: -1 });
        break;

    }
  },

  handleMouseEnter: function handleMouseEnter(index) {
    // when the mouse enters a dropdown menu item, set the active item to the item
    this.setState({ activeIndex: index });
  },

  handleDropdownClick: function handleDropdownClick(e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function handleOptionSelect(key, name) {
    // the user clicked on a dropdown menu item
    this.setDropdownState(false);
    this.sendSelect({ value: name, index: this.state.activeIndex });
    this.sendChange({ value: name });
    this.setState({ value: name, activeIndex: -1 });
  },

  sendChange: function sendChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },

  sendSelect: function sendSelect(e) {
    if (this.props.onSelect) {
      this.props.onSelect(e);
    }
  }

});

module.exports = DropdownInput;


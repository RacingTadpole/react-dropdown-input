'use strict';
var React = require('react');
var DropdownInput = require('react-dropdown-input');

var ChooseCity =
  React.createClass({

    propTypes: {
      lookupText: React.PropTypes.string,
      options: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired
    },

    getInitialState: function() {
      return {cityText: null};
    },

    handleSelect: function(choice) {
      // returns choice.value and choice.index
      if (choice.index>=0) {
        this.setState({cityText: choice.value + ' is a nice choice'});
      } else {
        this.setState({cityText: choice.value + ' isn\'t on the list!'});
      }
    },

    render: function() {
      return (
        <div>
          <DropdownInput
            menuClassName='dropdown-input'
            onSelect={this.handleSelect}
            defaultValue={this.props.lookupText}
            placeholder='Choose a city...'
            options={this.props.options}
            max={12}
          />
          <br />
          <div className='pull-right' style={{height: 30, paddingBottom: 80}}>{this.state.cityText}</div>
          <div className='clearfix'></div>
        </div>
      );
    }
  });

module.exports = ChooseCity;

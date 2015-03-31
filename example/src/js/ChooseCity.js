var React = require('react');
var DropdownInput = require('react-dropdown-input');

var ChooseCity = 
  React.createClass({

    handleSelectName: function(o) {
      console.log('selected ', o);
    },

    render: function() {
      return (
        <div>
          <DropdownInput 
          	menuClassName="dropdown-input"
            onSelect={this.handleSelect}
            defaultValue={this.props.lookupText}
            placeholder='Choose a city...'
            options={this.props.options}
            max={12}
          >
          </DropdownInput>
        </div>
      )
    }
  });

module.exports = ChooseCity;
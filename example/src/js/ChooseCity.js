var React = require('react');
var DropdownInput = require('react-dropdown-input');

var ChooseCity = 
  React.createClass({

    getInitialState: function() {
      return {cityText: null}
    },

    handleSelect: function(choice) {
      // returns choice.value and choice.index
      if (choice.index>=0) {
        this.setState({cityText: choice.value + ' is a nice choice'});
      } else {
        this.setState({cityText: choice.value + ' wasn\'t on the list!'});
      }
    },

    render: function() {
      var choiceElt = null;
      if (this.state.cityText) {
        choiceElt = (<div>{this.state.cityText}</div>);
      }
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
          <br />
          {choiceElt}
        </div>
      )
    }
  });

module.exports = ChooseCity;
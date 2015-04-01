/*global jest, describe, it, expect */
'use strict';

jest.dontMock('../DropdownInput.js');

describe('DropdownInput', function() {

  it('does not show the menu at first', function() {
    var React = require('react/addons');
    var DropdownInput = require('../DropdownInput.js');
    var TestUtils = React.addons.TestUtils;

    expect(1+2).toBe(3);

    var menuClassName = 'jest-menu';
    var names = ['Aab', 'abcd', 'Cde', 'Def', 'Deb', 'Eabc'];

    // Render the basic version
    var renderedItem = TestUtils.renderIntoDocument(
      <DropdownInput options={names} menuClassName={menuClassName}/>
    );

    // Verify empty input box is showing
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input').getDOMNode();
    expect(input.textContent).toEqual('');

    // Verify no dropdown menu yet
    expect(TestUtils.scryRenderedDOMComponentsWithClass(renderedItem, menuClassName).length).toEqual(0);

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    TestUtils.Simulate.click(input);
    TestUtils.Simulate.change(input);
    TestUtils.Simulate.keyDown(input, {key: "a"});
    //expect(label.getDOMNode().textContent).toEqual('On');

    // Verify correct dropdown appears after click
    var dropdownMenu = TestUtils.findRenderedDOMComponentWithClass(renderedItem, menuClassName).getDOMNode();
    var itemText;
    for (var i=0; i < dropdownMenu.children.length; i++) {
      itemText = dropdownMenu.children[i].textContent;
      expect(itemText).toEqual(names[i]);
    }

  });

});
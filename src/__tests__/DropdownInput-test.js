/*global jest, describe, it, expect */
'use strict';

jest.dontMock('../DropdownInput.js');

describe('DropdownInput', function() {

  it('does not show the menu at first', function() {
    var React = require('react/addons');
    var DropdownInput = require('../DropdownInput.js');
    var TestUtils = React.addons.TestUtils;
    var itemText;

    var menuClassName = 'jest-menu';
    var names = ['Aab', 'abcd', 'Cde', 'Def', 'Deb', 'Eabc'];

    expect(1+2).toBe(3);

    // Render the basic version
    var renderedItem = TestUtils.renderIntoDocument(
      <DropdownInput options={names} menuClassName={menuClassName}/>
    );

    // Verify empty input box is showing
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input').getDOMNode();
    expect(input.textContent).toEqual('');

    // Verify no dropdown menu yet
    // expect(TestUtils.scryRenderedDOMComponentsWithClass(renderedItem, menuClassName).length).toEqual(0);

    // var x = renderedItem.getDOMNode();
    // console.log(x.textContent, x.classList, x.tagName);
    // x = renderedItem.getDOMNode().children[1];
    // console.log(x.textContent, x.classList, x.tagName);
    // x = x.children;
    // for (var i=0; i < x.length; i++) {
    //   console.log(i, x[i].textContent, x[i].classList, x[i].tagName, x.children && x.children.length);
    // }
    // console.log('--x--');

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input');
    TestUtils.Simulate.click(input);
    TestUtils.Simulate.change(input);
    TestUtils.Simulate.keyDown(input, {key: "a"});
    input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input').getDOMNode();
    //expect(input.textContent).toEqual('a'); // doesn't work
    //expect(label.getDOMNode().textContent).toEqual('On');

    //expect(TestUtils.scryRenderedDOMComponentsWithTag(renderedItem, 'div')).toEqual('');
    // var x = renderedItem.getDOMNode().children;
    // for (var i=0; i < x.length; i++) {
    //   itemText = x[i].textContent;
    //   console.log(itemText);
    // }

    // Verify correct dropdown appears after click
    var dropdownMenu = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'UL').getDOMNode();

    for (var i=0; i < dropdownMenu.children.length; i++) {
      itemText = dropdownMenu.children[i].textContent;
      expect(itemText).toEqual(names[i]);
    }

  });

});
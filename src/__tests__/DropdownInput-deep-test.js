//
// In these tests, we do NOT mock React-Bootstrap, so we can check it has the right behaviour
//

/*global jest, describe, it, expect, beforeEach */
'use strict';

jest.dontMock('../DropdownInput');
jest.dontMock('react-bootstrap');
jest.dontMock('classnames');
var React = require('react/addons');
var DropdownInput = require('../DropdownInput');
var ReactBootstrap = require('react-bootstrap');
var TestUtils = React.addons.TestUtils;

describe('DropdownInput', function() {

  var names = ['Aab', 'abcd', 'Cde', 'Def', 'Deb', 'Eabc'];
  var menuClassName = 'jest-test';
  var id = 'test-id';
  var element = (<DropdownInput id={id} options={names} menuClassName={menuClassName}/>);
  var renderedItem;

  beforeEach(function() {
    renderedItem = TestUtils.renderIntoDocument(element);
  });

  it('contains an initially empty input tag', function() {
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input').getDOMNode();
    expect(input.textContent).toEqual('');
  });

  it('contains the menu class and items', function() {
    var menu = TestUtils.findRenderedDOMComponentWithClass(renderedItem, menuClassName).getDOMNode();
    var items = menu.children;
    for (var i=0; i < items.length; i++) {
      expect(items[i].textContent).toEqual(names[i]);
    }
  });

  it('adjusts the menu when the input changes', function() {
    var txt = 'a';
    var input = TestUtils.findRenderedDOMComponentWithTag(renderedItem, 'input').getDOMNode();
    //TestUtils.Simulate.keyDown(input, {key: 'a'});  // this doesn't work
    TestUtils.Simulate.change(input,  {target: {value: txt}});
    expect(input.value).toEqual(txt);
    // did the menu respond appropriately?
    var menu = TestUtils.findRenderedDOMComponentWithClass(renderedItem, menuClassName).getDOMNode();
    var items = menu.children;
    var matchingNames = names.filter(function(n) { return n.indexOf(txt)>=0; });
    expect(items.length).toEqual(matchingNames.length);
    for (var i=0; i < items.length; i++) {
      expect(items[i].textContent).toEqual(matchingNames[i]);
    }
  });

  it('maxes out with a final message', function() {
    var max = 3;
    var element = (<DropdownInput id={id} options={names} menuClassName={menuClassName} max={max} maxText='+# more'/>);
    var renderedItem = TestUtils.renderIntoDocument(element);
    var menu = TestUtils.findRenderedDOMComponentWithClass(renderedItem, menuClassName).getDOMNode();
    var items = menu.children;
    expect(items.length).toEqual(max);
    expect(items[max - 1].textContent).toEqual('+' + (names.length - max + 1) + ' more');
  });

  it('still shows all options if length == max', function() {
    var max = names.length;
    var element = (<DropdownInput id={id} options={names} menuClassName={menuClassName} max={max} maxText='+# more'/>);
    var renderedItem = TestUtils.renderIntoDocument(element);
    var menu = TestUtils.findRenderedDOMComponentWithClass(renderedItem, menuClassName).getDOMNode();
    var items = menu.children;
    expect(items.length).toEqual(max);
    expect(items[max - 1].textContent).toEqual(names[names.length - 1]);
  });

}); 

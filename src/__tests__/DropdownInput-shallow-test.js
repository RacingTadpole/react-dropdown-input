//
// In these tests, we mock React-Bootstrap, so we can only check it has the right components
//

/*global jest, describe, it, expect */
'use strict';

jest.dontMock('../DropdownInput');
var React = require('react/addons');
var DropdownInput = require('../DropdownInput');
var ReactBootstrap = require('react-bootstrap');
var TestUtils = React.addons.TestUtils;

describe('DropdownInput', function() {

  var names = ['Aab', 'abcd', 'Cde', 'Def', 'Deb', 'Eabc'];
  var menuClassName = 'jest-test';
  var id = 'test-id';
  var element = (<DropdownInput id={id} options={names} menuClassName={menuClassName}/>);
  var result;

  beforeEach(function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(element);
    result = shallowRenderer.getRenderOutput();
  });

  it('contains the right components', function() {
    // there should be one Input component and one DropdownMenu component
    // for now, assume in that order - TODO: generalize
    var child0 = result.props.children[0];
    var child1 = result.props.children[1];
    expect(child0.type).toEqual(ReactBootstrap.Input);
    expect(child1.type).toEqual(ReactBootstrap.DropdownMenu);
    // also check the dropdown menu has been passed the right class name
    expect(child1.props.className).toEqual(menuClassName);
  });

  it('contains the right menu items', function() {
    var child1 = result.props.children[1];
    var child1props = child1.props.children[0]; // not very general
    expect(child1props[0].props.children).toContain(names[0]);
  });

});
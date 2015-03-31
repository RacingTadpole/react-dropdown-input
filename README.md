[![npm package](https://img.shields.io/npm/v/react-dropdown-input.svg?style=flat-square)](https://www.npmjs.org/package/react-dropdown-input)

React-Dropdown-Input
====================

React-dropdown-input displays a "combobox" for [React](http://facebook.github.io/react/). 
More explicitly, it shows a text input box; once the user starts to type, a dropdown menu
opens with matching options.  The user can choose one of those options either by clicking one,
or by using the arrow keys and hitting Enter.

It is styled with bootstrap, using the [React-Bootstrap](http://react-bootstrap.github.io/) package; it actually displays a `ReactBootstrap.Input` element 
with a `ReactBootstrap.DropdownMenu` of possible options.

## Demo

[http://racingtadpole.github.io/react-dropdown-input/](http://racingtadpole.github.io/react-dropdown-input/)

## Installation

    npm install react-dropdown-input --save

## Sample Usage
 
    var searchNames = ['Sydney', 'Melbourne', 'Brisbane', 
        'Adelaide', 'Perth', 'Hobart'];
    //...
    <DropdownInput 
        options={searchNames}
        defaultValue={this.props.initialValue}
        menuClassName='dropdown-input'
        onSelect={this.handleSelectName}
        placeholder='Search...'
    >
    </DropdownInput>

## In more detail...

The options are simply passed as a javascript array (or [immutablejs](http://facebook.github.io/immutable-js/) object)
to the `options` prop.

Supply one or both of these callbacks: `onSelect` & `onChange`.

- `onSelect` fires when an option is clicked, or when Enter is pressed.
   It passes the object:

        { value: input text,
          index: option index, or -1 if user entered their own text and pressed Enter
        }
- `onChange` fires whenever the input text value changes, either due to a click or typing.
   It passes the object:

        { value: input text }

Other props you can pass:

- `filter`: a function that determines which options to show, given the input text
         (see `defaultFilter` in the code for the default)
- `menuClassName`: a class for the menu, which you need for the css styling below;
         eg. 'dropdown-input'.

You can also pass `<DropdownInput>` all the properties that `<ReactBootstrap.Input>` allows,
eg. `ButtonAfter`.

IMPORTANT NOTE
--------------

You need to turn off Bootstrap's hover highlighting css for this element;
we do it manually using the active class instead.  You may also need to re-enable
the hover highlighting on the active class.  Eg. in sass, add:

    .dropdown-input .dropdown-menu > li > a {
      &:hover,
      &:focus {
        color: $dropdown-link-color;
        background-color: $dropdown-bg;
      }
    }
    .dropdown-input .dropdown-menu > .active > a {
      &:hover,
      &:focus {
        text-decoration: none;
        color: $dropdown-link-hover-color;
        background-color: $dropdown-link-hover-bg;
      }
    }

## Release History

* 0.1.0 Initial release
* 0.1.1 Point to js (not jsx), update README

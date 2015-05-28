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

[http://racingtadpole.github.io/react-dropdown-input/example/](http://racingtadpole.github.io/react-dropdown-input/example/)

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
    />

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
  (see `defaultFilter` in the code for the default).
- `menuClassName`: a class for the menu, which you need for the css styling below;
  eg. 'dropdown-input'.
- `max`: the maximum number of options to display.
- `maxText`: text of a disabled MenuItem to show at the end of a list, if the max is exceeded
  replaces '#' with the number not shown; defaults to '+# more not shown'.

You can also pass `<DropdownInput>` all the properties that `<ReactBootstrap.Input>` allows,
eg. `ButtonAfter`.

IMPORTANT NOTE ABOUT CSS
------------------------

You need to turn off Bootstrap's hover highlighting css for this element;
we do it manually using the active class instead.  You may also need to re-enable
the hover highlighting on the active class.  Eg. in sass, add this:

    .dropdown-input.dropdown-menu > li > a {
      &:hover,
      &:focus {
        color: $dropdown-link-color;  // #333
        background-color: $dropdown-bg; // #fff
      }
    }
    .dropdown-input.dropdown-menu > .active > a {
      &:hover,
      &:focus {
        text-decoration: none;
        color: $dropdown-link-hover-color;  // #fff
        background-color: $dropdown-link-hover-bg;  // #337ab7
      }
    }

If you're showing `maxText`, you may also want to make sure it can't be selected too:

    .dropdown-input.dropdown-menu>.active.disabled>a {
      text-decoration: none;
      color: $dropdown-link-disabled-color; // #777
      background-color: $dropdown-bg; // #fff
    }

## Release History

* 0.1.0  Initial release
* 0.1.1  Point to js (not jsx), update README
* 0.1.2  Update example
* 0.1.3  Align package.json version number with git tag
* 0.1.4  Added maxText property
* 0.1.5  Added eslint to dev
* 0.1.6  Corrected number not shown
* 0.1.7  Don't pass options and menuClassName props through to Input
* 0.1.8  Added working tests using jest
* 0.1.9  Use self-closing tag in ReadMe
* 0.1.10 Remove extra comments, rename var as DropdownInput
* 0.1.11 Prevent form submission if open

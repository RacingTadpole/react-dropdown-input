//
// main.js
//
'use strict';

var React = require('react');
var ChooseCity = require('./ChooseCity');

var names = [
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Adelaide',
  'Gold Coast',
  'Newcastle',
  'Canberra',
  'Sunshine Coast',
  'Wollongong',
  'Hobart',
  'Geelong',
  'Townsville',
  'Cairns',
  'Darwin',
  'Toowoomba',
  'Ballarat',
  'Bendigo',
  'Launceston',
  'Albury-Wodonga',
  'Mackay',
  'Rockhampton',
  'Bundaberg',
  'Bunbury',
  'Coffs Harbour',
  'Wagga Wagga',
  'Hervey Bay',
  'Mildura',
  'Shepparton',
  'Gladstone',
  'Port Macquarie',
  'Tamworth',
  'Traralgon',
  'Orange',
  'Geraldton',
  'Bowral',
  'Dubbo',
  'Nowra',
  'Bathurst',
  'Warrnambool',
  'Kalgoorlie',
  'Busselton',
  'Albany',
  'Warragul',
  'Devonport'
].sort();

React.render(
  <div className='container'>
    <div className='row'>
      <div className='col-md-6 col-md-offset-3'>
        <h1>Welcome</h1>
        <p>Please choose a city</p>
        <ChooseCity options={names} max={12}/>
        <a className='pull-right' href='https://github.com/RacingTadpole/react-dropdown-input/'>View on Github</a>
      </div>
    </div>
  </div>
  , document.getElementById('example')
);

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import d from './data/monsters.json';
import Oreki from './App';
import './index.css';

const orekiElem = window.document.querySelector('oreki');


window.console.debug(JSON.stringify(d));

ReactDOM.render(
  <Oreki />,
  orekiElem,
);

if (module.hot) {
  module.hot.accept();
}

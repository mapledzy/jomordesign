import React from 'react';
import ReactDOM from 'react-dom';

import Oreki from './App';

import './index.css';

const orekiElem = window.document.querySelector('oreki');

ReactDOM.render(
  <Oreki />,
  orekiElem,
);

if (module.hot) {
  module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import Monster from './monster/monster';

import './index.css';

ReactDOM.render(
  <Monster />,
  window.document.querySelector('oreki'),
);

if (module.hot) {
  module.hot.accept();
}

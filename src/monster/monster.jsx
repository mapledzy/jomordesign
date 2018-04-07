import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import datas from '../data/monsters.json';

const monsters = datas.data.monster;

class Monster extends Component {
  constructor(...agrs) {
    super(...agrs);

    this.monsters = monsters;
    this.list = Object.keys(monsters);
    window.console.dir(this.monsters);
  }

  render() {
    return (
      this.list.map(o => (
        <div key={o}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">{o}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              {this.monsters[o]['0'].monster_name}
            </Panel.Body>
          </Panel>
        </div>
      ))
    );
  }
}

export default Monster;

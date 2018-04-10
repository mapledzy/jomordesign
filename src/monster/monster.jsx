import React, { Component } from 'react';

import datas from '../data/monsters.json';
import Unit from './unit/unit';

const monsters = datas.data.monster;

class Monster extends Component {
  constructor(...agrs) {
    super(...agrs);

    this.monsters = monsters;
    this.list = Object.keys(monsters);
    // window.console.dir(this.monsters);
  }

  render() {
    const elem = this.list.map(monsterGroup => (
      <div
        key={monsterGroup}
        id={monsterGroup}
        style={{ width: '800px', margin: '0 auto', display: monsterGroup === '暴走安徒恩(旧版数据)' ? 'none' : '' }}
      >
        <h1>{monsterGroup}</h1>
        {
          this.monsters[monsterGroup].map(u => (
            <Unit key={`${monsterGroup}-${u.id}-${u.name}`} unit={u} />
          ))
        }
      </div >
    ));
    return (
      elem
    );
  }
}

export default Monster;

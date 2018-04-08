import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

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
    const elem = this.list.map(o => (
      <div key={o}>
        <h3>{o}</h3>
        <Table striped bordered condensed>

          <thead>
            <tr>
              <th>#</th>
              <th>名称</th>
              <th>Lv</th>
              <th>防御</th>
              <th>火性</th>
              <th>冰性</th>
              <th>光性</th>
              <th>暗性</th>
            </tr>
          </thead>

          <tbody>

            {
              this.monsters[o].map((i, x) => (
                <tr key={`${o}-${i.monster_name}-${i.id}`}>
                  <td>{x}</td>
                  <td>
                    {i.monster_name}
                  </td>
                  <td>{i.level}</td>
                  <td>{i.defense}</td>
                  <td>{i.fire_attr_resistance}</td>
                  <td>{i.ice_attr_resistance}</td>
                  <td>{i.light_attr_resistance}</td>
                  <td>{i.dark_attr_resistance}</td>
                </tr>
              ))
            }

          </tbody>
        </Table>
      </div>
    ));
    return (
      elem
    );
  }
}

export default Monster;

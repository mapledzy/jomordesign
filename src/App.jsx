import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import ajax from './ajax';

import Monster from './monster/monster';

class Oreki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'hello,world!!!',
    };
  }

  // onAddressSelect(pIndex, cIndex, aIndex) {
  //   const { data } = this.state;
  //   const address = data[pIndex].name
  //     + data[pIndex].city[cIndex].name
  //     + data[pIndex].city[cIndex].area[aIndex];
  //   // console.log(`address: ----->  ${address}`);
  //   this.address = address;
  // }

  render() {
    return (
      <div>
        <Button>{this.state.data}</Button>
        <Monster />
      </div>
    );
  }
}

export default Oreki;

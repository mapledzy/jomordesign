import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ajax from './ajax';

class Oreki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['hello,world!!!'],
    };
  }

  onAddressSelect(pIndex, cIndex, aIndex) {
    const data = this.getData();
    const address = data[pIndex].name
      + data[pIndex].city[cIndex].name
      + data[pIndex].city[cIndex].area[aIndex];
    // console.log(`address: ----->  ${address}`);
    this.address = address;
  }

  getData = () => this.state.data


  render() {
    return (
      <div>
        <h1>{this.state.data[0]}</h1>
        <Button>getData</Button>
      </div>
    );
  }
}

export default Oreki;

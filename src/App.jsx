import React, { Component } from 'react';

class Oreki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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

  getData() {
    return this.state.data;
  }

  render() {
    return (
      <div>
        {this.state.data[0]}
      </div>
    );
  }
}

export default Oreki;

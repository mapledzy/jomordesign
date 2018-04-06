import React from 'react';

class Oreki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'lorem inpsdsa',
    };
  }

  render() {
    return (
      <div>
        {this.state.a}
      </div>
    );
  }
}

export default Oreki;

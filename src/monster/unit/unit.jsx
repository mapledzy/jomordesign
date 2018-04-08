import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './unit.css';

class Unit extends Component {
  // static defaultProps = {
  //   unit: {},
  // }

  // static get propTypes() {
  //   return {
  //     unit: PropTypes.array,
  //   };
  // }

  constructor(props) {
    super(props);

    this.unit = this.props.unit;
  }

  render() {
    return (
      <div className="unit-wrap">
        <div className="unit-img">
          <img src={`http://tools.colg.cn${this.unit.picture}`} alt={`${this.unit.monster_name}-图片`} />
        </div>
        <div className="unit-table">
          <table>
            <caption>{this.unit.monster_name}</caption>
            <tbody>

              <tr className="table-title">
                <th colSpan="2">血量</th>
                <th colSpan="2">防御力</th>
              </tr>
              <tr>
                <td colSpan="2">{this.unit.blood}</td>
                <td colSpan="2">{this.unit.defense}</td>
              </tr>

              <tr className="table-title">
                <th>火抗</th>
                <th>冰抗</th>
                <th>光抗</th>
                <th>暗抗</th>
              </tr>
              <tr>
                <td>{this.unit.fire_attr_resistance}</td>
                <td>{this.unit.ice_attr_resistance}</td>
                <td>{this.unit.light_attr_resistance}</td>
                <td>{this.unit.dark_attr_resistance}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div >
    );
  }
}

export default Unit;

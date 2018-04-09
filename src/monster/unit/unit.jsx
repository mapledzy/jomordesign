import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import './unit.css';

class Unit extends Component {
  static defaultProps = {
    unit: {
      blood: 'Unknown',
      dark_attr_resistance: NaN,
      defense: NaN,
      fire_attr_resistance: NaN,
      ice_attr_resistance: NaN,
      id: NaN,
      injury_reduce_rate: 'Unknown',
      level: NaN,
      light_attr_resistance: NaN,
      monster_name: 'Unknown',
      picture: 'Unknown',
      sub_id: NaN,
      type: 'Unknown',
    },
  };

  static get propTypes() {
    return {
      unit: PropTypes.shape({
        blood: PropTypes.string,
        dark_attr_resistance: PropTypes.number,
        defense: PropTypes.number,
        fire_attr_resistance: PropTypes.number,
        ice_attr_resistance: PropTypes.number,
        id: PropTypes.number,
        injury_reduce_rate: PropTypes.string,
        level: PropTypes.number,
        light_attr_resistance: PropTypes.number,
        monster_name: PropTypes.string,
        picture: PropTypes.string,
        sub_id: PropTypes.number,
        type: PropTypes.string,
      }),
    };
  }

  constructor(props) {
    super(props);

    this.unit = this.props.unit;
  }

  render() {
    return (
      <div className="unit-wrap">

        <LazyLoad offsetVertical={2000} className="unit-img">
          <img src={`http://tools.colg.cn${this.unit.picture}`} alt={`${this.unit.monster_name}-图片`} />
        </LazyLoad>

        <div className="unit-table">
          <table>
            <caption>
              {this.unit.monster_name} - 等级: {this.unit.level}
            </caption>
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

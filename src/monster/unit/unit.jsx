import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import './unit.css';

function arabiSimplified(Num) {
  for (let i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(',', '');// 替换Num中的“,”
    Num = Num.replace(' ', '');// 替换Num中的空格
  }
  if (isNaN(Num)) { // 验证输入的字符是否为数字
    // alert("请检查小写金额是否正确");
    return;
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  const part = String(Num).split('.');
  let newchar = '';
  // 小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 11) {
      // alert("位数过大，无法计算");
      return;
    }// 若数量超过拾亿单位，提示
    let tmpnewchar = '';
    const perchar = part[0].charAt(i);
    switch (perchar) {
      case '0': tmpnewchar = `0${tmpnewchar}`; break;
      case '1': tmpnewchar = `1${tmpnewchar}`; break;
      case '2': tmpnewchar = `2${tmpnewchar}`; break;
      case '3': tmpnewchar = `3${tmpnewchar}`; break;
      case '4': tmpnewchar = `4${tmpnewchar}`; break;
      case '5': tmpnewchar = `5${tmpnewchar}`; break;
      case '6': tmpnewchar = `6${tmpnewchar}`; break;
      case '7': tmpnewchar = `7${tmpnewchar}`; break;
      case '8': tmpnewchar = `8${tmpnewchar}`; break;
      case '9': tmpnewchar = `9${tmpnewchar}`; break;

      default:
        break;
    }
    switch (part[0].length - i - 1) {
      case 0: break;
      case 1: if (perchar != 0) tmpnewchar += ''; break;
      case 2: if (perchar != 0) tmpnewchar += ''; break;
      case 3: if (perchar != 0) tmpnewchar += ''; break;
      case 4: tmpnewchar += '万'; break;
      case 5: if (perchar != 0) tmpnewchar += ''; break;
      case 6: if (perchar != 0) tmpnewchar += ''; break;
      case 7: if (perchar != 0) tmpnewchar += ''; break;
      case 8: tmpnewchar += '亿'; break;
      case 9: tmpnewchar += ''; break;
      case 10: tmpnewchar += ''; break;

      default:
        break;
    }
    newchar = tmpnewchar + newchar;
  }
  // 替换所有无用汉字，直到没有此类无用的数字为止
  while (newchar.search('零零') != -1 || newchar.search('零亿') != -1 || newchar.search('亿万') != -1 || newchar.search('零万') != -1) {
    newchar = newchar.replace('零亿', '亿');
    newchar = newchar.replace('亿万', '亿');
    newchar = newchar.replace('零万', '万');
    newchar = newchar.replace('零零', '零');
  }
  // 替换以“一十”开头的，为“十”
  if (newchar.indexOf('一十') == 0) {
    newchar = newchar.substr(1);
  }
  // 替换以“零”结尾的，为“”
  if (newchar.lastIndexOf('零') == newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1);
  }
  newchar = newchar.substring(0, newchar.length - 4);
  return newchar;
}

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

        <div className="unit-img">
          <LazyLoad offsetVertical={2000} className="unit-img">
            <img src={require(`.${this.unit.picture}`)} alt={`${this.unit.monster_name}-图片`} />
          </LazyLoad>
        </div>

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
                <td colSpan="2">{arabiSimplified(this.unit.blood)}</td>
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

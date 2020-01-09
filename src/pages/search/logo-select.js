import React, { Component } from 'react';

import './index.less';

class LogoSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logos: [
        require('../../images/360_logo.png'),
        require('../../images/baidu_logo.png'),
        require('../../images/sougou_logo.png')
      ],
      selectIndex: 1,
      showLogo: false
    }
  }

  // 显示logo列表
  showLogoList = () => {
    this.setState({
      showLogo: true
    })
  }

  // 点击空白地方收起 logo 列表
  hideLogoList = () => {
    this.setState({
      showLogo: false
    })
  }

  // 处理logo 选择
  handleLogoSelect = (e) => {
    const index = parseInt(e.target.getAttribute('data-index'), 10) // 十进制
    const { onLogoChange } = this.props
    this.setState({
      selectIndex: index,
      showLogo: false,
    }, () => {
      // 这里立即调用函数， 就能立即获得最新 state 的变化值
      onLogoChange(index)
    })

  }

  render() {
    const {logos, selectIndex, showLogo} = this.state;
    const Li = logos.map((logo, index) => {
      return (
        <div className="logo-list-item" key={index}>
          <img onClick={this.handleLogoSelect} data-index={index} src={logo} alt="logo"/>
        </div>
      )
    })

    return (
      <div className="logo-panel">
        <div className="logo-display">
          <img src={logos[selectIndex]} alt="logo"/>
          <span className={showLogo ? "logo-select-arrow is-top" : "logo-select-arrow"} onClick={this.showLogoList}></span>
        </div>
        <div className="logo-list" style={{display: showLogo ? 'block': 'none'}}>
          {/* 蒙层，为了点击空白地方收起 */}
          <div className="logo-list-mask" onClick={this.hideLogoList}></div>
          {Li}
        </div>
      </div>
    );
  }
}
 
export default LogoSelect;
import React, { Component } from 'react';
import {Layout} from 'antd';

import './index.less';

const {Footer} = Layout

class MainFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    }
  }
  // 组件渲染后开始循环执行tick函数
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  // 组件将要死亡时清除计时器，不清除也可以
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick = () => {
    const {timer} = this.state;
    this.setState({
      timer: timer + 1
    })
  }

  render() {
    const {timer} = this.state;
    return ( 
      <Footer className="footer">
        <div className="text">
          <div>
            <span>© 2017-2018 仁兄，仁者无敌</span>
            <span className="stay">
              您已在小窝里逗留了
              <span className="time">{timer}</span>
              秒
            </span>
          </div>
        </div>
      </Footer>
     );
  }
}
 
export default MainFooter;
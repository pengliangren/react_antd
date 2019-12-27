import React, { Component } from 'react';
import {Layout, Icon, Menu} from 'antd';
import {Link} from 'react-router-dom';
import * as screenfull from 'screenfull';

import './index.less';

const {Header} = Layout;
const {SubMenu} = Menu

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    this.setState({
      username: 'My Dear Peng'
    })
  }

  screenFull = () => {
    if (screenfull.isEnabled) {
      // screenfull.request(); // 这个方法只会全屏， 再次点击不会变回来
      screenfull.toggle(); // 这个方法点击全屏，再次点击会变回来
    }
  }
  render() {
    return ( 
      <Header className="header">
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <Menu mode="horizontal" className="logOut">
          <SubMenu
            title = {
              <div className="user-name">
                <Icon type="user" />
                <div className="name">{this.state.username}</div>
              </div>
            }
          >
            <Menu.Item>
              {/* 这里加了一个replace 可以去掉警告 */}
              <Link to="/login">退出</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <Icon className="screenFull" type="arrows-alt" onClick={this.screenFull} />
      </Header>
     );
  }
}
 
export default MainHeader;
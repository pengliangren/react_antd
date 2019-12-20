import React, { Component } from 'react';
import { Menu, Icon, Switch, Layout} from 'antd';
import { NavLink } from 'react-router-dom'
import allMenu from '@/utils/menuConfig'

import './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentKey: '',
      mode: 'inline',
      theme: 'dark',
      collapsed: false
    }
  }

  UNSAFE_componentWillMount() {
    // 把 # 或者 以 ？后面跟着任意字符 结尾的 全局匹配，替换为空， 防止 #/city?a=1&b=3
    let pathname = window.location.hash;
    console.log(pathname)
  }

  // 菜单渲染，箭头函数，绑定 this 指向
  renderMenu = (data) => {
    return data.map((subMenu) => {
      if (subMenu.children && subMenu.children.length) {
        return (
          <SubMenu
            key = {subMenu.url}
            title = {
              <span>
                <Icon type={subMenu.icon}/>
                <span>{subMenu.name}</span>
              </span>
            }
          >
            {/* {this.renderMenu(subMenu.children)} */}
            {
              subMenu.children.map((menu) => {
                return (
                  <Menu.Item key={menu.url}>
                    <NavLink to={`/${menu.url}`}>{menu.name}</NavLink>
                  </Menu.Item>
                )
              })
            }
          </SubMenu>
        )
      }
      
      return (
        <Menu.Item key={subMenu.url} title={subMenu.name}>
          <NavLink to={`/${subMenu.url}`}>
            <Icon type={subMenu.icon} />
            <span className="nav-text">{subMenu.name}</span>
          </NavLink>
        </Menu.Item>
      )})
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() { 
    const { theme } = this.state;
    return (
      <Sider className="navLeft-container" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        { 
          theme === 'light' ? (
            <a
              href="https://github.com/MuYunyun/react-antd-demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="github" className="github" />
            </a>
          ) : (
            <a
              href="https://github.com/MuYunyun/react-antd-demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="github" className="github white" />
            </a>
          )
        }
        {theme === 'light' ? (
          <span className="author">仁兄</span>
        ) : (
          <span className="author white">仁兄</span>
        )}
        <Menu className="menu"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub2']}
          // selectedKeys = {[selectedKeys]}
          mode= {this.state.mode}
          theme= {this.state.theme}
        >
          {this.renderMenu(allMenu)}
        </Menu>
        <div className="switch">
          <Switch
            checked={theme === 'dark'}
            onChange={this.changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
      </Sider>
     );
  }
}
 
export default NavLeft;
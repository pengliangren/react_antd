import React, { Component } from 'react';
import { Menu, Icon, Switch, Layout} from 'antd';
import { NavLink } from 'react-router-dom';
import allMenu from '@/utils/menuConfig';
import {connect} from 'react-redux';
import { changeMenuName, changeCollapsed } from '@/components/header/store/actions';
import {withRouter} from 'react-router-dom'

import './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey:'',
      // mode: 'inline',
      theme: 'dark',
      openKeys: [],  // 初始展开的项
      rootSubmenuKeys: [] // 所有submenu 的keys
      // collapsed: false
    }
  }

  UNSAFE_componentWillMount() {

    // 把 # 或者 以 ？后面跟着任意字符 结尾的 全局匹配，替换为空， 防止 #/city?a=1&b=3
    // let selectedKey = window.location.hash.replace(/#|\?.*$/g, '').split('/')[1];
    // console.log(selectedKey)
    // this.setState({
    //   selectedKey
    // })

    // 注意这里想要 获取  this.props.localtion   需要 withRouter 把history、location、match 传到 this.props上
    let selectedKey = this.props.history.location.pathname.replace(/#|\?.*$/g, '').split('/')[1]
    // this.setState({
    //   selectedKey
    // })

    let openKey = '';
    let subMenuKeys = [];
    let openKeys = []
    for (const menuObj of allMenu) {
      if (menuObj.children) {
        // 如果有二次列表，
        subMenuKeys.push(menuObj.url)
        for (const menuList of menuObj.children) {
          if (menuList.url === selectedKey) {
            openKey = menuObj.url // 注意  这里默认展开的项， 是当前选中的url的父级的url
            openKeys.push(openKey)
            break
          }
        }
      }
    }
    this.setState({
      rootSubmenuKeys: subMenuKeys,
      openKeys,
      selectedKey
    })
  }

  // 子菜单点击
  handleClick = ({item, key}) => {
    // console.log(item.props.title, key)
    this.setState({
      selectedKey: key
    })
    this.props.changeMenu(item.props.title)
  }

  // 默认只展开当前父级菜单，点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
  openChange = (openKey) => {
    const {openKeys, rootSubmenuKeys} = this.state;
    // 这里的代码跟下面的代码是一样的，容易理解些
    // function findKey(key) {
    //   return openKeys.indexOf(key) === -1
    // }
    // const latestOpenKey = openKey.find(findKey)

    // 表示从 openKey 数组中查找， 满足条件的第一个元素，  
    const latestOpenKey = openKey.find(key => openKeys.indexOf(key) === -1);
    // console.log(openKeys)
    // console.log(openKey)
    // console.log(latestOpenKey)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: openKey
      })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
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
              // 这里因为二级是没有icon 的，所以如果以上面的 方法写的话会报错，找不到icon的 type
              subMenu.children.map((menu) => {
                return (
                  <Menu.Item key={menu.url} title={menu.name}>
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
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { theme, selectedKey, openKeys } = this.state;
    
    // // 初始展开的 SubMenu 菜单项 key 数组
    // let openKey = '';
    // for (const menuObj of allMenu) {
    //   if (menuObj.children) {
    //     for (const menuList of menuObj.children) {
    //       if (menuList.url === selectedKey) {
    //         openKey = menuObj.url // 注意  这里默认展开的项， 是当前选中的url的父级的url
    //         break
    //       }
    //     }
    //   }
    // }

    return (
      <Sider className="navLeft-container" collapsible collapsed={this.props.collapsed} onCollapse={this.props.toggle}>
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
          defaultOpenKeys={openKeys}
          openKeys = {openKeys}
          selectedKeys = {[selectedKey]}
          onOpenChange = {this.openChange}
          onClick={this.handleClick}
          mode= {this.props.mode}
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

const mapStateToProps = (state) => {
  const {header} = state;
  return {
    collapsed: header.collapsed,
    mode: header.mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    toggle() {
      dispatch(changeCollapsed())
    },
    changeMenu(menuname) {
      dispatch(changeMenuName(menuname))
    }
  })
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(NavLeft));
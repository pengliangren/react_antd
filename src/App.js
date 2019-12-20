import React, { Component } from 'react';

class App extends Component{
  // /**
  //  *  react 浏览器刷新/关闭 拦截
  //  */
  // UNSAFE_componentWillMount () {
  //   // 拦截判断是否离开当前页面
  //   window.addEventListener('beforeunload', this.beforeunload);
  // }
  // UNSAFE_componentWillUnmount () {
  //   // 销毁拦截判断是否离开当前页面
  //   window.removeEventListener('beforeunload', this.beforeunload);
  // }
  // beforeunload = (e) => {
  //   let confirmationMessage = '你确定离开此页面吗?';
  //   (e || window.event).returnValue = confirmationMessage;
  //   return confirmationMessage;
  // }


  // App 作为全部页面的根组件
  render() {
    return (
      <div className="root_container">
        {this.props.children}
      </div>
    )
  }
}

export default App;

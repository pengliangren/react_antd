import React, { Component } from "react";

import "./index.less";

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#666"
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.getRandomColor, 500);

    console.log(this.ref1) 
    console.log(this.ref2.input)  // 这个可以获取子组件中的 ref 真实 dom
  }

  // 组件即将销毁的时候，清除定时器
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRandomColor = () =>{
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    let color = `rgb(${r}, ${g}, ${b})`
    // console.log(color)

    this.setState({
      color: color
    })
  }

  render() {
    const { color } = this.state;
    return (
      <div className="animated flip ani-box">
        <div>
          <a
            href="https://github.com/MuYunyun/react-antd-demo"
            className="welcome animated flip text"
            style={{ color: color }}
          >
            项目地址
          </a>
        </div>
        <img src={require('../../images/face.png')} alt="logo" width="100" className="lastPic" />
        <div className="animated swing discribe">本项目会把平时工作、学习中</div>
        <div className="animated swing discribe">
          遇到的事例抽象成 demo 给展现出来。欢迎{' '}
          <a href="https://github.com/MuYunyun/reactSPA">Star</a>
        </div>

        <div ref={ r => this.ref1 = r}>ref 获取值</div>
        <Name ref = { i => this.ref2 = i} />
      </div>
    );
  }
}

class Name extends Component{
  render() {
    return (
      <div ref={r => this.input =r}>Name, My name is Pengliangren</div>
    )
  }
}

export default Follow;

import React, { Component } from "react";
import { Card } from "antd";

import "./index.less";

// 实现一个 QQ 浏览器的loading  logo
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // react中  尽量不要操作dom 
  componentDidMount() {
    let loadNum = document.querySelector("#loadNum")
    let loading = 0;
    this.timer = setInterval(()=> {
      loading += 10
      if (loading > 100) {
        clearInterval(this.timer)
      } else {
        this.loadingPercent(loading)
        loadNum.innerHTML = loading + "%"
      }
    }, 900)
  }

  // 组件销毁之后，要把定时器清除掉，不然会下面的函数会报错   Cannot read property 'style' of null
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  loadingPercent = (number) => {
    document.querySelector('#clips').style.webkitTransform = "translateY(-"+ (100 - number) +")"
  }
  render() {
    return (
      <div className="loading-container">
        <Card title="QQ 浏览器logo动画">
          <div className="logo-wrap">
            <svg width="90" height="52" viewBox="0 0 180 104"  className="svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <clipPath id="clipPath">
                  <rect x="0" y="0"  width="100" height="100" id="clips" className="anited" />
                </clipPath>
                <path id="guid" fill="none" stroke="#80feff" d="M0.5,23.5c0,14.9,36.9,27,82.5,27s82.5-12.1,82.5-27c0-10.1-38.4-23-84-23S0.5,13.5,0.5,23.5z" />
              </defs>
              <path className="logo" clipPath="url(#clipPath)" fill="#80feff" stroke="#80feff" strokeMiterlimit="10" d="M99.7 86.4c0-7-5.1-12.7-11.9-13.5-.7-8.6-7.9-15.4-16.8-15.4-8.1 0-14.8 5.6-16.5 13.2-1.3-.5-2.6-.8-4-.8-3.9 0-7.3 2-9.3 5C31 71.2 23.7 61.5 23.7 50.1c0-14.5 11.7-26.2 26.2-26.2s26.2 11.7 26.2 26.2c0 2-.2 3-.7 4.8 3.3.8 6.4 2.5 9 5 2.9 2.9 4.6 6.5 5.3 10.2 1.6.4 3.2 1 4.6 1.9 3.6-6.9 5.6-13.7 5.6-22 0-27.6-22.4-50-50-50S0 22.4 0 50s22.1 50 49.7 50H86c8.1-.2 13.7-6.2 13.7-13.6z"></path>
              <path className="logo" fill="none" stroke="#80feff" strokeMiterlimit="10" d="M99.7 86.4c0-7-5.1-12.7-11.9-13.5-.7-8.6-7.9-15.4-16.8-15.4-8.1 0-14.8 5.6-16.5 13.2-1.3-.5-2.6-.8-4-.8-3.9 0-7.3 2-9.3 5C31 71.2 23.7 61.5 23.7 50.1c0-14.5 11.7-26.2 26.2-26.2s26.2 11.7 26.2 26.2c0 2-.2 3-.7 4.8 3.3.8 6.4 2.5 9 5 2.9 2.9 4.6 6.5 5.3 10.2 1.6.4 3.2 1 4.6 1.9 3.6-6.9 5.6-13.7 5.6-22 0-27.6-22.4-50-50-50S0 22.4 0 50s22.1 50 49.7 50H86c8.1-.2 13.7-6.2 13.7-13.6z"></path>
              <path className="stoken" fill="none" stroke="#80feff" d="M131.452.046C151.927 4.75 165 11.932 165 18c0 14.912-36.937 27-82.5 27S0 32.912 0 18C0 12.295 12.219 5.711 31.045 1.054" ></path>
              <circle className="circle" cx="0" cy="0" r="6" fill="#22447d" stroke="#80feff">
                  <animateMotion dur="3s" repeatCount="indefinite">
                    <mpath xlinkHref="#guid"></mpath>
                  </animateMotion>
              </circle>
            </svg>
          </div>
          <div id="loadNum"></div>
        </Card>
      </div>
    );
  }
}

export default Loading;

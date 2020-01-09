import React, { Component } from "react";
import './waterfall';
import imgUrlList from './imgUrlList'

import './index.less';

let waterfall = null;

class waterFall extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    function wf() {
      waterfall = new window.Waterfall({
        number: 20, // 一次性加载的图片个数；必填
        fixWidth: 1400, // 容器 width: 选填：填上后会使 window.resize 失效，fixWidth 属性优先级大于 width 属性
        scrollElem: 'content', // 绑定 scroll 的节点 id，默认为 window
        // width: 1250,             // 容器 width；选填: 默认为浏览器的宽度，(后期考虑可以设置为某个节点的宽度)
        // container: 'waterfall',  // 容器 id；选填：默认为 'waterfall'
      })
  
      waterfall.on('load', () => {
        setTimeout(() => {
          const $waterfall = document.getElementById('waterfall')
          for (let i = 0; i < 25; i++) {
            const img = document.createElement('img')
            img.setAttribute('src', imgUrlList[i])
            img.setAttribute('class', 'waterfall-box')
            $waterfall.appendChild(img)
          }
          waterfall.done() // 同步/异步写法都要加上这句，通知加载完成
        }, 1000)
      })
    }

    this.loadImage(imgUrlList, wf)
  }

  componentWillUnmount() {
    waterfall = null
  }

  // 实现图片预加载
  loadImage = (urlList, callback) => {
    let count = 0
    let completeCount = 0
    for (let i = 0; i < urlList.length; i++) {
      const img = new Image() // 创建一个Image 对象， 实现图片的预下载
      img.src = urlList[i]
      // image对象complete 属性可返回浏览器是否已完成对图像的加载。如果加载完成，则返回 true，否则返回 fasle。
      // 这里是第二次切换左侧菜单的时候进入
      if (img.complete) {
        completeCount++
      } else {
        // eslint-disable-next-line
        img.onload = () => {
          count++
          if (count === urlList.length) {
            callback()
          }
        }
      }
    }

    if (completeCount === urlList.length) {
      callback()
    }
  }

  render() {
    return (
      <div id="waterfall">
        {
          imgUrlList.map((r, index) => {
            return(
              <img src={r} key={index} className="waterfall-box" alt="waterfall-box"/>
            )
          })
        }
      </div>
    );
  }
}

export default waterFall;

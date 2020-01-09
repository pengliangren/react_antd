import React, { Component } from 'react';
import {Icon} from 'antd';
import fetchJsonp from 'fetch-jsonp';
import LogoSelect from './logo-select'

import './index.less';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '', // 关键字
      showList: [], // 搜索列表
      listIndex: 0, // 搜索列表索引
      searchSrcs: [
        'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q=',
        'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=',
        'https://www.sogou.com/web?query='
      ], // 搜索引擎列表
      searchSrc: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' // 默认是百度搜索
    }
  }

  // input 输入框改变的时候
  handleInput = (e) => {
    // 这里有个问题就是，当输入框第一次改变的时候，搜索并未进行，原因在于默认keyword为空，然后 setState 返回为及时，解决方法如下
    //  在setState值后，里面传个回调函数作为参数
    this.setState({
      keyword: e.target.value
    },
    () => {
      // 注意  keyword 一定要在这里获取，才能取到最新值， 不然只能取到第二次触发的时候的值
      const { keyword } = this.state
      // 这里的搜索列表是默认的引擎去搜索的， 默认最多十条
      fetchJsonp(`https://sug.so.360.cn/suggest?word=${keyword}&encodein=utf-8&encodeout=utf-8`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState({
          showList: data.s
        })
      })
    })
  }

  // 清除搜索的时候
  handleClearClick = () => {
    this.setState({
      keyword: '',
      showList: []
    })
    this.input.value = ''; // 通过ref 获得dom节点
  }

  // 点击搜索按钮的时候
  handleSearch = () => {
    const { searchSrc, keyword } = this.state;
    window.location.href = searchSrc + keyword
  }

  // 按下 Enter 键的
  handleKeyEnter = (e) => {
    const { keyCode } = e
    switch(keyCode) {
      case 13:
        this.handleSearch()
        break
      case 38:
        this.selectUpAndDown(e, keyCode)
        break
      case 40:
        this.selectUpAndDown(e, keyCode)
        break
      default:
        break  
    }
  }

  // 上下键选择列表项
  selectUpAndDown = (e, keyCode) => {
    e.preventDefault();
    
    const { showList, keyword, listIndex } = this.state;
    const length = showList.length; // 获取showList 的条数

    // 链式调用 setState
    if (keyCode === 38) { // 上键
      this.setState(
        {
          listIndex: listIndex === 0 ? length - 1 : listIndex - 1 
        },
        () => {
          this.setState(
            {
              keyword: listIndex === 0 ? showList[length - 1] : showList[listIndex - 1] // 如果是第一条按上键，则keyword变为最后一条
            },
            () => {
              this.input.value = this.state.keyword // 这里的 keyword 要重新从state里面获取才能得到最新的
            }
          )
        }
      )
    } else if (keyCode === 40) {
      this.setState(
        {
          listIndex: listIndex === length -1  ? 0 : listIndex + 1
        },
        () => {
          this.setState(
            {
              keyword:listIndex === length - 1  ? showList[0] : showList[listIndex + 1]
            },
            () => {
              this.input.value = this.state.keyword // 这里的 keyword 要重新从state里面获取才能得到最新的
            }
          )
        }
      )
    }
  }

  // 处理鼠标hover
  handleMouseSelect = (e) => {
    const index = parseInt(e.target.getAttribute('data-index'), 10)
    this.setState({
      listIndex: index
    })
  }

  // 处理点击列表
  handleSelectClick = (e) => {
    this.setState(
      {
        keyword: e.target.innerText
      },
      () => {
        const { keyword } = this.state
        this.input.value = keyword // 通过ref 赋值
        setTimeout(() => {
          // 点击列表之后演示 50 毫秒之后去搜索
          this.handleSearch()
        }, 50)
      }
    )
  }

  // 子组件传回来的
  onLogoChange = (index) => {
    const { searchSrcs } = this.state;
    this.setState({
      searchSrc: searchSrcs[index]
    })
  }

  render() {
    const { showList, listIndex } = this.state

    const Li = showList.map((value, index) => (
      <li
        key={index}
        data-index={index}
        className={listIndex === index ? 'is-select' : ''}
        onMouseOver = {this.handleMouseSelect}
        onClick={this.handleSelectClick}
      >
        {value}
      </li>
    ))
    return (
      <div className="search">

        <LogoSelect onLogoChange = {this.onLogoChange}/>

        <div className="search-panel">
          <div className="search-align">
            <div className="search-left">
              <div className="search-box">
                <input 
                  type="text"
                  className="search-input"
                  onChange={this.handleInput}
                  onKeyDown={this.handleKeyEnter}
                  ref={ r => this.input = r}
                />
                <Icon type="close" className="search-clearinput" onClick={this.handleClearClick} />
                {/* <span className="search-clearinput" onClick={this.handleClearClick}>&times;</span> */}
              </div>
              {
                showList.length > 0 ? (
                  <div className="search-list">
                    <ul className="search-ul">
                      {Li}
                    </ul>
                  </div>
                ) : (
                  ''
                )
              }
            </div>
            <button className="search-btn" onClick={this.handleSearch}>搜一下</button>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Search;
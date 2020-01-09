import React, { Component } from 'react';
import ETable from '@/components/ETable';
import SearchBar from '@/components/searchBar'
import { connect } from "react-redux";
import { musicKindList } from '@/utils/config';
import { message } from 'antd';
import { fetchMusicList } from './store/actions'


import './index.less'

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    // 可以直接写这里，也可以写 mapDispatchToPropos 方法里面
    this.props.dispatch(
      fetchMusicList({
         // 默认是热歌版
         method: 'baidu.ting.billboard.billList',
         size: 100,
         type: 2
      })
    )
  }

  onSearch = (params) => {
    // console.log(params)
    this.props.dispatch(
      fetchMusicList({
         // 默认是热歌版
         method: 'baidu.ting.billboard.billList',
         size: 100,
         ...params,
      })
    )
  }

  handleChange = (params) => {
    // console.log(params)
    // 这段代码模拟 筛选作用, 通常是需要重新调用接口的
    // 注意， 这里只能筛选到 歌曲类型， 是因为其他接口不对
    this.props.dispatch(
      fetchMusicList({
         // 默认是热歌版
         method: 'baidu.ting.billboard.billList',
         size: 100,
         ...params
      })
    )
  }

  tableAction = (actionKey, row) => {
    console.log(actionKey, row)
  }

  searchFields = () => {
    return [
      {
        label: '歌曲类型',
        field: 'type',
        initialValue: '2',
        type: 'Select',
        width: 120,
        list: musicKindList.map((ele, index) => {
          return {
            id: index,
            value: ele.value,
            mean: ele.mean
          }
        })
      }
    ]
  }

  // 表头
  tableHeader = () => {
    return [
      {
        dataIndex: 'title',
        title: '歌曲名',
        width: 200
      },
      {
        dataIndex: 'author',
        title: '歌手',
        width: 200
      },
      {
        dataIndex: 'country',
        title: '发行国家',
        width: 200
      },
      {
        dataIndex: 'language',
        title: '语种',
        width: 200
      },
      {
        dataIndex: 'publishtime',
        title: '发行时间',
        width: 200
      },
      {
        dataIndex: 'pic_small',
        title: '歌曲小图片',
        width: 200,
        render: (row) =>{
          return(<img src={row} style={{width: '50px'}} alt=""/>)
        }
      }
    ]
  }

  render() {
    const data = this.props.musicList
    const loading = this.props.loading
    return (
      <div id="wrap">
        <SearchBar
          filterSubmit={this.onSearch} 
          formList={this.searchFields()}
          onChange = {this.handleChange}
        />
        <div className="tableBox">
          <div style={{ paddingTop: '43px'}}>
            <ETable 
              onCtrlClick = {this.tableAction}
              pagination= {true}
              pageSize = {10}
              header = {this.tableHeader()}
              data = {data}
              loading = {loading}
              scroll={{ y: 385 }}
              // action={ row => [
              //   {
              //     key: 'edit',
              //     name: '修改',
              //     color: 'blue',
              //     icon: 'edit'
              //   },
              //   {
              //     key: 'delete',
              //     name: '删除',
              //     color: 'red',
              //     icon: 'delete'
              //   }
              // ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mock = state.mock; // store 里面的mock分类
  return {
    musicList: mock.data,
    loading: mock.loading
  }
}
 
export default connect(mapStateToProps, null)(Music);
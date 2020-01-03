import React, { Component } from "react";
import SearchBar from '@/components/searchBar'
import { musicKindList, languageKindList, publishCountry } from '@/utils/config';
import {FormModal} from '@/components/modalForm';
import { message, Modal, Button } from "antd";
import ETable from '@/components/ETable'
// import { fetchJSONPByGet } from '@/utils/ajax';
import { fetchMusicList } from '@/pages/music/store/actions'
import moment from 'moment';
import { connect } from "react-redux";

import './index.less';

const { confirm } = Modal;

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      addModalShow: false,
      editModalShow: false,
      item: {}, // 当前点击操作按钮所在的行
      // musicList: []
    };
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

  /** 这里是常规的方法获取音乐列表，
   *  我们从 redux 去获取音乐列表数据的时候，以下方法就可以不要了 
   */

  // 获取音乐列表
  // getMusicList = () => {
  //   fetchJSONPByGet('http://tingapi.ting.baidu.com/v1/restserver/ting')({
  //     // 默认是热歌版
  //     method: 'baidu.ting.billboard.billList',
  //     size: 100,
  //     type: 2
  //   }).then((data) => {
  //     console.log(data)
  //     let songArray = []
  //     if (data.song_list) {
  //       for(let i=0; i< data.song_list.length; i++) {
  //         songArray.push({
  //           title: data.song_list[i].title,
  //           author: data.song_list[i].author,
  //           country: data.song_list[i].country,
  //           language: data.song_list[i].language,
  //           publishtime: data.song_list[i].publishtime,
  //         })
  //       }
  //     }
  //     this.setState({
  //       musicList: songArray,
  //       loading: false
  //     })
  //   })
  // }

  // 从 searchBar 获取到的值, 点击搜索按钮获取到的值
  filterSubmit = (params) => {
    console.log(params);
    this.props.dispatch(
      fetchMusicList({
         // 默认是热歌版
         method: 'baidu.ting.billboard.billList',
         size: 100,
         ...params,
      })
    )
  }

  // 表单任一变化的返回值
  handleFormChange = (params) => {
    // console.log('change' + JSON.stringify(value))

    // 这段代码模拟 筛选作用, 通常是需要重新调用接口的
    // 注意， 这里只能筛选到 歌曲类型， 是因为其他接口不对
    console.log(params)
    this.props.dispatch(
      fetchMusicList({
         // 默认是热歌版
         method: 'baidu.ting.billboard.billList',
         size: 100,
         ...params
      })
    )
  }

  // 添加歌曲按钮
  addSong = () => {
    this.setState({
      addModalShow: true
    })
  }

  // 添加音乐弹窗确定按钮
  onOkAdd = (value) => {
    message.success("添加成功")
    this.onCancelAdd()
    console.log(value);
  }

  onCancelAdd = () => {
    this.setState({
      addModalShow: false
    })
  }

  // 编辑弹窗确定按钮
  onOkEdit = (value) => {
    message.success("编辑成功")
    this.onCancelEdit()
    // console.log(value)

    // 这里需要调用保存编辑的接口, 这里只是模拟
    this.props.dispatch( 
      fetchMusicList({
        method: 'baidu.ting.billboard.billList',
        size: 100,
        type: 2,
        ...value
      })
    )
  }

  onCancelEdit = () => {
    this.setState({
      editModalShow: false
    })
  }

  // 这里可以知道点击了是table 的哪一行, 还有按钮的操作类型
  tableAction = (actionKey, row) => {
    console.log(actionKey, row);
    if (actionKey === 'edit') {
      // 如果是编辑按钮， 弹窗编辑弹窗, 并把当前点击的行保存到 state 里面
      this.setState({
        editModalShow: true,
        item: row
      })
    }
  }

  // 这里也可以知道点击了是table 的哪一行， 但是这里是做了限制， 只能前面有单选按钮或者复选框的时候，才会执行这个方法
  // updateSelectedRows = (rows) => {
  //   console.log(rows)
  // }


  searchFormList = () => {
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
      },
      {
        label: '发行国家',
        field: 'country',
        initialValue: '0',
        type: 'Select',
        width: 100,
        list: publishCountry.map((ele, index) => {
          return {
            id: index,
            value: ele.value,
            mean: ele.mean
          }
        })
      },
      {
        label: '歌曲语种',
        field: 'language',
        initialValue: '0',
        type: 'Select',
        width: 100,
        list: languageKindList.map((ele, index) => {
          return {
            id: index,
            value: ele.value,
            mean: ele.mean
          }
        })
      },
      {
        label: '发行时间段',
        field: 'Rang',
        type: 'RangPicker',
      }
    ]
  }

  // 表格头部
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
      }
    ]
  }

  fieldsAdd = () => {
    return [
      {
        label: '歌曲名',
        type: 'input',
        name: 'title',
        options: {
          rules: [
            {
              required: true,
              message: '请输入歌曲名!'
            }
          ]
        }
      },
      {
        label: '歌手名',
        type: 'input',
        name: 'author',
        options: {
          rules: [
            {
              required: true,
              message: '请输入歌手名!'
            }
          ]
        }
      },
      {
        label: '发行国家',
        type: 'select',
        name: 'country',
        options: {
          initialValue: '0',
          rules: [
            {
              required: true,
              message: '请输入发行国家!'
            }
          ]
        },
        list: publishCountry.map((ele, index) => {
          return {
            id: index,
            value: ele.value,
            mean: ele.mean
          }
        })
      },
      {
        label: '歌曲语种',
        type: 'select',
        name: 'language',
        options: {
          rules: [
            {
              required: true,
              message: '请输入歌曲语种!'
            }
          ]
        },
        list: languageKindList.map((ele, index) => {
          return {
            id: index,
            value: ele.value,
            mean: ele.mean
          }
        })
      },
      {
        label: '发行时间',
        type: 'datetime',
        name: 'publishTime',
        options: {
          rules: [
            {
              required: true,
              message: '请输入发行时间!'
            }
          ]
        }
      }
    ]
  }

  fieldsEdit = () => {
    const item = this.state.item;
    return [
      {
        label: '歌曲名',
        type: 'input',
        name: item.title,
        options: {
          initialValue: item.title,
          rules: [
            {
              required: true,
              message: '请输入歌曲名!'
            }
          ]
        }
      },
      {
        label: '歌手名',
        type: 'input',
        name: 'author',
        options: {
          initialValue: item.author,
          rules: [
            {
              required: true,
              message: '请输入歌手名!'
            }
          ]
        }
      },
      {
        label: '发行国家',
        type: 'select',
        name: 'country',
        options: {
          initialValue: item.country,
          rules: [
            {
              required: true,
              message: '请输入发行国家!'
            }
          ]
        },
        list: publishCountry.map((ele, index) => {
          return {
            id: index,
            value: ele.value,
            mean: ele.mean
          }
        })
      },
      {
        label: '歌曲语种',
        type: 'select',
        name: 'language',
        options: {
          initialValue: item.language,
          rules: [
            {
              required: true,
              message: '请输入歌曲语种!'
            }
          ]
        },
        list: languageKindList.map((ele, index) => {
          return {
            id: index,
            value: ele.value,
            mean: ele.mean
          }
        })
      },
      {
        label: '发行时间',
        type: 'datetime',
        name: 'publishTime',
        options: {
          initialValue: moment(item.publishtime),
          rules: [
            {
              required: true,
              message: '请输入发行时间!'
            }
          ]
        }
      }
    ]
  }

  // pageChange = (page) => {
  //   console.log(page)
  // }

  render() {
    const songList = this.props.musicList
    let songArray = []

    if (songList) {
      for(let i=0; i< songList.length; i++) {
        songArray.push({
          title: songList[i].title,
          author: songList[i].author,
          country: songList[i].country,
          language: songList[i].language,
          publishtime: songList[i].publishtime,
        })
      }
    }

    return (
      <div id="music-wrap">
        <SearchBar 
          formList = {this.searchFormList()} 
          filterSubmit={this.filterSubmit}
          onChange = {this.handleFormChange}
          wrappedComponentRef={(form) => this.filterForm = form}
        />

        <div className="tableBox">
          <Button onClick={this.addSong} className="addButton">添加</Button>
          <div style={{ paddingTop: 43 }}>
            <ETable
              onCtrlClick = {this.tableAction}
              // rowSelection="checkbox"
              // updateSelectedRows = {this.updateSelectedRows}
              pagination={true}
              pageSize = {10}
              data = {songArray}
              header = { this.tableHeader()}
              loading={this.props.loading}
              action={ row => [
                {
                  key: 'edit',
                  name: '修改',
                  color: 'blue',
                  icon: 'edit'
                },
                {
                  key: 'delete',
                  name: '删除',
                  color: 'red',
                  icon: 'delete'
                }
              ]}
              scroll={{ y: 385 }}
              // onChange = {this.pageChange}
            />
          </div>
        </div>

        <FormModal 
          modalKey = "add"
          visible = {this.state.addModalShow}
          title = "添加音乐"
          onOk = {this.onOkAdd}
          fields = {this.fieldsAdd()}
          onCancel = {this.onCancelAdd}
          okText="保存"
        />

        <FormModal 
          modalKey = "edit"
          visible = {this.state.editModalShow}
          title = "修改音乐"
          onOk = {this.onOkEdit}
          fields = {this.fieldsEdit()}
          onCancel = {this.onCancelEdit}
          okText="保存"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { music } = state;
  return {
    loading: music.loading,
    musicList: music.data
  }
}

// const mapDispatchToProps = (dispatch) => ({

//     getList(){
//       dispatch(fetchMusicList({
//         method: 'baidu.ting.billboard.billList',
//         size: 100,
//         type: 2
//       }))
//     }
// })

export default connect(mapStateToProps, null)(Music);

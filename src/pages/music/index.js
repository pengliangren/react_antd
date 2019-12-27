import React, { Component } from "react";
import SearchBar from '@/components/searchBar'
import { musicKindList, languageKindList, publishCountry } from '@/utils/config';
import {FormModal} from '@/components/modalForm';
import { message, Modal, Button } from "antd";
// import moment from 'moment';
// import { connect } from "react-redux";

import './index.less';

const { confirm } = Modal;

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      addModalShow: false,
      editModalShow: false
    };
  }

  componentDidMount() {
    console.log(this.filterForm.props.form)
  }

  // 从 searchBar 获取到的值
  filterSubmit = (params) => {
    // console.log(params);
    
  }

  // 表单任一变化的返回值
  handleFormChange = (value) => {
    console.log('change' + JSON.stringify(value))
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
  onOkEdit = () => {
    message.success("编辑成功")
    this.onCancelEdit()
  }

  onCancelEdit = () => {
    this.setState({
      editModalShow: false
    })
  }


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
    return [
      {
        label: '歌曲名',
        type: 'input',
        name: 'title',
        options: {
          initialValue: "243",
          rules: [
            {
              required: true,
              message: '请输入歌曲名!'
            }
          ]
        }
      }
    ]
  }

  render() {
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


export default Music;

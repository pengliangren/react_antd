import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Table, Icon, Tooltip } from 'antd';

import './index.less';

class ETable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      selectedRowKeys: [], // 选中项的key 数组
      selectedRows: [] // 选中项
    }
  }

  UNSAFE_componentWillMount() {
    const {header, action, data} = this.props;

    this.makeColumns(header, action, data)
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.changeProps(props)
  }

  changeProps = (props) => {
    const {header, action, currentPage, data } = props;
    this.setState({
      currentPage
    })

    this.makeColumns(header, action, data)
  }

  makeColumns = (headers, action, data) => {
    // 如果不要需要， 则传 noIndex 为false, 如果序号需要固定，则传 rowIndexFiexed
    this.columns = this.props.noIndex ? [] : [
      {
        dataIndex: 'rowIndex',
        title: '序号',
        width: 70,
        fixed: this.props.rowIndexFixed
      }
    ]

    for (const header of headers) {
      this.columns.push({
        ...header
      })
    }

    if (action) {
      const maxActionCount = Math.max(...data.map(action).map(i => (i ? i.length : 0))) // the number of action
      this.columns.push({
        key: 'x',
        title: '操作',
        width: this.props.scroll ? 230 : maxActionCount * 50 + 10,
        fixed: this.props.fixed,
        render: row => {
          // 操作按钮
          const actions = action(row) // 获取到传过来的操作按钮
          if (!actions) {
            return <div />
          }
          const buttons = actions.map(({ color, name, key, icon, hidden}, index) => {
            return (
              <Tooltip key={index} title={name}>
                <a href="true"
                  key = {key}
                  onClick = {e => {
                    // 阻止默认事件
                    e.preventDefault()
                    // 阻止事件冒泡
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    // 如果父组件通过this.props 传递一个叫 onCtrlClick 的方法， 这调用这个方法把当前的行 和 key 传回去
                    if ('onCtrlClick' in this.props) {
                      this.props.onCtrlClick(key, row)
                    }
                  }}
                  style = {{
                    color,
                    marginRight: 12,
                    display: hidden ? 'none' : 'inline-block',
                    fontSize: 14
                  }}
                >
                  <Icon type={icon}/>
                </a>
              </Tooltip>
            )
          })
          return <div>{buttons}</div>
        }
      })
    }
  }

  // 页码改变的回调
  onPageChangeHandle = (currentPage) => {
    this.setState({
      currentPage
    })
    // 如果父组件通过this.props 传递一个叫 onChange 的方法， 这调用这个方法把 当前的页码传回去
    // 这里的onChange 是表示父组件传过来的方法，可以实现点击页码加载数据的功能
    if ('onChange' in this.props) {
      this.props.onChange(currentPage)
    }
  }

  // 初始化 rowSelection
  initRowSelection = () => {
    let row_Selection = this.props.rowSelection
    // console.log(this.state.selectedRowKeys)
    const rowSelection = {
      type: 'checkbox', // 默认值是复选框 
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    }
    if (row_Selection === false || row_Selection === null) {
      return
    } else if (row_Selection === 'checkbox') {
      rowSelection.type = 'checkbox'
    } else {
      rowSelection.type = 'radio'
    }
    return rowSelection
  }

  // 点击行选中
  onRowClick = (record, index) => {
    // console.log(record, index)
    let row_Selection = this.props.rowSelection
    const selectedRowKeys = [...this.state.selectedRowKeys];
    let selectedRows = this.state.selectedRows // 选中项

    // 当是复选框的时候，
    if (row_Selection === 'checkbox') {
      // 如果选中的是重复的
      if (selectedRowKeys.indexOf(record.key) >= 0) {
        selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        selectedRows.splice(selectedRowKeys.indexOf(record.key), 1); 
      } else {
        // 如果选中的没有重复
        selectedRowKeys.push(record.key);
        selectedRows.push(record); // 保存选中项
      }
      this.setState({
        selectedRowKeys,
        selectedRows
      });
      // 调用父组件方法， 把selectedItem 传回去
      this.props.updateSelectedRows(selectedRows)

    } else {
      // 如果是单选框
      this.setState({
        selectedRowKeys: [record.key], // 注意 selectedRowKeys 表示选中指定项的 key 数组， 需要和 onChange 结合使用
        selectedRows: record
      });

      // 调用父组件方法， 把selectedItem 传回去
      this.props.updateSelectedRows(record)
    }

  }

  // 选中项发生改变的时候回调 单选按钮或者复选按钮时候也可以选中行
  onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys)
    this.setState({
      selectedRowKeys,
      selectedRows
    });

    // 选择发生改变的时候也要传回去
    if (this.props.rowSelection === 'checkbox') {
      this.props.updateSelectedRows(selectedRows)
    } else {
      this.props.updateSelectedRows(...selectedRows)
    }

  }

  render() { 

    return (
      <div className="etable-container">
        <Table 
          rowSelection = {this.props.rowSelection ? this.initRowSelection() : null}
          // rowSelection = {rowSelection}
          scroll={this.props.scroll}
          dataSource = {this.props.data.map((row, i) => ({ // 给每一行都添加key 属性
            ...row,
            rowIndex: i+1,
            key: i +1
          }))}
          columns= {this.columns}
          loading= {this.props.loading}
          pagination= {
            this.props.pagination !== false 
            ? {
                total:this.props.total,
                pageSize: this.props.pageSize, // 每一页条数
                current: this.state.currentPage,
                onChange: this.onPageChangeHandle,
                showTotal: (total, range) => {
                  return(
                    <span className="pageTotal">
                      共<span className="count">{total}</span>条
                    </span>
                  )
                }
              }
            : false  
          }
          onRow = {
            (record,index) => {
              return {
                onClick: () => {
                  // 如果没有单选或者复选，直接return，不往下执行onRowClick 方法
                  if(!this.props.rowSelection){
                    return
                  }
                  this.onRowClick(record, index)
                }
              }
            }
          }
          footer = {this.props.footer}
        />
      </div> 
      
    );
  }
}

ETable.propTypes = {
  pageSize: PropTypes.number,
}

ETable.defaultProps = {
  pageSize: 10, // 默认每页显示的条数
}

export default ETable;
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Form, Select, Checkbox, DatePicker} from 'antd';
import moment from 'moment';

import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  // 提交表单
  handleSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue)
  }

  // 重置按钮
  handleReset = () => {
    // 重置是 antd 的方法
    this.props.form.resetFields()
  }

  // Select.Option 列表封装
  getOptionList = (data) => {
    if (!data) {
      return []
    }
    let options = [] // [<Option value="0" key="all_key">全部</Option>]
    data.map((item, i) => {
      return options.push(<Option value={item.value.toString()} key={item.value.toString()}>{item.mean}</Option>) // 这里是根据列表定义属性来
    })
    return options;
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];

    if (formList && formList.length > 0) {
      // formList.forEach((item, i) => {
      //   let type = item.type; // 表单类型
      //   let label = item.label;
      //   let field = item.field;
      //   let initialValue = item.initialValue;
      //   let placeHolder = item.placeHolder;
      //   let width = item.width;
      //   let multiple = item.multiple; // Select 是否允许多行选择
      // })

      // 可以使用  for of 代替 forEach
      for (const item of formList) {
        let type = item.type; // 表单类型
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue;
        let placeHolder = item.placeHolder;
        let width = item.width;
        let multiple = item.multiple || ''; // Select 是否允许多行选择
        let items = [];
        if (item.list) {
          items = item.list
        }

        if (type === 'Select') {
          const SELECT = (
            <FormItem label={label} key={field}>
              {
                getFieldDecorator([field], {
                  initialValue: initialValue
                })(
                  <Select
                    style={{width: width}}
                    placeHolder= {placeHolder}
                    mode = {multiple}
                  >
                    {this.getOptionList(items)}
                  </Select>
                )
              }
            </FormItem>
          )
          formItemList.push(SELECT)
        }else if (type === 'RangPicker') {
          let RNAGPICKER = (
            <FormItem label={label} key={field}>
              {
                getFieldDecorator([field], {
                  initialValue : [moment('2018/01/01', dateFormat), moment('2019/01/01', dateFormat)]
                })(
                  <RangePicker style={{width: width}}/>
                )
              }
            </FormItem>
          )
          formItemList.push(RNAGPICKER)
        }else if (type === 'Input') {
          const INPUT = (
          <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Input style={{width: width}} type="text" placeholder={placeHolder}/>
              )
            }
          </FormItem>)
          formItemList.push(INPUT)
        } else if (type === 'Checkbox') {
          const CHECKBOX = (
            <FormItem label={label} key={field}>
              {
                getFieldDecorator([field], {

                })(
                  <Checkbox>{label}</Checkbox>
                )
              }
            </FormItem>
          )
          formItemList.push(CHECKBOX)
        } else if (type === 'DatePicker') {
          const DATEPICKER = (
            <FormItem label={label} key={field}>
              {
                getFieldDecorator([field])(
                  <DatePicker style={{width: width}} showTime={true} placeHolder={placeHolder} format={dateFormat} />
                )
              }
            </FormItem>
          )
          formItemList.push(DATEPICKER)
        }
      }
    }
    return formItemList
  }

  render() { 
    return (
      <Form 
        layout="inline" 
        className="search-bar"
      >
        { this.initFormList() }
        <FormItem>
          <Button type="primary" onClick={this.handleReset} className="reset" icon="reload">重置</Button>
          <Button type="primary" onClick={this.handleSubmit} className="search" icon="search">搜索</Button>
        </FormItem>
      </Form>
    );
  }
}

// 要求父组件传递给子组件相关的数据参数类型限制
SearchBar.propTypes = {
  test:PropTypes.string.isRequired
}

// 默认传递参数值
SearchBar.defaultProps = {
  test: '3243'
}

// 进行表单双向数据绑定
export default Form.create({
  name: 'searchBar_controls',
  //  这个只要是修改了其中某一项，都会把这个整个列表的重新返回，上一级组件可以调用 onChange 方法进行获取
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  
  // 这个任一修改的时候会把修改的那一项返回结果
  onValuesChange: (_, value) => {
    // console.log(value);
  }
})(SearchBar);
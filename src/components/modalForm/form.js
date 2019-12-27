import React, { PureComponent } from 'react';
import { Button, Form, Radio, Select, DatePicker, Switch, Input, InputNumber } from 'antd';

import './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class ModForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 提交表单
  handleSubmit = (e) => {
    // 组织默认事件
    e && e.preventDefault();
    // 点击确认按钮 检验表单和获取表单的值，如果校验不通过，则滚动到表单可视区域，所以不需要 getFieldsValue() 去获取表单的值了 
    const { validateFieldsAndScroll, resetFields } = this.props.form;
    const { onOk } = this.props; // 父组件点击ok 的方法
    validateFieldsAndScroll((errors, value) => {
      if (!errors) {
        onOk && onOk(value) // 调用父组件的方法，把value 传回去
        resetFields() // 重置表单
      }
    })
  }

  // 取消按钮
  doCancel = () => {
    // 这里这里的 this.props.form 是因为绑定了 Form.create({}) 就会有的方法
    const { onCancel, form } = this.props;
    onCancel && onCancel();
    form.resetFields() // 重置表单，Form 的方法
  }

  // 默认文字封装
  getTextField = field => (
    <span className="ant-form-text">{field.options && field.options.initialValue}</span>
  )

  // input 输入框封装
  getInputField = (field) => <Input />

  // Number 输入框封装
  getInputNumberField = (field) => (
    <InputNumber 
      step = {field.options.step}
      formatter = {field.options.formatter} // 指定输入框展示值的格式
      style = {{width: field.width || '100%'}}
    />
  )

  // textArea 输入框封装
  getTextAreaField = (field) => (
    <TextArea 
      rows = {field.options.rows || 4}
      disabled = {field.options.disabled}
    />
  )
  
  // Select 输入框封装
  getSelectField = (field) => (
    <Select
      placeholder = {field.options.placeholder || "请选择"}
      style = {{width: field.width || '100%'}}
      disabled = {field.options.disabled}
      multiple = {field.options.multiple} //是否允许多选
    >
      {
        // 注意这里的 {id, value, mean} 参数是根据传过来的定义的，
        field.list && field.list.map(({id, value, mean}) => {
            return (
              <Select.Option id={id.toString()} key={value.toString()} value={value.toString()}>
                {mean}
              </Select.Option>
            )
        })
      }
    </Select>
  )


  // radioGroup 封装
  getRadioGroupField = (field) => (
    <RadioGroup>
      {
        field.list && field.list.map(({key, value}) => (
          <Radio key={key.toString()} value={key.toString}>
            {value}
          </Radio>
        ))
      }
    </RadioGroup> 
  )

  getDateField = (field) => <DatePicker showToday={false} placeholder="请输入日期" />

  getDateTimeField = (field) => (
    <DatePicker showTime format="YYYY-MM-DD" placeholder="请选择时间" showToday={false} />
  )

  getSwitchField = (field) => (
    <Switch
      checkedChildren="开"  // 选中时的内容
      unCheckedChildren="关"
      disabled={field.options.disabled}
      defaultChecked={field.options.initialValue}
    />
  )

  getUploadField = (field) => (
    <Input type="file" ref={field.options.ref} disabled={field.options.disabled} name="patchFile" />
  )

  // 初始化表单
  generateFormFields = () => {
    let fields = this.props.fields; // 从父组件 modal.js 中传过来的
    const formItemLayout = this.props.formItemLayout || {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    }
    const components = []; // 定义放组件的容器 数组

    if (fields && fields.length > 0) {
      for (const field of fields) {
        let component = null;
        // 根据类型判断
        switch(field.type) {
          case 'input':
            component = this.getInputField(field);
            break;
          case 'inputNumber':
            component = this.getInputNumberField(field)
            break;
          case 'select':
            component = this.getSelectField(field)
            break;
          case 'radioGroup':
            component = this.getRadioGroupField(field)
            break;  
          case 'date':
            component = this.getDateField(field)
            break;
          case 'datetime':
            component = this.getDateTimeField(field)
            break;
          case 'switch':
            component = this.getSwitchField(field)
            break;
          case 'upload':
            component = this.getUploadField(field)
            break;  
          case 'textarea':
            component = this.getTextAreaField(field)
            break;                                             
          default:
            component = this.getTextField(field)
            break;
        }
        
        let componentItem = this.generateFormItem({
          formItemLayout,
          component,
          label: field.label,
          name: field.name,
          options: field.options,
          hasFeedBack : field.type === 'input'
        })
        components.push(componentItem)
      }
      const buttons = (
        <FormItem 
          key = "control-buttons"
          wrapperCol = {{
            span: 14,
            offset: 6
          }}
        >
          <div className="buttons">
            {this.props.showCancel && <Button onClick={this.doCancel}>取消</Button>}
            {
              !this.props.noBtn && (
                <Button type="primary" htmlType="submit">
                  {this.props.okText || '确定'}
                </Button>
              )
            }
          </div>
        </FormItem>
      )
      components.push(buttons);
      // 要记得返回components;
      return components;
    }
  }

  generateFormItem = ({formItemLayout, component, label, name, options, hasFeedBack }) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem
        {...formItemLayout}
        key = {name}
        label = {label}
        hasFeedback={hasFeedBack}
      >
        {
          getFieldDecorator([name], options)(component)
        }
      </FormItem>
    )
  }

  render() {
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        { this.generateFormFields() }
      </Form>
    );
  }
}

const ModalForm = Form.create()(ModForm)

export default ModalForm;
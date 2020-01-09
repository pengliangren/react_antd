import React, { Component, Fragment } from 'react';
import { Input } from 'antd';
import { Form, FormItem } from 'daform'

// @Form()
class reform extends Component {
  render() {
    const { form } = this.props
    const { formdata } = form
    return (
      <Fragment>
        <FormItem name="name" label="姓名" initialValue="pengliangren">
          <Input />
        </FormItem>
        <FormItem name="age" label="年龄" initialValue="12">
          <Input />
        </FormItem>
        <pre className="code-background">{JSON.stringify(formdata, null, 2)}</pre>
        <a href="https://github.com/dwd-fe/reForm">one for all 表单方案</a>
      </Fragment>
    )
  }
}

export default Form()(reform)
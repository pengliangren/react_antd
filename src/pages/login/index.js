import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Icon } from 'antd';
import {withRouter} from 'react-router-dom';

import './index.less';

const FormItem = Form.Item;

// 这里是一个无状态组件
const LoginPage = ({form, history}) => {

  // 返回一个弹窗对象， 提示用户名和密码
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '用户名&密码',
      description: '都是: 123',
      duration: 3,
      icon: <Icon type="smile" style={{ color: '#108ee9'}} />
    });
  };

  useEffect(()=>{
    openNotificationWithIcon('info')
  }, [])
    
  const handleSubmit = (e) => {
    console.log(history)
    // 点击确认按钮 检验表单和获取表单的值，如果校验不通过，则滚动到表单可视区域，所以不需要 getFieldsValue() 去获取表单的值了 
    const { getFieldsValue, validateFields, resetFields } = form;
    e.preventDefault();
    const name = getFieldsValue().username;
    const password = getFieldsValue().password;
    if (name === '123' && password === '123') {
      // 表单路由处理
      history.push('/home')
    } else {
      openNotificationWithIcon('info')
      validateFields((errors, value) => {
        // console.log(value)
        if (!errors) {
          resetFields() // 重置表单
        }
      })
    }
  }


  // 使用 Form.create({}) 绑定之后可以获取到这个方法
  const { getFieldDecorator } = form
  return ( 
    <div className="loginpagewrap">
      <div className="box">
        <p>Welcome to the ReactSPA</p>
        <div className="loginWrap">
          <Form onSubmit={handleSubmit}>
            <FormItem>
              {
                getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: '请输入用户名'
                  }]
                })(<Input placeholder="Username: 123"/>)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '请输入密码'
                  }]
                })(<Input placeholder="Password: 123"/>)
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="loginBtn">Login</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
}

// 这里要借助 withRouter 才能获取到 this.props.history
const Login = withRouter(Form.create({})(LoginPage));

export default Login
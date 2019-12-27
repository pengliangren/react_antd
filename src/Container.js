import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from '@/components/header'
import Footer from '@/components/footer'
import NavLeft from '@/components/navLeft'

import '@/style/index.less'; // 引入样式

const { Content } = Layout;

export default class Container extends Component{
  
  render() {
    return (
      <Layout className="containAll" style={{ minHeight: '100vh' }}>
      <NavLeft />
      <Layout className="main-container">
        <Header></Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
    )
  }
}
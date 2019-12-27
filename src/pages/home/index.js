import React, { Component } from 'react';
import { Row } from 'antd';
import Cards from './card';
import ProFinish from './proFinish'
import BuildSiteLog from './buildSiteLog'
import MsgBanner from './msgBanner'
import AccessNum from './accessNum'

import './index.less';

class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return ( 
      <Row gutter={16}>
        <div className="clearfix">
          <Cards />
          <ProFinish />
        </div>
        <div className="clearfix">
          <BuildSiteLog />
          <MsgBanner className="message"/>
          <AccessNum />
        </div>
      </Row>
    );
  }
}
 
export default Home;
import React from 'react';
import {Col, Card} from 'antd';
import EchartsPro from './echartsPro';

const ProFinish = () => (
  <Col span={16}>
    <div className="cloud-box">
      <Card className="no-padding">
        <EchartsPro />
      </Card>
    </div>
  </Col> 
)

export default ProFinish;
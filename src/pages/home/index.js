import React, { Component } from 'react';
import { Row } from 'antd';
import Cards from './card';

import './index.less';

class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return ( 
      <Row gutter={16}>
        <div>
          <Cards />
        </div>
        <div>
          5345345
        </div>
      </Row>
    );
  }
}
 
export default Home;
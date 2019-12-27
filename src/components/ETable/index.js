import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Table, Icon, Tooltip} from 'antd';

import './index.less';

class ETable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  UNSAFE_componentWillMount() {

  }

  UNSAFE_componentWillReceiveProps(props) {
    this.changeProps(props)
  }

  changeProps = (props) => {

  }

  render() { 
    return (
      <div className="etable-container">
        <Table 
          rowSelection = {this.props.rowSelection}
          scroll={this.props.scroll}
          dataSource = {this.props.dataSource.map((row, i) => ({ ...row, rowIndex: i+1, key:i+1 }))}
        />
      </div> 
      
    );
  }
}

ETable.propTypes = {
  pageSize: PropTypes.number
}

ETable.defaultProps = {
  pageSize: 20
} 

export default ETable;
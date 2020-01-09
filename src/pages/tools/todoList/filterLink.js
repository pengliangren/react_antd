import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setVisibility } from '@/pages/tools/todoList/store/actions'

import './index.less'

class FilterLink extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.changeFilter(this.props.filter); // 调用dispatch action
  }
  render() {
    const { name, filter, setVisibility } = this.props;
    return (
      <div className="todo-tab_item">
        <a href="true"
          style={{ color: setVisibility.filter === filter ? '#f01414' : '#4d555d' }}
          onClick = {this.onClick}
        >
          {name}
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    setVisibility: state.setVisibility
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    changeFilter(filter) {
      dispatch(setVisibility({
        filter: filter
      }))
    }
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);
import React, { Component } from 'react';
import { Checkbox, Button, Input } from 'antd';
import FilterLink from './filterLink';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '@/pages/tools/todoList/store/actions'

import './index.less';

let nextTodoId = 0

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  submit = (e) => {
    e.preventDefault();
    // 这里的input 值，可以用ref 来获取，也可以不用 trim() 去掉去除字符串两边的空白
    if (this.state.value.trim() === '') {
      return
    }
    this.props.dispatch(
      addTodo({
        id: nextTodoId ++,
        text: this.state.value,
        type: "ADD_TODO"
      })
    )
    this.setState({
      value: ''
    })
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleChange = (e) => {
    // console.log(e.target.checked)
  }

  handleCheckboxClick = (todo) => {
    // console.log(todo)
    this.props.dispatch(
      toggleTodo({
        id: todo.id,
        type: 'TOGGLE_TODO'
      })
    )
  }

  handleDelete = (todo) => {
    this.props.dispatch(
      deleteTodo({
        id: todo.id,
        type: 'DEL_TODO'
      })
    )
  }

  render() {
    const {todoList, setVisibility } = this.props;
    let todos = todoList;
    if (setVisibility.filter === 'SHOW_COMPLETED') { // 显示已完成任务
      todos = todoList.filter(t => t.completed)
    } else if (setVisibility.filter === 'SHOW_ACTIVE') {
      todos = todoList.filter( t => !t.completed)
    }
    return (
      <div className="todo-box">
        <div className="todo-innerBox">
          <div className="todo-tab">
            <FilterLink filter="SHOW_ALL" name="全部任务"/>
            <FilterLink filter="SHOW_ACTIVE" name="待办任务"/>
            <FilterLink filter="SHOW_COMPLETED" name="已完成任务"/>
          </div>
          <ul className="list-group">
            {
              todos.map((todo) => {
                return (
                  <li className="todo-list_li" key={todo.id}>
                    <Checkbox
                      className="check-box"
                      onChange = {this.handleChange}
                      checked = {todo.completed}
                      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                      onClick = {() => this.handleCheckboxClick(todo, this)}
                    >
                      {todo.text}
                    </Checkbox>
                    <Button 
                      type="link"
                      key={`button-${todo.id}`}
                      className="todo-list_del"
                      onClick={() => this.handleDelete(todo, this)}
                    >
                      删除
                    </Button>
                  </li>
                )
              })
            }
          </ul>
          <form onSubmit={this.submit} action="" className="todo-add">
            <Input placeholder="你想做什么" value={this.state.value} onChange= {this.handleInputChange} ref={(input) => this.input = input} className="todo-input" />
            <Button type="primary" htmlType="submit" className="todo-btn">添加任务</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    setVisibility: state.setVisibility
  }
}

export default connect(mapStateToProps, null)(TodoList);
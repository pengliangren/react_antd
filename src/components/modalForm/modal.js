import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Form from './form'; // 引入封装好的表格
import { Modal } from 'antd';

class FormMadal extends PureComponent {

  render() { 
    const {fields, modalKey, visible, title, onCancel, onOk, okText } = this.props;
    return (
      <Modal
        wrapClassName="form" // 对话框外层容器的类名
        key = {modalKey}
        visible = {visible}
        title = {title}
        onCancel = {onCancel}
        footer = {null}
      >
        <Form fields = {fields} onOk={onOk} onCancel={onCancel} showCancel okText={okText} />
      </Modal>
    );
  }
}

FormMadal.propTypes = {
  modalKey: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  fields: PropTypes.arrayOf(Object).isRequired,//arrayOf指的传递参数要么是对象
  // fields:PropTypes.arrayOf(PropTypes.number,PropTypes.string), //arrayOf指的传递参数要么是数字，要么是字符串
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}
 
export default FormMadal;

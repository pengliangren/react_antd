import React, { PureComponent } from "react";
import { Input, Row, Col, Button, Form, Card, message } from "antd";

import "../index.less";

class BMI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bmi: '',
      level: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('收到表单值：', this.props.form.getFieldsValue());
    const { validateFields } = this.props.form;
    validateFields((errors, values) => {
      if (errors) {
        message.error('请输入体重和身高再进行计算')
        return
      }
      console.log(values)
      const w = values.weight;
      const h = values.height;
      let level;
      const bmi = (w / (h / 100) ** 2).toFixed(1)
      if (bmi < 18.5) {
        level = 0
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        level = 1
      } else if (bmi === 25) {
        level = 2
      } else if (bmi >= 25 && bmi <= 29.9) {
        level = 3
      } else if (bmi >= 30) {
        level = 4
      }
      this.setState({ bmi, level })
    })
  }

  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      bmi: '',
      level: ''
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const i = this.state.level

    return (
      <div style={{ marginTop: "80px" }}>
        <Form onSubmit={this.handleSubmit}>
          <Row type="flex" justify="center" className="rowItem">
            <Col span={10}>
              {
                getFieldDecorator('weight', {
                  rules: [{
                    required: true
                  }]
                })(
                  <Input type="number" addonBefore="您的体重：" addonAfter="kg" />
                )
              }
            </Col>
          </Row>
          <Row type="flex" justify="center" className="rowItem">
            <Col span={10}>
              {
                getFieldDecorator('height', {
                  rules: [{
                    required: true
                  }]
                })(
                  <Input type="number" addonBefore="您的身高：" addonAfter="cm" />
                )
              }
            </Col>
          </Row>
          <Row type="flex" justify="center" className="rowItem">
            <Col span={10}>
              <Button style={{ width: '50%' }} htmlType="submit">
                计算
              </Button>
              <Button style={{ width: '50%' }} onClick={this.handleReset}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Input addonBefore="您的BMI：" value={this.state.bmi} id="red" disabled />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Card bodyStyle={{ padding: 0 }} id="cardWrap">
              <p className={i === 0 ? 'activeP' : 'die'}>
                偏瘦&nbsp;&nbsp;&nbsp;&nbsp;
                {'<18.5'}
              </p>
              <p className={i === 1 ? 'activeP' : 'die'}>
                正常&nbsp;&nbsp;&nbsp;&nbsp;
                {'18.5～24.9'}
              </p>
              <p className={i === 2 ? 'activeP' : 'die'}>
                超重&nbsp;&nbsp;&nbsp;&nbsp;
                {'=25'}
              </p>
              <p className={i === 3 ? 'activeP' : 'die'}>
                偏胖&nbsp;&nbsp;&nbsp;&nbsp;
                {'25.0～29.9'}
              </p>
              <p className={i === 4 ? 'activeP' : 'die'}>
                肥胖&nbsp;&nbsp;&nbsp;&nbsp;
                {'30.0～34.9'}
              </p>
            </Card>
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <div className="issue">
              如若结果出现误差
              <a
                href="https://github.com/MuYunyun/react-antd-demo/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                点此提issue
              </a>
              ，O(∩_∩)O
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({})(BMI);

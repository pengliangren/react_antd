import React from "react";
import { Col, Card, Timeline, Icon } from "antd";

const BuildSiteLog = () => (
  <Col span={8}>
    <div className="cloud-box">
      <Card>
        <div className="pb-m">
          <h3>建站日志</h3>
          <small>2个任务待完成，1个任务正在进行中</small>
        </div>
        <span className="card-tool">
          <Icon type="sync" />
        </span>
        <Timeline>
          <Timeline.Item>
            更多模块开发中 2019-12-01
          </Timeline.Item>
          <Timeline.Item color="red">
            模块化探索 2019-12-02
          </Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
            封装Ajax实现跨域请求
          </Timeline.Item>
          <Timeline.Item color="green">
            <p>引入 classnames 实现多个className 共同使用</p>
            <p>引入 react-loadable 实现代码分割，减少首屏加载时间</p>
            <p>引入 screenfull 可以实现全屏展示功能</p>
          </Timeline.Item>
          <Timeline.Item color="green">
            <p>引人Redux,Fetch</p>
            <p>引人Less,React-Router(4.x)</p>
            <p>引入echarts, echarts-for-react</p>
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  </Col>
);

export default BuildSiteLog;

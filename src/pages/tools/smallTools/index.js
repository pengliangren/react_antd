import React from 'react';
import { Tabs } from 'antd';
import Salary from './components/salary';
import House from './components/house';
import BMI from './components/bmi';
import Age from './components/age';

const { TabPane } = Tabs;

const Tools = () => {
  return(
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="工资帽" key="1">
          <Salary />
        </TabPane>
        <TabPane tab="房租" key="2">
          <House />
        </TabPane>
        <TabPane tab="身体指数" key="3">
          <BMI />
        </TabPane>
        <TabPane tab="多大了" key="4">
          <Age />
        </TabPane>
        <TabPane tab="施工中" key="5" disabled>施工中</TabPane>
      </Tabs>
    </div>
  )
}

export default Tools;
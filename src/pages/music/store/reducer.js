import { Map } from 'immutable';
import * as type from './actionTypes';

const defaultStatus = Map({
  name: '3424',
  age: 22345
})

// 导出的是一个纯函数
export default (state = defaultStatus, action) => {
  switch (action.type) {
    
    default:
      return state
  }
}
import { combineReducers } from 'redux';

// 引入redux-immutable 之后，combineReducers 不再从redux导入，而是从redux-immutable导入
//combineReducers  是为了把所有的reducer 都合并在一起，共享数据内容

// import {combineReducers} from 'redux-immutable';

import {reducer as HeaderReducer } from '@/components/header/store';
import {reducer as musicReducer } from '@/pages/music/store';
import {reducer as todoListReducer} from '@/pages/tools/todoList/store';
import {reducer as mockReducer} from '@/pages/mock/useMock/store'

// 因为假如项目很大的时候，store 里面的数据会很多，这样会导致reducer 里面的代码会很多，不容易维护，
//所以要拆分多个 reducer 去管理数据，然后再使用redux里面的combineReducers方法去 整合各个 reducer

const rootReducer = combineReducers({
  header: HeaderReducer,
  music: musicReducer,
  ...todoListReducer,
  mock: mockReducer
})

// 整合一整个根 reducer之后，暴露出去
export default rootReducer
import { handleActions } from 'redux-actions';
import * as type from './actionTypes';

const todoListInit = [
  {
    id: -3,
    text: 'coding',
    completed: false
  },
  {
    id: -2,
    text: '打篮球',
    completed: false
  },
  {
    id: -1,
    text: 'reading',
    completed: true
  }
]

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false // 刚传入的代办默认未完成
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state  
  }
}

// Object.assign 可以讲原始对象拷贝到一个空对象，得到原始对象的克隆，但是这个方法
function clone(origin) {
  return Object.assign({},origin)
}

// 上面这种方法，只能克隆原始对象自身的值，不能克隆它的继承值，如果需要保持继承链，可以采用以下代码, 注意只是拷贝对象
function deepClone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

export const todoList = handleActions({
  [type.ADD_TODO]: (state, action) => {
    const payload = action.payload
    return [
      ...state,
      todo(undefined, payload) // 这里不需要再传  state 进去了， 因为上面已经处理过了，只要传 undefined 就行
    ]
  },
  [type.TOGGLETODO]: (state, action) => {
    return state.map(t => todo(t, action.payload))
  },
  [type.DELETE_TODO]: (state, action) => {
    return state.filter( t => t.id !== action.payload.id)

    // 第二种方法
    // let newState = JSON.parse(JSON.stringify(state))
    // console.log(newState)
    // let index = 0
    // for(let i in newState) {
    //   if (newState[i].id === action.payload.id) {
    //     index = i
    //     break;
    //   }
    // }
    // newState.splice(index, 1)
    // return newState
  }
}, todoListInit)

const setVisibilityInit = {
  filter: 'SHOW_ALL'
}

export const setVisibility = handleActions({
  [type.SET_VISIBILITY]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}, setVisibilityInit)
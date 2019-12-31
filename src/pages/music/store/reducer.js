// import { Map } from 'immutable';
import * as type from './actionTypes';
import { handleActions } from 'redux-actions';

const defaultStatus = {
  name: '3424',
  age: 13123
}

const musicReducer = handleActions(
  {
    [type.REQUEST_MUSIC_LIST]: (state, action) => {
      return {
        ...state,
        loading: action.payload.isloading,
      }
    }
  },
  defaultStatus
)

export default musicReducer;

// 导出的是一个纯函数
// export default (state = defaultStatus, action) => {
//   switch (action.type) {
    
//     default:
//       return state
//   }
// }
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
    },
    [type.RECEIVE_MUSIC_LIST]: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        loading: false,
        data: payload.res.song_list
      }
    }
  },
  defaultStatus
)

export default musicReducer;

// 使用 redux-actions 之后， 可以不用switch case 这样处理， 使用 handleActions 这个方法同时处理多个reducer
// 导出的是一个纯函数
// export default (state = defaultStatus, action) => {
//   switch (action.type) {
    
//     default:
//       return state
//   }
// }
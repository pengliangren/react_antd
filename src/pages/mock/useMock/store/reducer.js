import * as type from './actionTypes';
import { handleActions } from 'redux-actions';

const defaultState = {
  data: []
}

export default handleActions(
  {
    [type.REQUEST_MUSIC_LIST2]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [type.RECEIVE_MUSIC_LIST2]: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        loading: false,
        data: payload.res.song_list
      }
    }
  },
  defaultState
)
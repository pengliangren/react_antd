// import { fromJS } from 'immutable';
import { handleActions } from  'redux-actions';
import * as type from './actionTypes';

const defaultState = {
  menuName: '',
  mode: 'inline',
  collapsed: false
}

const headerReducer = handleActions({
  [type.CHANGE_MENU_NAME]: (state, action) => {
    return {
      ...state,
      menuName: action.payload.menuName
    }
  },
  [type.CHANGE_COLLAPSED]: (state, action) => {
    return {
      ...state,
      collapsed: !state.collapsed,
      mode: state.collapsed ? 'inline' : 'vertical'
    }
  }
}, defaultState)

export default headerReducer;
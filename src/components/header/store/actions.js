
import { createAction} from 'redux-actions'
import * as type from './actionTypes';

export const changeMenuName = createAction(type.CHANGE_MENU_NAME, menuName => {
  return {
    menuName
  }
})

export const changeCollapsed = createAction(type.CHANGE_COLLAPSED);

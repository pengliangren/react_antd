import { createAction } from 'redux-actions';
import * as type from './actionTypes';
import { music } from '@/api'

export const requestMusicList = createAction(type.REQUEST_MUSIC_LIST, (isloading) => {
  return {
    isloading
  }
});
export const receiveMusicList = createAction(type.RECEIVE_MUSIC_LIST);

// 封装 获取ajax 的action
// 注意， 这个 是没有 type 的， 只是同时去处理多个 action， 进行异步操作，而不需要单独的 reducer 去处理
const createAjaxAction = (api, startAction, endAction) => (data) => dispatch => {
  // 请求数据的时候，把loading 开启
  dispatch(startAction(true))
  api(data).then((response) => {
    // 请求数据完成之后， 派发action，把 loading 关闭
    dispatch(endAction({ req: data, res: response}))
  })
}

// 注意， 这个 是没有  type 的， 只是同时去处理多个 action， 进行异步操作，而不需要单独的 reducer 去处理
export const fetchMusicList = createAjaxAction(music.musicList, requestMusicList, receiveMusicList);


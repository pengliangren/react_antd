import { createAction } from 'redux-actions';
import * as type from './actionTypes';
import { createAjaxAction } from '@/pages/music/store/actions' // createAjaxAction 从music 里面封装好的actions引入
import { music } from '@/api'

export const requestMusicList2 = createAction(type.REQUEST_MUSIC_LIST2);

export const receiveMusicList2 = createAction(type.RECEIVE_MUSIC_LIST2);

// 注意， 这个 是没有  type 的， 只是同时去处理多个 action， 进行异步操作，而不需要单独的 reducer 去处理
export const fetchMusicList = createAjaxAction(music.musicList, requestMusicList2, receiveMusicList2);
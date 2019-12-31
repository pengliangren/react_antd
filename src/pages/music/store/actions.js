import { createAction } from 'redux-actions';
import * as type from './actionTypes';
import { fetchJSONPByGet } from '@/utils/ajax';

export const requestMusicList = createAction(type.REQUEST_MUSIC_LIST, (isloading) => {
  return {
    isloading
  }
});
export const receiveMusicList = createAction(type.RECEIVE_MUSIC_LIST);

export const fetchMusicList = createAction(type.FETCH_MUSIC_LIST, () => (data)=> {
  return (dispatch) => {
    dispatch(requestMusicList(true))
    fetchJSONPByGet('http://tingapi.ting.baidu.com/v1/restserver/ting')(data)
    .then((response =>{
      console.log(response)
      dispatch(receiveMusicList(response))
    }))
  }
});


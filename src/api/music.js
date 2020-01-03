import { fetchJSONPByGet } from '@/utils/ajax';

export const musicList = fetchJSONPByGet('http://tingapi.ting.baidu.com/v1/restserver/ting')
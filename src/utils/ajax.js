import fetchJsonp from 'fetch-jsonp'; // 可以进行跨域jsonp 请求
/**

 fetchJsonp("请求的url地址")
.then(response => res.json() )
.then(data => console.log(data))
  //注意： 第一个.then 中获取到的不是最终数据，而是一个中间的数据流对象；
  // 注意： 第一个  .then 中获取到的数据， 是一个 Response 类型对象；
  // 注意： 第二个 .then 中，获取到的才是真正的 数据；
*/

export function fetchJSONP(url, params) {
  return new Promise((resolve, reject) => {
    fetchJsonp(url, {
      ...params
    }).then(response => {
      resolve(response.json())
    }).then(json => {
      console.log(json)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
  // return fetchJsonp(url, {
  //   ...params
  // })
}

/**
 * 双箭头函数的含义：
 * 第一个参数是state的函数调用后会返回一个函数(就是参数是symbol的这个函数)，所以你连续调用可以成功
  箭头函数在不写{} 的情况下，可以省略return关键字，而默认return接下来的东西
 */

/*
let getters = {
  total: (state) => (symbol) => {
    return (symbol || '$') + state.count;
  }
}
// 上面的代码 等效于 =
let getters = {
  total: (state) => {
    return (symbol) => {
      return (symbol || '$') + state.count;
    }
  }
}
getters.total(state)(symbol)  //调用成功
*/

export const fetchJSONPByGet = url => query => {
  const params = {
    method: 'GET'
  }
  let getQuery = '?'
  let getUrl = '';
  if (query) {
    // 遍历对象的 key 
    Object.keys(query).forEach(name => {
      getQuery = `${getQuery}${name}=${query[name]}&` // 例如 ?a=1&b=2&
    })
  }
  // substr(start, length)
  getUrl = url + (query ? getQuery.substr(0, getQuery.length -1 ) : '') // ?a=1&b=2
  return fetchJSONP(getUrl, params)
}

export const fetchJSONByGet = url => query => {
  const params = {
    method: 'GET'
  }
  let getQuery = '?'
  let getUrl = ''
  if (query) {
    Object.keys(query).forEach(name => {
      getQuery = `${getQuery}${name}=${query[name]}&`
    })
  }
  getUrl = url + (query ? getQuery.substr(0, getQuery.length - 1) : '')
  return fetch(getUrl, params)
}
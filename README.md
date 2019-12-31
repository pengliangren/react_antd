## React 知识点
- react 加载优化可以使用 react-loadable 插件
  react-loadable 可以实现代码分割， 减少首屏加载时间，打包之后分成多个代码块chunks
- screenfull 可以实现全屏展示

## immutable.js 的使用

### Immutable.js 的几种数据类型
- List: 有序索引集，类似JavaScript中的Array。
- Map: 无序索引集，类似JavaScript中的Object。
- OrderedMap: 有序的Map，根据数据的set()进行排序。
- Set: 没有重复值的集合。
- OrderedSet: 有序的Set，根据数据的add进行排序。
- Stack: 有序集合，支持使用unshift()和shift()添加和删除。
- Record: 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值。
- Seq: 序列，但是可能不能由具体的数据结构支持。
- Collection: 是构建所有数据结构的基类，不可以直接构建。

**用的最多就是List和Map，所以在这里主要介绍这两种数据类型的API。**

### Immutable.js 的常用API [参考文档](https://www.jianshu.com/p/0fa8c7456c15)

### fromJS()
作用：将一个js数据转换为Immutable类型的数据

用法：fromJS(value, converter)

简介：value是要转变的数据，converter是要做的操作。第二个参数可不填，默认情况会将数组准换为List类型，将对象转换为Map类型，其余不做操作
```
const obj = Immutable.fromJS({a:'123',b:'234'},function (key, value, path) {
    console.log(key, value, path)
    return isIndexed(value) ? value.toList() : value.toOrderedMap())
})
```

### toJS()

作用：将一个Immutable数据转换为JS类型的数据

用法：value.toJS()

### is()
作用：对两个对象进行比较

用法：is(map1,map2)

简介：和js中对象的比较不同，在js中比较两个对象比较的是地址，但是在Immutable中比较的是这个对象hashCode和valueOf，只要两个对象的hashCode相等，值就是相同的，避免了深度遍历，提高了性能

```
import { Map, is } from 'immutable'
const map1 = Map({ a: 1, b: 1, c: 1 })
const map2 = Map({ a: 1, b: 1, c: 1 })
map1 === map2   //false
Object.is(map1, map2) // false
is(map1, map2) // true
```
### List() 和 Map()
作用：用来创建一个新的List/Map对象

用法：
```
//List
Immutable.List(); // 空List
Immutable.List([1, 2]);

//Map
Immutable.Map(); // 空Map
Immutable.Map({ a: '1', b: '2' });
```

### size
作用：属性，获取List/Map的长度，等同于ImmutableData.count();

### get() 、 getIn()
作用：获取数据结构中的数据
```
//获取List索引的元素
ImmutableData.get(0);

// 获取Map对应key的value
ImmutableData.get('a');

// 获取嵌套数组中的数据
ImmutableData.getIn([1, 2]);

// 获取嵌套map的数据
ImmutableData.getIn(['a', 'b']);
```
## fetch-jsonp 的使用
### fetch-jsonp  不受跨域限制
```
安装  cnpm i fetch-jsonp -S

用法 : 在项目中引入
import  fetchJsonp  from  fetch-jsonp

fetchJsonp("请求的url地址")
.then(response => res.json() )
.then(data => console.log(data))
  //注意： 第一个.then 中获取到的不是最终数据，而是一个中间的数据流对象；
  // 注意： 第一个  .then 中获取到的数据， 是一个 Response 类型对象；
  // 注意： 第二个 .then 中，获取到的才是真正的 数据；
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
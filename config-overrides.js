const { override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackExternals } = require('customize-cra');
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  // antd 按需引入配置
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,  //这里一定要写true，css和less都不行, 因为要解析自定义主题的less 文件
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#0080FF' }
  }),
  // 配置路径别名
  addWebpackAlias({
    "@": resolve("src")
  }),
  // 配置额外的库
  addWebpackExternals({
    'BMap': 'BMap'
  })
)
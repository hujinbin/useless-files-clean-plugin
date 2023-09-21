# useless-files-clean-plugin

查询（删除）项目中未使用文件的 webpack 插件，支持多个版本，详情请查看版本支持清单,适用于使用 webpack 构建的工程项目。

## 安装

```
 npm i useless-files-clean-plugin -d
```

## 使用

`webpack.config.js` #webpack 配置文件

```
const UselessFilesCleanPlugin = require('useless-files-clean-plugin')
module.exports = {
    plugins: [
        new UselessFilesCleanPlugin({
            root: './src',
            output: './unused-files.json',
            clean: false,
            exclude: ['node_modules'],
            ignoreFile: ['.md']
        })
    ]
}
```

`options`
| 名称 | 参数 |是否必填|默认值| 介绍 |
| ---- | ---- | ---- | ---- | ---- |
| root | string | 否 | ./src |文件根目录，查询内部所有文件，判断文件是否存在于依赖中 |
| output | string | 否 | ./unused-files.json | 输出全部文件列表、依赖文件列表、未使用文件列表的目录 |
| clean | boolean | 否 | false | 是否删除未使用文件 |
| exclude | array | 否 | [] | 排除的文件夹 |
| ignoreFile | array | 否 | [] | 排除的文件 |

# re-editor &middot; [![Netlify Status](https://api.netlify.com/api/v1/badges/815fce6a-8e8e-4af9-b2c8-5c15dace9288/deploy-status)](https://app.netlify.com/sites/re-editor/deploys) [![CircleCI](https://circleci.com/gh/wowlusitong/re-editor.svg?style=svg)](https://circleci.com/gh/wowlusitong/re-editor)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wowlusitong/re-editor/blob/master/LICENSE)  [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
一个开箱即用的React富文本编辑器 🚀当然也可以定制化啦👏

编辑器默认工具栏使用了ant，如果想换个风格，可以自定义工具栏

<img width="500" alt="屏幕快照 2019-03-17 23 11 49" src="https://user-images.githubusercontent.com/3221051/54493370-2faedb80-490a-11e9-9b9e-5d17febedda2.png">


- [使用方法](#使用方法)
  - [开箱即用](#开箱即用)
  - [自定义](#自定义)
- [常见问题](#FAQ)
- [支持的功能](#功能)

# 特点
- 开箱即用，无需配置
- 定制化，可自行开发任意风格和形式的工具条 [API补全中]
- 支持元素功能设置，例如修改图片大小


# 使用方法
re-editor有两种使用方法，提供开箱即用的方式，也可以进行深度的定制化

## 开箱即用

### 安装依赖
```sh
$ npm install re-editor
```
### 引入样式
在js里面引入
```js
import 're-editor/lib/styles/index.css'
```
也可以在css里面引入(需要css预处理支持)
```css
@import 're-editor/lib/styles/index.css'
```

### props
| 属性 | 说明 |类型|
| - | - |-|
| value | 编辑器的值 | [object](https://github.com/wowlusitong/re-editor/blob/master/packages/core/src/scripts/utils/utils.js#L4-L19)
| onChange| 编辑器更改内容的回调|(value: [Value](https://docs.slatejs.org/slate-core/value)) => void
| placeholder | 占位文本 | string

# 自定义
编辑器分为两个部分，`内容编辑区域` 和 `工具条`，大部分的自定义需求都是集中在工具条上
### 安装编辑器核心
```sh
$ npm install @re-editor/core
```
### 创建工具条
可以用任何方式创建编辑器工具条，需要将编辑器的实例传给工具条，可参考 [re-editor](https://github.com/wowlusitong/re-editor/tree/master/packages/re-editor) 和 [@re-editor/toolbar-antd](https://github.com/wowlusitong/re-editor/tree/master/packages/toolbar-antd)的实现，详情查看API文档(这部分文档还没写完，会在一周内补全😂)

例如实现一个加粗功能:
```js
import { command } from '@re-editor/core';

const Demo = (props) => {
  function handleClick() {
    command(props.editor)('bold')
  }
  return <div onClick={handleClick}>bold</div>
}

```

# packages介绍
- re-editor: 一个封装好的，包含工具条的编辑器
- @re-editor/core: 编辑器核心
- @re-editor/toolbar-antd: 基于antd制作的工具条，默认
- @re-editor/examples: 演示项目


# FAQ
#### 和slate或draft-js对比有什么区别?
slate或draft并不是一个纯编辑器，它们更像是一个用于构建编辑器的框架，re-editor是基于slate开发，让你不必关注`构建编辑器`的过程。
#### 怎么修改样式
样式分为两部分，node(粗体、h1、h2等)和工具栏，它们都可以通过css重写基础样式，工具栏也可以做到完全重写
样式可以通过css自定义
#### 每次保存数据量太大怎么办？
使用增量更新，onChange回调的value是 [immutable](https://github.com/immutable-js/immutable-js)格式，可以使用[immutable-js-diff](https://github.com/intelie/immutable-js-diff#readme)等方法获取diff的内容进行增量更新


# 功能

## 文字装饰
`粗体` `斜体` `下划线` `删除线` `上标` `下标`
## 列表
`有序列表` `无需列表`
## 对齐方式
`左对齐` `右对齐` `居中对齐` `两端对齐`

## 标题
`h1` `h2` `h3` `h4` `h5` `h6`

## 其他
- 图片
  - 设置大小
  - 从剪贴板复制
- 表格
  - 增加行
  - 增加列
  - 删除行
  - 删除列
  
其他功能持续增加中...


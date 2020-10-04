# 工具

[whimsical设计原型图](https://whimsical.com/)

# 进程（process）和线程（thread）

## 主进程（mian）和渲染进程（renderer）

​	主进程：对接electornAPI创建菜单、上传文件、创建渲染进程、支持node.js

​	渲染进程：每一个都是单独的进程、每个窗口都是一个进程、支持node.js和DOMAPI、支持electronAPI

`nodemon --watch main.js --exec \"electron .\"`

监控main.js文件一旦发生变化就执行electron . 命令

## 进程通信方式

目的是让**渲染进程（前端部分）**也能使用**主进程（electron部分）**的API

安装DEVTRON插件

IPC（interprocess communication）通信

1、事件通信（IPC）

2、remote通信

## 功能负责

React：搜索框、文件列表、新建文件、文件Tabs

Electron：文件列表右键子菜单、文件导入、应用菜单、全局快捷键、文件数据持久化保存

## **React组件逻辑**

> react使用hook创建的组件都是以函数形式创建的

关于 `JSX`  `()`内写入**HTML**标签语法  `{}` 写入**JS** 代码，**相互之间可以嵌套**

```react
const [value, setValue] = useState('')
<button
onClick={() => { setValue(file.title); setEditStatus(file.id); }}
>
</button>
    
<button
onChange={(e) => { setValue(e.target.value) }}
>
</button>
```

​	逻辑解释：给该标签添加`onClick`事件，执行相应 `useState` 的函数，通常不止一个函数，有时还需要获取事件源，所以需要裹上一层。

函数参数（`arguments`）：实现组件在使用过程中的自定义化，多参数一定是对象参数，以解构赋值的方式获取

​			1、自定义类名

​			2、自定义函数

​			3、自定数据格式（如读入数据库内容对象）

传值方式

> 引入，在行内写入参数
>
> 此处传入了文件对象数据以及三个函数

```react
          <FileList
            files={defaultFiles}
            onFileClick={(id) => { console.log(id) }}
            onFileDelete={(value) => { console.log('delete', value) }}
            onSaveEdit={(id, value) => { console.log(id, value) }}
          />
```

返回值（`return`）:组件实体 必须包裹在 `<div></div>` 或者 `<></>`中

组件按状态显示不同内容，即满足表达式（往往跟hook设置的状态有关）

```react
let test = (arguments) => {
    return (
        <ul>
            {
                (满足表达式1) &&
                对应UI1
            }
            {
                (满足表达式2) &&
                对应UI2
            }
        </ul>
    )
}
```

## **Hook简介**

> 遵循 `useXxx`的命名规范

### useState

`const [value, setValue] = useState(false)`

`value` 是值，并且初始值是false

`setValue` 是**function**，

​	使用方式 `setValue(true)` 将`value` 设置为`true`

### useEffect

> 副作用函数，**监听**参数2传入的值，发生变化才执行，当传入空数组就不用频繁执行

`useEffect(callback, [])`

callback介绍

​	可以通过返回值清除effect，**在执行下一个 effect 之前，上一个 effect 就已被清除**

```react
    useEffect(() => {
        document.addEventListener('keyup', handleInputEvent);
        return () => {
            document.removeEventListener('keyup', handleInputEvent);
        }
    }, [fetch])// 监听fetch变化，当fetch发生变化才执行
```

### useRef(我尚未完全理解！！！！)

> 缓存数据的钩子，驻留在各个生命周期共用值。

`const refContainer = useRef(initialValue);`

初始值为`initialValue`，并返回对象 `refContainer ` ，并被缓存，不管在任何的生命周期中都不会被销毁。

取出方式`refContainer.current` 

### 自定义Hook

> 场景：封装频繁出现的操作，降低代码量。

自定义Hook应该遵循命名，**组合原有Hook完成更复杂的操作**，导出一个函数，返回相应值。

下面创建一个获取键盘输入的Hook

```react
import { useState, useEffect } from 'react';

// 匹配用户按键与输入的按键参数是否相同
const useKeyPress = (targetKeyCode) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const keyDownHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(true);
        }
    }
    const keyUpHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(false);
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }
    },[])
    return keyPressed;
}

export default useKeyPress;
```



## react哲学

1. 拆分UI为单个组件

2. 创建应用的静态版本

    ​	即实现搜索框却不用实现搜索功能，定义好事件的回调函数，供后续插入

3. 组件之间的信息交互

## react组合electron环境

> 原理：使用electron加载本地的reacturl

```javascript
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"cross-env BROWSER=none npm start\" "
  },
"devDependencies": {
    "concurrently": "^5.3.0", // 并发执行命令（输出详细信息，并且可以关闭端口）
    "cross-env": "^7.0.2", // 适配环境变量（兼容linux和Windows）
    "electron": "^10.1.1",
    "electron-is-dev": "^1.2.0",// 判断环境，读取不同url
    "wait-on": "^5.2.0"// 保证命令的先后顺序
  }
```

## 引入Bootstrap

> react已经配置好了css打包工具，只需要安装再导入即可

**注**在bootstrap中的 `<button></button>` 标签要求加上 `type="button"`

## 文件结构（src）

```reStructuredText
├─components
│      ComponentName.css
│      ComponentName.js
│
├─hooks
│      useHook.js
│
└─utils
```

## onload和DOMContentLoaded的区别

## fontawesome React

[github地址](https://github.com/FortAwesome/react-fontawesome)

[官网搜索指定类名](https://fontawesome.com/)

## 类型检查（PropsTypes）

> 使用在生产环境

## 添加类名拼接package

> 动态添加类名

```react
                   // 定义
		const fileClassName = classNames({
                        'nav-link': true,//默认添加的类名
                        'active': file.id === activeId//满足条件时添加的类名
                    })
                    // 使用
                    className={fileClassName}
```

# 富文本编辑器的选择

[react版本的simpleMDE](https://github.com/RIP21/react-simplemde-editor/tree/v4.1.0)

至此静态模块完成

# 开始逻辑交互

## 状态设计

### （初始）

```react
files: [{ id: 1 }, { id: 2 }……]
searchedFiles: [{ id: 1 }, { id: 2 }]
unsavedFiles: [{ id: 1 }, { id: 2 }]
openedFiles: [{ id: 1 }, { id: 2 }]
activeFile: { id: 1 }
```

### （改进）

```react
files: [{ id: 1 }, { id: 2 }……]
// 耦合的数据可以只用files存储，主要用值取即刻
unsavedFileIDs: ['1', '2']
openedFileIDs: ['1', '2']
activeFileID: '1'
```

### UUID

## 优化（flatten state）

将原来数组存储文件信息改为使用**hashmap**

## 路径解析

remote（electron）+getPath()

## 数据持久化

electron-store存储文件信息

自定义的fileHelper存储文件内容

## 实现文件导入

[官方文档](https://www.electronjs.org/docs/api/dialog#dialogshowerrorboxtitle-content)

![electron上的主进程模块](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200914165336212.png)

## 菜单

[官方文档](https://www.electronjs.org/docs/api/menu-item#menuitemmenu)

原生菜单：置于导航条的菜单

上下文菜单：如点击鼠标右键与内容相关的菜单

快捷键

[默认菜单代码](https://github.com/electron/electron/blob/master/lib/browser/default-menu.ts)

### 设置菜单的流程

![设置菜单的流程](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200914220110726.png)

设置菜单页面使用静态页面

## 阿里OSS

[官方文档](https://help.aliyun.com/document_detail/32068.html?spm=a2c4g.11186623.2.20.401fb6c9o1zNKy#concept-32068-zh)

### 

# 错误整理

## 1、Maximum update depth exceeded error

`onClick={ onFileClick(file.id) }`

此处使用了函数立即执行，导致出现循环执行，修改方式

`onClick={() => { onFileClick(file.id) }}`

## 2、

TypeError: Cannot read property 'id' of undefined

(anonymous function)

F:/Code/vscode/FrontEndCodeDemo/electron/markdownParser/cloud-doc/src/components/TabList.js:13

## 3、require问题

require会被webpack拦截取node_modules找包，改为 `window.require` 可以阻止这种行为

## 4、关于electron内置的nodejs模块版本

## 5、新建再esc之后react不会重新渲染

```javascript
      const { [id]: value, ...afterDelete } = files； // 展开指定i键值对之外的值
      setFiles(afterDelete)
	// 实现afterDelete删除指定内容的效果
```



<h1><script>document.write(process.versions.node);</script></h1>
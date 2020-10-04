# Vue入门demo

> 简化dom操作：vue react 等前端框架的出现是为了简化原生JavaScript繁琐的操作
>
> 响应式数据驱动：根据数据的变化而改变页面

> 内部三个小结构： `el` `data` `methods`

```JavaScript
<body>
    <div id="app">{{msg}}
        <div>
            <input type="text" v-model="info">
            <button @click="handleClick">add</button>

        </div>
        <ul>
            <!-- <li v-for="item in list">{{item}}</li> -->
            <todo-item v-for="item in list" :item="item" ></todo-item>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.component('todo-item',{
            props:['item'], // 在 :item 中使用
            template:'<li class="item">{{item}}</li>'
        })

        new Vue({
            el: '#app',// 产生关联
            data() {
                return {
                    msg: 'hello world1',
                    info: '',
                    list:[]
                }
            },
            methods: {
                handleClick() {
                    this.list.push(this.info)
                    this.info=''
                }
            }
        })
    </script>
</body>
```

## 入门三问

> el （element）
>
> Vue实例的范围
>
> ​	el命中的元素内部，即子元素
>
> 能使用哪些选择器
>
> ​	id 选择器（建议使用） class选择器 标签选择器
>
> 能操作哪些类型的节点
>
> ​	只支持（除了html和body）的双标签

## data（数据对象）

> 支持引用数据类型，但是对象不能使用`obj[props]`语法

## vue指令

`v-text` 设置文本属性  

`v-html` innerHTML

`v-on:` => `@` 事件绑定



`v-show` 元素的显示或者隐藏，实质是display（适合频繁操作）

​	内容会被解析成Boolean值

​	即： age>18 

`v-if` 操纵dom，直接删除该节点（适合稳定操作）

`v-bind:` =>`:`

​	操作写在标签内的属性：如`src`、`class`、`title`



`v-for="item in list"`   从list取出一个个的**item**渲染

`v-for="(item,index) in list"`   从从list取出一个个的**item**和下标**index**渲染



`v-on`深入

​	可传入参数

​	添加事件修饰符，如点击某个按键		`@keyup.enter=""` 绑定回车键

​	[more](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

`v-model`

​	获取和设置表单元素的值，双向绑定

## 双向绑定

> vue中的data会展示的表单中，表单中的值修改也会让data中的值改变

# axios

请求接口[github展示](https://github.com/AutumnFish/testApi)

Vue中关于网络请求的this指向

> this指向了axios对象，所以需要保存外部的Vue的this指向。
>
> **注:**箭头函数不存在这些问题

# 搭建环境

> `npm i -g vue-cli`
>
> `vue create my-app`
>
> ​	关于配置
>
> ​		default (babel, eslint)  （默认配置）
>
>   ​		Manually select features  （手动选择特性）
>
> `npm run server`

## vue文件结构

template

script

style

`<style scope>`:作用域化，仅对当前组件生效

# 虚拟DOM比较算法

比较同层级节点，并做出相应的操作。

![示例](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200816120859296.png)

> 操作：C节点移动到B节点下
>
> ​	Vue实现：删除第二层的C节点，再在B下创建C节点，然后在C节点下创建EF节点

# 生命周期

> 创建（执行一次）
>
> ​	beforeCreate=>created=>befotrMount=>**render**=>mounter
>
> 更新(会执行多次)
>
> ​	beforeUpdate=>**render**=>updated
>
> 销毁（执行一次）
>
> ​	beforeDestroy=>destroyed
# 生命周期

​      (init event & lifeCycle) beforeCreate (init injections(外部注入) & reactivity) created

```javascript
       console.log('created');
        if(el){
        }else{
            console.log('when vm.$mount(el) is called');
        }

        if(template){
            console.log('compile template into render function ');
        }else{
            console.log('compile el\'s outerHTML as template');
        }

        console.log('beforeMount');
        console.log('create vm.$el and replace "el" with it ');
        console.log('mounted');

        console.log('vm.$destroy');
        console.log('teardown watcher,child component and event listener');
```

​      beforeMount mounted

​       beforeUpdate updated

​      beforedDestroy destroyed

## methods & computed & watch

> 三个vue内的属性，`methods`是每次页面数据发生变化就触发，`computed`是对应数据发生变化就触发，内部的结构
>
> `data:{`
>
> ​	`get:function(){},`	
>
> ​	`set:function(value){}`
>
> `}`
>
> 即computed修改属性的性能比较好，建议使用，watch虽然性能也高，但是代码量大
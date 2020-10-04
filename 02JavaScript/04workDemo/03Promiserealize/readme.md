# 手写Promise

> 1. 内部有三个状态（**pending fulfilled rejected**）和一个变量`value`用于接收正确值或错误值
>
> 2. 传入的参数是回调函数，里面的this指向是window需要手动用`bind`函数修改
>
> 3. 状态变化只有以下两种情况 **pending => fulfilled**  和 **pending => rejected**
>
> 4. 回调函数内出现错误，状态自动变成**rejected**
>
> 5. **then**中传入两个**回调函数**，返回值是`Promise`对象能够**链式调用**，链式调用的`Promise`对象的状态不受前面`Promise`对象的状态影响
>
>     then执行的条件：状态发生改变，根据改变决定执行第一个完成函数还是拒绝函数
>
> 6. Promise是异步执行的，即：Promise的代码应该比同步代码要晚执行
>
> 7. promise内传入异步函数时，then函数需要等待promise的异步函数执行
>
> 8. 出现错误由then的第二个回调函数统一处理
>
> 9. promise内的settimeout函数的内容也要比then中的内容先执行
>
> 10. then的调用过程中出现错误需要改变状态为（rejected）
>
> 11. then的穿透（即上一个then中没有返回任何值，就往更上一个then中寻找值）
>
> 12. then取得的`value`是上一个then中处理的值，而不是`Promise`对象
>
> 13. Promise内返回类型的限制（不允许返回本身）
>
> 14. 实现静态方法 `Promise.reject()` 和`Promise.resolve()`
>
> 15. `Promise.all` 特性：参数为数组，需要数组中的内容全部是`fulfilled`状态
>
> 16. `race`  传入数组，传入的`Promise`谁快用谁





状态：关于状态的出现：Promise中，then中接收和包含的Promise对象，只能单向改变，then接收到的状态 

​	1、上一个then中包含`Promise`对象，根据该对象的状态决定，

​	2、无错误：fulfilled，有错误：rejected
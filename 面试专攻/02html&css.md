# HTML和CSS

## 1、



## 2、

## 3、

## 4、

## 5、

## 6、

## 7、

定位的常用属性：

static(`default`) 

relative  偏移量参照原点是自己在文档流中的左上角

fixed **脱离的文档流**，偏移量**参照点**可视窗口的左上角，且不会随滚动条滚动

absolute **脱离的文档流**，偏移量参照原点是自己父元素的左上角

stickly 在元素将要随滚动条滚出屏幕是停止移动

## 8、

## 9、

## 10、

## 11、

## 12、

## 13、

## 14、

## 15、

`px` 

​	pixel 屏幕像素

`em` 

​	父元素的 `font-size`  默认是 `16px`

​	为了方便计算 会声明  `body{font-size:62.5%;}`    `1em = 10px`

`rem` 

​	`root em` 根元素的 em 即 HTML标签的em

## 16、

## 17、

## 18、

`vh`  

​	`view height` 视口高度

`vw`

​	`view width` 视口宽度

## 19、

## 20、

## 21、

`translate` （过渡）`transform` （形变）`animation`（动画）

|      | `transform`                                                  | `animation` |
| ---- | ------------------------------------------------------------ | ----------- |
| css  | 属性简单，只有两帧                                           | 属性丰富    |
| js   | 操作简单，配合`setTimeout` `setInterval` `requestAnimationFrame` 实现复杂动画 |             |
|      |                                                              |             |
|      |                                                              |             |



## 22、

## 23、

## 24、

## 25、

## 26、

## 27、

## 28、

## 29、

## 30、

|              | src（source）                                 | href（Hypertext Reference）      |
| ------------ | --------------------------------------------- | -------------------------------- |
| 引入效果     | 引入会被下载                                  | 建立引用关系                     |
| 哪些标签具有 | ` source img script style ifame input(image)` | `link（rel:relationship关系） a` |

## 31、

|      | 伪类                                     | 伪元素                                              |
| ---- | ---------------------------------------- | --------------------------------------------------- |
| 格式 | `:`                                      | `::`                                                |
| 命名 | 添加`class`     JavaScript： `className` | 添加文本标签 JavaScript：`document.createElement()` |
| 连用 | 能，即可以一次使用多个伪类               | 不能                                                |
| 位置 | 伪类在伪元素前面不然失效                 |                                                     |

![常用](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201001030116115.png)
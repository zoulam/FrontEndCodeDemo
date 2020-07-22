# mpvue-koa
## 基本信息

[配套视频教程，本人仅是学习使用](https://www.bilibili.com/video/av83423939/)

**mpvue-shop 文件是该小程序的前端项目，使用mpvue**

**mpvue-shop-node 文件是该小程序的后端项目，使用koa2**

2. 分别在 `mpvue-shop` 和 `mpvue-shop-node` 中执行 `npm install`

3. 在 `mpvue-shop` 项目中执行 `npm run dev`（会生成一个dist目录）, 用小程序开发者工具打开这个 `dist > wx` 即可看到效果,此处是将mpvue项目打包成小程序能识别的项目代码。
**根据机器性能编译时间可能有所不同，请耐心等待**  控制台出现`DONE  Compiled successfully`字样即成功完成编译，这是一个实时编译的命令，即你的刚刚修改的内容也会被编译出去，使用`ctrl+c`可以终止，减少资源占用。

4. 在 `mpvue-shop-node` 项目中 更改`config.js`中的`mysql` 账号密码（`user`和`pass`改为自己的）

5. 将 `mpvue-shop-node` 中的 `nodemysql.sql` 导入到本地`mysql`库中，依照个人习惯操作，你可以使用图形化界面导入，下面是命令行导入介绍。

    ```bash
    #删除数据库(如果你前面导入同名数据想要继续导入则需要先删除)
    drop database nodemysql;

    #创建数据库nodenysql
    create database nodemysql;

    #查看已有数据库(虽然会提示创建成功，但还是确认一下😂)
    show databases;

    #进入数据库nodemysql
    use nodemysql;

    #设置数据库编码为utf8mb4(设置一下编码，若是设置失败请升级mysql版本)
    set names utf8mb4;

    #导入数据库文件
    source 数据库文件路径;

    #查看数据库中的表内容
    show tables;
    ```


5. 在 `mpvue-shop-node` 项目中执行 `nodemon app.js` 到此，你应该能看到完整的效果

## 一些坑

### ①实时编译node代码的包，需要自行安装才有`nodemon`命令，用`node`命令也是一样的效果

### ②需要关闭小程序设置中，否则后端数据无法加载

![image-20200722115926517](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200722115926517.png)

### ③关于数据库版本问题

本人数据库版本`5.7.29 MySQL Community Server (GPL)`

**http500错误**

mysql是默认密码验证是严格模式、将他设置为普通模式就能解决问题

>大意是8.0.4开始mysql引入一个caching_sha2_password模块作为默认身份验证插件，数据库连接时验证身份的工作方式(handshake process)会与以往不同。
>
>但以前版本的通过mysql_native_password 创建的账户仍然可以正常工作，只是验证这些账户时会切回mysql_native_password的工作方式，以此实现向下兼容。
>
>nodejs版本尚未跟进caching_sha2_password的实现，所以需要通过上面命令来手动切换验证账号方式。

`yourpassword `是你的数据库账户密码，`root`和`localhost`也是

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
flush privileges;
```

alter user 'root'@'localhost' identified with mysql_native_password by '123456';

### ④小程序获取位置信息需要强制提示

[官方地址](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission)

**只需要在app.json配置中添加以下信息**

```json
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用提供更好的地址服务"
    }
```


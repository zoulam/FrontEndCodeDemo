const express = require('express');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');

const app = express();

//设置静态文件目录
app.use(express.static(__dirname + '/public'));

//bodyParser请求体解析中间件
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 将切片统一放在一个public/upload
const UPLOAD_DIR = path.resolve(__dirname, 'public/upload')

// 定义上传路由
app.post('/upload', function (req, res) {
    //multiparty处理上传文件,存储目录temp
    const form = new multiparty.Form({ uploadDir: 'temp' });
    form.parse(req);

    form.on('file', async (name, chunk) => {
        //存放切片目录
        let chunkDir = `${UPLOAD_DIR}/${chunk.originalFilename.split('.')[0]}`
        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir);
        }

        //分片按索引再次命名
        var dPath = path.join(chunkDir, chunk.originalFilename.split('.')[1]);

        // 将分片从临时目录(temp)放到同名目录下
        await fse.move(chunk.path, dPath, { overwrite: true })
    })

    res.send('文件上传成功')
})

// 文件合并

app.post('/merge', async function (req, res) {
    let name = req.body.name;// 请求体的名字是 文件名.类型
    let fname = name.split('.')[0];//文件名获取文件夹名：深入React技术栈
    console.log(`文件夹名:${fname}`);

    let chunkDir = path.join(UPLOAD_DIR, fname);//切片路径
    console.log(`切片路径:${chunkDir}`);

    let chunks = await fse.readdir(chunkDir);//切片名，此处await是为了防止有遗漏
    // let len = chunks.length;
    // chunks.push(len + "");

    process.stdout.write('排序前：');
    console.log(chunks);

    // 排序并合并文件
    let sortChunks = chunks.sort((a, b) => a - b);
    process.stdout.write('排序后：');
    console.log(sortChunks);//切片排序后数组

    sortChunks.map(chunkPath => {
        fs.appendFileSync(path.join(UPLOAD_DIR, name),fs.readFileSync(`${chunkDir}/${chunkPath}`))
});


//删除分片
fse.removeSync(chunkDir);
res.send({ msg: '合并成功', url: `https://localhost:3000/upload/${name}` })
})

app.listen(3000);
console.log("http://localhost:3000");

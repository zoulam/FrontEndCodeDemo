var path = require("path");
var fs = require("fs-extra");

var pathName = "F:/Code/vscode/FontendDemo/09nodeJs/01大文件上传/fileupload/public/upload/深入React技术栈";

async function getfname() {
    let fname = await fs.readdir(pathName);
    return fname;
}

sortChunks = getfname();


// 排序并合并文件
sortChunks.map(chunkPath => {
    fs.appendFileSync(
        path.join('F:/Code/vscode/FontendDemo/09nodeJs/01大文件上传/fileupload/public/upload', '深入React技术栈.pdf'),
        fs.readFileSync(`${pathName}/${chunkPath}`))
})
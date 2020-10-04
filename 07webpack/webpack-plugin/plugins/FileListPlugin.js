/**
 * 在指定文件存储文件的 文件名文件大小
 */
class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename;
    }
    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin',
            /**
             *
             * @param {*} compilation 大量的文件信息
             * @param {*} cb
             */
            (compilation) => {
                let assets = compilation.assets;
                let content = `## 文件名    资源大小\r\n`
                // [[bundle.js,{}],[index.html,{}]]
                Object.entries(assets).forEach(([filename, statObj]) => {
                    content += `- ${filename}   ${statObj.size()}\r\n`
                });
                // 资源对象 assets
                assets[this.filename] = {
                    source() {
                        return content;
                    },
                    size() {
                        return content.length;
                    }
                }
            })
    }
}

module.exports = FileListPlugin;
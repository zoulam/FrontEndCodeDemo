const fs = window.require('fs').promises
const path = window.require('path')

const fileHelper = {
    readFile: (path) => {
        return fs.readFile(path, { encoding: 'utf8' })
    },
    writeFile: (path, content) => {
        return fs.writeFile(path, content, { encoding: 'utf8' })
    },
    renameFile: (path, newPath) => {
        return fs.rename(path, newPath)
    },
    deleteFile: (path) => {
        return fs.unlink(path)
    }
}

export default fileHelper

// ---------------------test code--------------------------------
// const testPath = path.resolve(__dirname, 'fileHelper.js')
// const wirtePath = path.resolve(__dirname, 'test.md')
// const rename = path.resolve(__dirname, 'rename.md')

// // fileHepler.readFile(testPath).then(value => {
// //     console.log(value.toString())
// // })

// // fileHepler.writeFile(wirtePath, '# h1').then(value=>{
// //     console.log('write success');
// // })

// // fileHepler.renameFile(wirtePath, rename).then(value => {
// //     console.log('rename success')
// // });
// fileHepler.deleteFile(rename).then(value=>{
//     console.log('delete success');
// })
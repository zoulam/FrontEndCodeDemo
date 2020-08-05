//获取输入
const log = (arguments) => console.log(arguments)
// 获取Selector
const e = (sel) => document.querySelector(sel)

// 获取editor 和预览
let editor = e('#editor')
let val = ''
let preview = e('#preview')
let md = new Remarkable();
editor.addEventListener('keyup', () => {
    log('开始输入！');
    val = editor.value;
    md.render(val);
    preview.innerHTML = text;
})
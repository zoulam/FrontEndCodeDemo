const xss = require('xss');
// blog
const { exec, escape } = require('../db/mysql');
// 获取博客列表
const getList = (author, keyword) => {
    // 先返回格式正确的假数据
    // 每个语句都留空格是为了保证后续能够正常拼接
    // 1=1是永远成立的，防止后面的语句全部无法生效而导致语句错误

    // 在url中也是如此 使用a=1
    // index.html?a=1&username=zoulam&password=12346
    // ?跟where
    // a=1 跟1=1
    let sql = `select * from blogs where 1=1 `;

    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    // 按照创建时间降序排列
    sql += `order by createtime desc;`
    return exec(sql);
}

// 获取博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`;
    return exec(sql).then((value) => {
        return value[0];// 将对象从数组中取出
    });
}

// 新建博客
const newBlog = (blogData = {}) => {
    // blogData是一个博客对象，包含title content author 属性
    const title = xss(blogData.title);
    console.log(title);
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now();

    let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createTime},'${author}')`;

    return exec(sql).then(value => {
        // console.log('this is blogdata',value);
        return {
            id: value.insertId //获取数据库中的插入id 并且赋给新建博客
        }
    });
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
    // blogData是一个博客对象，包含title content 属性
    const title = blogData.title;
    const content = blogData.content;
    let sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `;

    return exec(sql).then(value => {
        // console.log(value);
        if (value.affectedRows > 0) {//操作数据库之后的返回值
            return true;
        }
        return false;
    });
}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}';`;
    return exec(sql).then(value => {
        console.log(value);
        if (value.affectedRows > 0) {//操作数据库之后的返回值
            return true;
        }
        return false;
    });
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
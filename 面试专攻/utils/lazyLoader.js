; (function lazyLoader(win, doc) {
    /**
     * oImgList 图片容器 <ul>
     * data 图片地址数据
     * imgTpl 图片模板 <li>
     * oImgs 模板列表 <img>
     */
    let oImgList = doc.getElementsByClassName('J_imgList')[0],
        data = JSON.parse(doc.getElementById('J_data').innerHTML),
        imgTpl = doc.getElementById('J_imgTpl').innerHTML,
        oImgs = document.getElementsByClassName('list-img');

    let init = function () {
        oImgList.innerHTML = renderList(data);
        bindEvent();
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200)

    }

    let bindEvent = function () {
        window.onload = window.onscroll = throttle(imgLazyLoad(oImgs), 1000)
    }

    let renderList = function (data) {
        let list = '';
        data.forEach(elem => {
            list += imgTpl.replace(/{{(.*?)}}/g, (node, key) => {
                key = key.trim();
                return {
                    img: elem.img,
                    name: elem.name
                }[key];
            })
        });
        return list;
    }

    init();
})(window, document);

function imgLazyLoad(images) {
    let imgLen = images.length,
        n = 0;
    return function () {
        let cHeight = document.documentElement.clientHeight,
            sTop = document.documentElement.scrollTop || document.body.scrollTop,
            imgItem;
        console.log(cHeight, sTop);
        for (let i = n; i < imgLen; i++) {
            imgItem = images[i];
            if (imgItem.offsetTop < cHeight + sTop) {
                imgItem.src = imgItem.getAttribute('data-src');
                imgItem.removeAttribute('data-src')
                n++;
            }
        }
    }
}

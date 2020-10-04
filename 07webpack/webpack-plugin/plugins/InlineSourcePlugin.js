/**
 * @description 将HTML中的 link 直接变换成css代码 script 变成 js 以达到减少http请求的目的
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourcePlugin {
    /**
     *
     * @param {new RegExp()} param0
     */
    constructor({ match }) {
        this.reg = match;
    }
    /**
     *
     * @param {*} tag 标签对象
     * tagName: 'link',
     * voidTag: true,
     * attributes: { href: 'mian.css', rel: 'stylesheet' }
     *
     * tagName: 'script',
     * voidTag: false,
     * attributes: { defer: false, src: 'bundle.js' }
     * @param {*} compilation
     */
    processTag(tag, compilation) {
        let newTag, url;

        if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: 'style',
                attributes: { type: 'text/css' }
            }
            url = tag.attributes.href;
        }

        if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: 'script',
                attributes: { type: 'appliction/javascript' }
            }
            url = tag.attributes.src;
        }

        if (url) {
            // compilation编译对象  assets文件对象 source文件资源
            newTag.innerHTML = compilation.assets[url].source();
            // 删除js 和 css 文件
            delete compilation.assets[url];
            return newTag;
        }

        return tag;
    }

    // 处理所有标签
    processTags(data, compilation) {// 处理引入标签的数据
        let headTags = [];
        let bodyTags = [];
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation));
        });
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilation));
        });
        return { ...data, headTags, bodyTags }
    }
    apply(compiler) {
        // 使用webpack实现功能
        compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin', (data, cb) => {
                data = this.processTags(data, compilation); // compilation.assets
                cb(null, data)
            })
        })
    }
}

module.exports = InlineSourcePlugin;
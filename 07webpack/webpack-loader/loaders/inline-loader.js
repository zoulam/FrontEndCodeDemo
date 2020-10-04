const { SourceNode } = require("source-map")

module.exports = function loader(source){
    console.log('inline loader');
    return source;
}
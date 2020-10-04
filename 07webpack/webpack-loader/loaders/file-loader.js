let loaderUtils = require('loader-utils')
function loader(source) {
    let filename = loaderUtils.interpolateName(
        this, '[hash].[ext]', { content: source }
    );
    this.emitFile(filename, source);
    return `modules.export=${filename}`
}

module.exports = loader;
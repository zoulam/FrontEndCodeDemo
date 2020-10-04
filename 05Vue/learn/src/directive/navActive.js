export default {
    bind(el, binding) { // el 是root节点 ，binding 是 bind的节点
        // console.log(el, binding);
        const options = binding.value;
        const { className, activeClass, curIndex } = options;
        const children = el.getElementsByClassName(className);
        children[curIndex].className += ` ${activeClass}`;
    },
    update(el, binding) {
        const options = binding.value;
        const oldOptions = binding.oldValue;
        // console.log(el, binding);
        const { className, activeClass, curIndex } = options;
        const children = el.getElementsByClassName(className);
        const { curIndex: oldCurIndex } = oldOptions;
        children[curIndex].className += ` ${activeClass}`;
        children[oldCurIndex].className = className;
    },
}
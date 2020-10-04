(function (modules) {
  var installedModules = {};
  // 实现__webpack_require__方法
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
// 这是立即执行函数的超长参数以键（路径）值（一个文件）对存在的内容
  ({
    "./src/a.js":
      (function (module, exports, __webpack_require__) {
        eval("const b = __webpack_require__(/*! ./base/b.js */ \"./src/base/b.js\")\r\nmodule.exports = 'a' + b;\n\n//# sourceURL=webpack:///./src/a.js?");
      }),
    "./src/base/b.js":
      (function (module, exports) {
        eval("module.exports = 'b';\n\n//# sourceURL=webpack:///./src/base/b.js?");
      }),
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        eval("let ans = __webpack_require__(/*! ./a.js */ \"./src/a.js\")\r\nconsole.log(ans);\n\n//# sourceURL=webpack:///./src/index.js?");
      })
  });


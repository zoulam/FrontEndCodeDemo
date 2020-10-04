// 给你一把"螺丝刀"——recast
const recast = require("recast");

// 你的"机器"——一段代码
// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构
const code =
  `
  function add(a, b) {
    return a +
      // 有什么奇怪的东西混进来了
      b
  }
  `
// // 用螺丝刀解析机器
const ast = recast.parse(code);
// // console.log(ast);
// console.log('-------------------------------------------');
// // ast可以处理很巨大的代码文件
// // 但我们现在只需要代码块的第一个body，即add函数
const add  = ast.program.body[0]

// // console.log(add)
// // console.log('-------------------------------------------');
// // // 函数的第一个参数
// // console.log(add.params[0])
// // console.log('-------------------------------------------');
// // 获取函数的[ReturnStatement]区域
// console.log(add.body.body[0].argument.left)

// 引入变量声明，变量符号，函数声明三种“模具”
const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders

// 将准备好的组件置入模具，并组装回原来的ast对象。
ast.program.body[0] = variableDeclaration("const", [
  variableDeclarator(add.id, functionExpression(
    null, // Anonymize the function expression.（匿名函数）
    add.params,
    add.body
  ))
]);

//将AST对象重新转回可以阅读的代码
const output = recast.print(ast).code;

console.log(output)
const tree = {
    name: 'root',
    children: [
        {
            name: 'c1',
            children: [
                {
                    name: 'c11',
                    children: []
                },
                {
                    name: 'c12',
                    children: []
                }
            ]
        },
        {
            name: 'c2',
            children: [
                {
                    name: 'c21',
                    children: []
                },
                {
                    name: 'c22',
                    children: []
                }
            ]
        }
    ]
}

// 深度优先的方式遍历 打印 name
// ['root', 'c1','c11', 'c12', 'c2', 'c21', 'c22']




// 简化结构
// let node =
// {
//     name: 'zoulam',
//     children:
//         [
//             {
//                 name: 'lalaxi',
//                 nums: 0
//             }, {
//                 name: 'lalaxi',
//                 nums: 1
//             }
//         ]
// }
function solve(root) {
    let stack = [root],
        result = [];
    if (!root) return [];
    // stack.push(root)
    while (stack.length) {
        // 思路是一层一层的取出来
        // 第一层的node就是数据对象，
        let node = stack.pop()
        if (node == null) continue
        // 第一层的名字进去
        result.push(node.name)
        // node.children是数组
        for (let i = node.children.length - 1; i >= 0; i--) {
            // 这里就是面试的重点,应该从后面的节点压入栈中
            // 压入的是一个children中的子对象
            stack.push(node.children[i])
        }
    }
    return result
}

console.log(solve(tree));

function myResolve(tree) {

    let stack = [],
        result = [];
    if (!tree) return [];
    stack.push(tree);
    while (stack.length) {
        let node = stack.pop();
        if (node == null) continue;
        result.push(node.name);
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i])
        }
    }
    return result;
}

console.log(myResolve(tree))
var isBalanced = function (root) {
    if (!root) return true;
    // 获取左子树深度
    let left = dfs(root.left);
    // 获取右子树深度
    let right = dfs(root.right);
    if (Math.abs(right - left) > 1) return false;
    // 当前平衡递归下一层节点
    return isBalanced(root.left) && isBalanced(root.right)
};

/** 获取深度 */
function dfs(root) {
    if (!root) return 0
    return Math.max(dfs(root.left), dfs(root.right)) + 1
}
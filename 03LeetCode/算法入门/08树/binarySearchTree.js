// 二叉搜索树容易获取最值
function BinarySearchTree() {
    this.root = null;

    function Node(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    BinarySearchTree.prototype.insert = function (key) {
        let newNode = new Node(key);
        if (this.root == null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        // 向左查找
        if (newNode.key < node.key) {
            if (node.left == null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {// 向右查找
            if (node.right == null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 前序遍历的简写，拆分handler了是为了能够方便的自定义打印格式
    BinarySearchTree.prototype.prev = function () {
        let ans = [];
        let getValue = (node) => {
            if (node != null) {
                getValue(node.left)
                ans.push(node.key)
                getValue(node.right)
            }
        }
        getValue(this.root)
        return ans;
    }


    // 先序遍历
    BinarySearchTree.prototype.prevOrderTraversal = function (handler) {
        this.prevOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.prevOrderTraversalNode = function (node, handler) {
        if (node != null) {

            //   只要是非空节点就继续处理，然后处理左节点，最后处理右节点

            // 处理经过的节点
            handler(node.key);
            // 处理经过的左节点
            this.prevOrderTraversalNode(node.left, handler)
            // 处理经过的右节点
            this.prevOrderTraversalNode(node.right, handler)
        }
    }

    // 中序遍历
    BinarySearchTree.prototype.midOrderTraversal = function (handler) {
        this.midOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.midOrderTraversalNode = function (node, handler) {
        if (node != null) {
            // 直到找到最根部左子树，才第一次执行handler
            this.midOrderTraversalNode(node.left, handler)
            // A B D（node.left == null） 终止递归
            // 处理经过的节点
            handler(node.key);// D
            // 处理经过的右节点
            this.midOrderTraversalNode(node.right, handler)
        }
    }

    BinarySearchTree.prototype.backOrderTraversal = function (handler) {
        this.backOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.backOrderTraversalNode = function (node, handler) {
        if (node != null) {
            this.backOrderTraversalNode(node.left, handler)
            this.backOrderTraversalNode(node.right, handler)
            handler(node.key);
        }
    }
    BinarySearchTree.prototype.min = function () {
        if (this.root.left == null) return this.root.key;
        let cur = this.root.left;
        while (cur.left) {
            cur = cur.left;
        }
        return cur.key;
    }
    BinarySearchTree.prototype.max = function () {
        if (this.root.right == null) return this.root.key;
        let cur = this.root.right;
        while (cur.right) {
            cur = cur.right;
        }
        return cur.key;
    }

    BinarySearchTree.prototype.search = function (key) {
        let node = this.root;
        while (node != null) {
            if (node.key > key) {
                node = node.left;
            } else if (node.key < key) {
                node = node.right;
            } else {
                return true;
            }
        }
        return false;
    }

    BinarySearchTree.prototype.remove = function (key) {
        // 获取节点
        let current = this.root;
        let parent = null;
        let isLeftChildren = true;
        while (current.key != key) {
            parent = current;
            if (current.key > key) {
                current = current.left;
            } else if (current.key < key) {
                current = current.right;
                isLeftChildren = false;
            }
            // 没有找到
            if (current == null) return false;
        }
        // 删除节点
        // 删除的节点是叶子节点
        if (current.left == null && current.right == null) {
            if (current == this.root) {
                this.root = null;
            } else if (isLeftChildren) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }

        // 删除的节点只有一个子节点
        else if (current.right == null) {
            if (current == this.root) {
                this.root = current.left;
            } else if (isLeftChildren) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else if (current.left == null) {
            if (current == this.root) {
                this.root = current.right;
            } else if (isLeftChildren) {
                parent.left = current.right;
            } else {
                parent.right = current.right;

            }
        }


        // 删除的节点有两个子节点
        else {
            let successor = this.getSuccessor(current)
            if (current == this.root) {
                this.root = current.right;
                // 后继
            } else if (isLeftChildren) {
                parent.left = successor;
            } else {
                parent.right = successor;
            }
            successor.left = current.left;
        }

    }
    // 找后继
    BinarySearchTree.prototype.getSuccessor = function (node) {
        let successor = node;
        let current = node.right;
        let successorParent = node;

        while (current != null) {
            successorParent = successor;
            successor = current;
            current = current.left;
        }
        // 后继不是被删除节点的右节点
        if (successor != node.right) {
            successorParent.left = successor.right;
            successor.right = node.right;
        }
        return successor;
    }
}

let bst = new BinarySearchTree();
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)


console.log(bst.prev());
console.log(bst.min());
console.log(bst.max());
console.log(bst.search(26));
console.log('-------------------------------------------');

bst.remove(9)
bst.remove(7)
bst.remove(15)

let resultString1 = '';
bst.backOrderTraversal((key) => {
    resultString1 += key + ' '
})
console.log(resultString1);


// 树的内容不是均匀分布（非平衡树），在极端情况下甚至会变成链表，效率会下降
// AVL树也是实现平衡树（但是插入删除的效率不如红黑树）

function ArrayList() {
    this.array = [];
    this.len = 0;
    ArrayList.prototype.insert = function (item) {
        this.array.push(item);
        this.len++;
    }

    ArrayList.prototype.toString = function () {
        return this.array.join('--')
    }

    ArrayList.prototype.exchange = function (index1, index2) {
        let temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp

    }

    // 冒泡排序， O(n^2) === n - 1 + n - 2 + n - 1
    ArrayList.prototype.bubbleSort = function () {
        for (let i = 0; i < this.len - 1; i++) {
            for (let j = i + 1; j < this.len; j++) {
                if (this.array[i] > this.array[j]) {
                    this.exchange(i, j)
                }
            }
        }
    }

    // 选择排序：
    // 单层循环找到最值才交换 O(n^2) 交换次数减少
    ArrayList.prototype.selectionSort = function () {
        for (let j = 0; j < this.len - 1; j++) {
            let min = j;
            for (let i = j + 1; i < this.len; i++) {
                if (this.array[i] < this.array[min]) {
                    min = i;
                }
            }
            this.exchange(min, j)
        }
    }

    // 插入排序
    // 实现局部有序，后续的数据再局部有序中插入
    // 比较次数较少，循环次数也减少
    ArrayList.prototype.insertSort = function () {
        for (let i = 0; i < this.len; i++) {
            let temp = this.array[i];
            let j = i;
            // 只要前面的有序数据比后面的大就要交换
            while (temp < this.array[j - 1] && j > 0) {
                // 后移
                this.array[j] = this.array[j - 1]
                j--;
            }
            // 找到位置前移;
            this.array[j] = temp
        }
    }

    // 希尔排序
    // 首个出现的时间复杂度小于O(n^2)的算法
    // 最坏O(n^3/2)
    ArrayList.prototype.shellSort = function () {
        let gap = Math.floor(this.len / 2);
        // 分组之后插入排序
        while (gap >= 1) {
            // 找中间的
            for (let i = gap; i < this.len; i++) {
                let temp = this.array[i];
                let j = i;

                // j >= 0
                // j - gap >= 0 || j > gap - 1
                // 0和gap位置的比较
                while (temp < this.array[j - gap] && j - gap >= 0) {
                    this.array[j] = this.array[j - gap]
                    j -= gap;
                }
                this.array[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
    }

    // 冒泡排序的升级版
    // 快速排序
    // pivot(中间位置的数值)
    // O(nlogn)
    ArrayList.prototype.getPivot = function (left, right) {
        let center = Math.floor((left + right)/2);
        if (this.array[left] > this.array[center]) {
            this.exchange(left, center)
        }
        if (this.array[left] > this.array[right]) {
            this.exchange(left, right)
        }
        if (this.array[center] > this.array[right]) {
            this.exchange(center, right)
        }
        this.exchange(center, right - 1)
        return this.array[right - 1]
    }
    ArrayList.prototype.quickSort = function () {
        this.quick(0, this.len - 1);
    }

    ArrayList.prototype.quick = function (left, right) {
        // 递归结束条件
        if (left >= right) return;
        let pivot = this.getPivot(left, right);
        let i = left;
        let j = right - 1;
        // 开始进行交换
        while (true) {
            while (this.array[++i] < pivot) { }
            while (this.array[--j] > pivot) { }
            // 非正常顺序的两个值交换
            if (i < j) {
                this.exchange(i, j)
            } else { // 两根指针重叠，单次递归结束
                break;
            }
        }
        // console.log(i);
        this.exchange(i, right - 1)

        this.quick(left, i - 1)
        this.quick(i + 1, right)
    }
}

let nums = new ArrayList();
nums.insert(1)
nums.insert(0)
nums.insert(7)
nums.insert(8)
nums.insert(9)
nums.insert(34)
nums.insert(3)
nums.insert(11)
console.log(nums.toString());
// nums.bubbleSort();
// nums.selectionSort();
// nums.insertSort();
// nums.shellSort();
nums.quickSort();
console.log(nums.toString());

function exchange(num1, num2) {
    let temp = 0;
    temp = num1;
    num1 = num2;
    num2 = temp;
    return num1, num2;
}

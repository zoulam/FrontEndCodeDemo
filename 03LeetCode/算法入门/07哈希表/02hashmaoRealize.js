function HashMap() {
    this.storage = [];
    this.count = 0; // 已经存放的数据个数，当到达临界值时就可以扩容
    this.limit = 7;// 数组初始化空间,数组的长度是一个质数，有利于元素均匀分布
    HashMap.prototype.hashFunc = function (str, size) {
        let hashCode = 0;
        for (let i = 0; i < str.length; i++) {
            hashCode = hashCode * 37 + str.charCodeAt(i);
        }
        let index = hashCode % size;
        return index;
    }

    // key 生成索引信息，value实体值
    HashMap.prototype.put = function (key, value) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index];
        if (!bucket) {
            bucket = [];
            this.storage[index] = bucket;
        }
        // 修改
        // tuple 存放数据的元组
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] == key) {
                tuple[1] = value;
                return;
            }
        }
        //添加
        bucket.push([key, value]);
        this.count++;

        // 判断是否需要扩容
        if (this.count / this.limit > 0.75) {
            let newSize = this.limit * 2;
            let newPrime = this.getPrimeNum(newSize)
            this.resize(newPrime)
        }

    }
    HashMap.prototype.get = function (key) {
        let index = this.hashFunc(key, this.limit);
        let bucket = this.storage[index];
        if (bucket == null) return null;
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (key == tuple[0]) return tuple[1];
        }
        return null;
    }

    HashMap.prototype.remove = function (key) {
        let index = this.hashFunc(key, this.limit);
        let bucket = this.storage[index];
        if (bucket == null) return null;
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (key == tuple[0]) {
                // tuple[1] = -1;
                bucket.splice(i, 1)
                this.count--;
                return true;
            }
        }
        // 缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
            let newSize = Math.floor(this.limit / 2);
            let newPrime = getPrimeNum(newSize);
            this.resize(newPrime);
        }
        return null;
    }

    HashMap.prototype.isEmpty = function () {
        return this.count == 0;
    }

    HashMap.prototype.size = function () {
        return this.count;
    }

    // loaderFactor 负载因子（是元素个数和hashmap中的一维数组的比值）
    // 扩容之后的所有元素需要重新插入（所以扩容是需要消耗大量内存的）
    // 在Java中的负载因子大于0.75时就进行扩容
    HashMap.prototype.resize = function (newLimit) {
        let oldStorage = this.storage;
        this.storage = [];
        this.count = 0;
        this.limit = newLimit;
        for (let i = 0; i < oldStorage.length; i++) {
            let bucket = oldStorage[i];

            if (bucket == null) {
                continue;
            }

            for (let j = 0; j < bucket.length; j++) {
                let tuple = bucket[i];
                this.put(tuple[0], tuple[1]);
            }
        }
    }

    HashMap.prototype.isPrimeNum = function (num) {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    HashMap.prototype.getPrimeNum = function (num) {
        while (!this.isPrimeNum(num)) {
            num++;
        }
        return num;
    }

}

let table = new HashMap();
table.put('aac', 12)
table.put('aaa', 13)
table.put('aab', 14)
console.log(table.get('aaa'));
table.put('aaa', 20)
console.log(table.get('aaa'));
table.remove('aac')
console.log(table.get('aac'));
console.log();
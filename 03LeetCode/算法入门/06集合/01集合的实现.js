// 不重复，无序
// 场景：数组去重
// 集合之间：
// 1、求交集（公共部分）、
// 2、并集（两个元素的所有元素）、
// 3、差集（仅包含在单独的集合中，即可能有两个解）、
// 4、子集（属于验证）
function MySet() {
    this.items = {};
    MySet.prototype.add = function (val) {
        // 判断重复
        if (this.has(val)) {
            return false;
        }
        this.items[val] = val;
        return true;
    }
    MySet.prototype.remove = function (val) {
        if (this.has(val)) {
            //    return new Error('don\'t have this value')
            return false;
        }
        delete this.items[val];
        return true;
    }
    MySet.prototype.has = function (val) {
        return this.items.hasOwnProperty(val);
    }
    MySet.prototype.clear = function () {
        this.items = {};
    }
    MySet.prototype.size = function () {
        return Object.keys(this.items).length;
    }
    MySet.prototype.values = function () {
        return Object.values(this.items);
    }

    // 1、求交集（公共部分）、
    MySet.prototype.interSection = function (otherSet) {
        let newSet = new MySet();
        let items = this.values();
        for (let i = 0; i < this.size(); i++) {
            if (otherSet.has(items[i])) {
                newSet.add(items[i])
            }
        }
        return newSet;
    }
    // 2、并集（两个元素的所有元素）、
    MySet.prototype.union = function (otherSet) {
        var uionSet = new MySet();
        let values = this.values();
        for (let i = 0; i < this.size(); i++) {
            uionSet.add(values[i]);
        }
        values = otherSet.values();
        for (let i = 0; i < this.size(); i++) {
            uionSet.add(values[i]);
        }
        return uionSet;
    }
    // 3、差集（仅包含在单独的集合中，即可能有两个解）、
    MySet.prototype.differenceSet = function (otherSet) {
        let items = this.values();
        for (let i = 0; i < this.size(); i++) {
            if (otherSet.has(items[i])) {
                this.remove(items[i]);
            }
        }
    }
    // 4、子集（属于验证）
    MySet.prototype.subset = function (otherSet) {
        let values = this.values();
        for (let i = 0; i < this.size(); i++) {
            let item = values[i]
            if (!otherSet.has(item)) {
                return false;
            }
        }
        return true;
    }
}

// let mySet = new MySet();
// mySet.add('aaa')
// console.log(mySet.add('aaa'));
// mySet.add('aa')
// mySet.add('aab')
// mySet.add('aac')
// mySet.add('aad')
// console.log(mySet);
// mySet.remove('aaa')
// console.log('second delete aa:', mySet.remove('aaa'));
// console.log('hasfunction:', mySet.has('aab'));
// console.log('size:', mySet.size());
// console.log('-------------------------------------------');
// console.log(mySet.values());
// console.log('-------------------------------------------');
// mySet.clear();
// console.log(mySet);

let set1 = new MySet();
set1.add('a')
set1.add('b')
set1.add('c')
let set2 = new MySet();
set2.add('a')
set2.add('g')
set2.add('c')
set2.add('b')
let ans = set1.union(set2)
console.log(ans);

let set = new Set([1, 2, , 3, '3'])
console.log(set);

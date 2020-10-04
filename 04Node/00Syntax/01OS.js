const os = require('os')
console.log(os.platform());
let nums = 0;
for (let i = 0; i < 1000; i++) {
    nums += i;
}
console.log(nums);
console.log(process.uptime());
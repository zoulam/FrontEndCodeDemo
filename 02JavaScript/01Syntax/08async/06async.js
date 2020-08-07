async function getUsername() {
    setTimeout(() => {
        console.log(`i am lihua`);
    }, 1000);
}

// getUsername();// i am lihua

console.log(getUsername());
// Promise { undefined }
// i am lihua

// async函数的返回值是Promise
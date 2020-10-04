let name = "global"
let obj = {
    name: 'A',
    age: 18,
    say: () => {
        console.log(name);// global
        console.log(age);//ReferenceError: age is not defined
    }
}

obj.say();
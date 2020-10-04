for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log('let:',i)
    }, 1000)
}

for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log("var: ",i)
    }, 1000)
}
function isPrimeNum(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
console.log(isPrimeNum(3));
console.log(isPrimeNum(100));
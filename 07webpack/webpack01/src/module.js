require('@babel/polyfill')
module.exports = 'webpack module'

class B {

}

function * gen() {
    yield 111;
}

console.log(gen().next());

console.log('123'.includes('1'));
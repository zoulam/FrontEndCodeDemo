function HandPhone(color, brand) {
    this.color = color;
    this.brand = brand;
}


//美观的书写,将挂载到prototype写在对象内
HandPhone.prototype = {
    screen: '18:9',
    system: 'Android',
    rom: '64G',
    ram: '6G',
    screen: '16:9',//覆盖前面的
    call: function () {
        console.log(this.brand + ":我是世界上最好的手机");
    }
}
var hp1 = new HandPhone('red', 'mi');
var hp2 = new HandPhone('black', 'huawei');
//继承
console.log(hp1.rom);//64G
console.log(hp2.ram);//6G
//不继承
console.log(hp1.screen);//16:9
console.log(hp2.screen);//16:9
hp2.call();//huawei:我是世界上最好的手机
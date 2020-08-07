function HandPhone(color, brand) {
    this.color = color;
    this.brand = brand;
    this.screen = '18:9';
    this.system = 'Android';
}

HandPhone.prototype.rom = '64G';
HandPhone.prototype.ram = '6G';
HandPhone.prototype.screen = '16:9';
HandPhone.screen = '21:9';
HandPhone.ram = '12G';
HandPhone.prototype = {
    price: '600$',
    ram:'18G'
}
HandPhone.price = '500$';

var hp1 = new HandPhone('red', 'mi');
var hp2 = new HandPhone('black', 'huawei');

//继承
console.log(hp1.rom);//64G-
console.log(hp2.ram);//6G

//不继承
console.log(hp1.screen);//18:9
console.log(hp2.screen);//18:9
console.log(hp2.price);

// 覆盖的关系 内部this.[value] > Object.prototype.[value] = Object.prototype = { } >Objetc.[value]
// 三必须声明的new之前，且他存在的话会将二的内容完全覆盖，Object.prototype.[value]内容不重写就会编程undefined
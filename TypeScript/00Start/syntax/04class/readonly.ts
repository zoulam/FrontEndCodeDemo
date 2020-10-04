class Animal1 {
    readonly age: number;
    // 初始化方式1
    readonly size: number = 18;
    constructor(readonly name: string = '1', size: number) {
        // 初始化方式2
        this.size = size;
    }
}
import { getTextWidth, getTextPosition } from './utils'

/**
 * 弹幕信息处理，坐标和宽度计算
 */
export default class Danmu {
    /**
     *
     * @param {*} danmu
     * @param {*} fCtx 父类上下文(即父类的实例化对象)
     */
    constructor(danmu, fCtx) {
        this.content = danmu.content;
        this.runTime = danmu.runTime;
        this.danmu = danmu;
        this.ctx = fCtx;
        this.initialize();
    }

    initialize() {
        this.color = this.danmu.color || this.ctx.color;
        this.speed = this.danmu.speed || this.ctx.speed;
        this.fontSize = 30;
        this.width = getTextWidth(this.content, this.fontSize);
        getTextPosition(this.ctx.canvas, this.fontSize, this)
    }

    draw() {
        this.ctx.canvasCtx.font = this.fontSize + 'px MicroSoft Yahei'
        this.ctx.canvasCtx.fillStyle = this.color;
        this.ctx.canvasCtx.fillText(this.content,this.x,this.y)
    }
}
import { isArray, isObject } from "./utils"
import Danmu from "./Danmu"
export default class VideoDanmu {
    /**
     *
     * @param {object} video video的dom对象
     * @param {object} canvas canvas的dom对象
     * @param {array} options 弹幕数据
     */
    constructor(video, canvas, options) {
        if (!video || !canvas || !options || !isObject(options)) return;
        if (!options.danmuData || !isArray(options.danmuData)) return;
        this.video = video;
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
        this.canvas.width = video.offsetWidth;
        this.canvas.height = video.offsetHeight;
        // 弹幕是否暂停
        this.danmuPaused = true;
        // 将用户传入的数据和默认数据合并到this上
        Object.assign(this, options, {
            runTime: 18,
            color: 'red',
            speed: 2,
        })
        this.danmuPool = this.createDanmuPool();
        this.render();
    }

    createDanmuPool() {
        // 给弹幕添加坐标
        return this.danmuData.map(dm => new Danmu(dm, this));
    }

    // 弹幕渲染
    render() {
        this.clearRect();
        this.drawDanmu();
        !this.danmuPaused && requestAnimationFrame(this.render.bind(this));
    }

    /**
     * 绘制弹幕
     * 挂载两个信息：stopDrawing 是否出界
     *              isInitialized 数据是否初始化
     */
    drawDanmu() {
        let currentTime = this.video.currentTime;
        this.danmuPool.map(danmu => {
            // 避免出界弹幕重新绘制
            if (!danmu.stopDrawing && currentTime >= danmu.runTime) {
                // 避免重复初始化
                if (!danmu.isInitialized) {
                    danmu.initialize();
                    danmu.isInitialized = true;
                }
                danmu.x -= danmu.speed;
                danmu.draw();
                if (danmu.x <= danmu.width * -1) {
                    danmu.stopDrawing = true;
                }
            }
        })
    }

    /**
    * 拖动进度条的时候重置弹幕
    * 即删除不属于此时间段的弹幕和绘制属于当前事件坐标的弹幕
    */
    reset() {
        this.clearRect();
        let currentTime = this.video.currentTime;
        console.log(currentTime);
        this.danmuPool.map(danmu => {
            danmu.stopDrawing = false;
            // 符合时间范围的
            if (currentTime <= danmu.runTime) {
                danmu.isInitialized = false;
                console.log('run');
                // 不符合时间范围的
            } else {
                console.log('stop');
                danmu.stopDrawing = true;
            }
        })
    }
    /**
     *
     * @param {object} data 添加的弹幕信息
     */
    addDanmu(data) {
        // push 添加了坐标的等信息的弹幕数据
        this.danmuPool.push(new Danmu(data, this))
    }

    /**
     * 清除画布
     */
    clearRect() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
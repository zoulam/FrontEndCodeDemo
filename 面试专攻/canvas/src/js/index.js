import VideoDanmu from './danmu/index'
const danmuData = [
    {
        content: '我是🐖',
        speed: 2,
        runTime: 0,
        color: 'green'
    },
    {
        content: '我是测试数据合并',
        speed: 2,
    },
    {
        content: '我是🐖',
        speed: 2,
        runTime: 10,
        color: 'green'
    },
    {
        content: '我是🐖',
        speed: 2,
        runTime: 5,
        color: 'green'
    },
    {
        content: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        speed: 2,
        runTime: 7,
        color: 'green'
    },
    {
        content: '好好听',
        speed: 2,
        runTime: 8,
        color: 'green'
    },
]


    ; ((doc) => {
        // 获取视频和canvas节点
        const oDanmuVideo = doc.getElementById('J_danmuVideo'),
            oDanmuCanvas = doc.getElementById('J_danmuCanvas'),
            oInput = doc.getElementsByClassName('danmu-input')[0],
            oDanmuBtn = doc.getElementsByClassName('danmu-btn')[0],
            oColorInput = doc.getElementsByClassName('color-input')[0];
        // 初始化函数
        const init = () => {
            // 实例化弹幕插件
            window.videoDanmu = new VideoDanmu(
                oDanmuVideo,
                oDanmuCanvas,
                {
                    danmuData
                }
            );
            bindEvent();

        }
        // 事件绑定
        const bindEvent = () => {
            oDanmuVideo.addEventListener('play', handleVideoPlay, false);
            oDanmuVideo.addEventListener('pause', handleVideoPause, false);
            oDanmuVideo.addEventListener('seeked', handleVideoSeek, false);
            oDanmuBtn.addEventListener('click', handlerDanmuBtnClick, false)
        }

        function handleVideoPlay() {
            videoDanmu.danmuPaused = false;
            videoDanmu.render();
        }

        function handleVideoPause() {
            videoDanmu.danmuPaused = true;
        }

        function handleVideoSeek() {
            videoDanmu.reset();
        }

        function handlerDanmuBtnClick() {
            // 暂停不发送
            if (videoDanmu.danmuPaused) return;
            // 空的不处理
            let oInputValue = oInput.value.trim();
            if (!oInputValue) return;
            let colorInputValue = oColorInput.value,
                currentTime = oDanmuVideo.currentTime;
                console.log(currentTime);
            const _data =
            {
                content: oInputValue,
                speed: 2,
                runTime: currentTime,
                color: colorInputValue
            }

            videoDanmu.addDanmu(_data);
            oInputValue = '';
        }
        // 执行模块初始化函数
        init();
    })(document);
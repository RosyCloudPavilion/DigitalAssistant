export default {
    vedio(that, url) {
        if (that.playerOrNot > 0) {
            that.player.dispose(); //销毁
            $("#J_prismPlayer").empty();
        }
        that.playerOrNot = 1;
        that.player = new Aliplayer({
            id: "J_prismPlayer", // 容器id
            source: url, //视频地址https://v.qq.com/x/page/i0897wa1wsr.html
            // source: '/vio/v2.mp4',//视频地址https://v.qq.com/x/page/i0897wa1wsr.html
            cover: "", //播放器封面图
            autoplay: true, // 是否自动播放
            width: "100%", // 播放器宽度
            height: "100%", // 播放器高度
            playsinline: true,
            skinLayout: [{
                name: "bigPlayButton",
                align: "blabs",
                x: 80,
                y: 50,
            },
            {
                name: "H5Loading",
                align: "cc",
            },
            {
                name: "errorDisplay",
                align: "tlabs",
                x: 0,
                y: 0,
            },
            {
                name: "infoDisplay",
            },
            {
                name: "tooltip",
                align: "blabs",
                x: 0,
                y: 56,
            },
            {
                name: "thumbnail",
            },
            {
                name: "controlBar",
                align: "blabs",
                x: 0,
                y: 0,
                children: [{
                    name: "progress",
                    align: "blabs",
                    x: 0,
                    y: 44,
                },
                {
                    name: "playButton",
                    align: "tl",
                    x: 15,
                    y: 12,
                },
                {
                    name: "timeDisplay",
                    align: "tl",
                    x: 10,
                    y: 7,
                    // size: 8,
                },
                {
                    name: "fullScreenButton",
                    align: "tr",
                    x: 10,
                    y: 12,
                },
                {
                    name: "volume",
                    align: "tr",
                    x: 5,
                    y: 10,
                },
                ],
            },
            ],
        });
    }
}
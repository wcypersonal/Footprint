Page({
    data: {
        showModalStatus: !0
    },
    onLoad: function(n) {
        t = this;
        wx.getSystemInfo({
            success: function(n) {
                console.log(n);
                var e = !0;
                e = n.system.indexOf("iOS") > -1, t.setData({
                    iphone: e,
                    myheight: n.windowHeight,
                    screenWidth: n.windowWidth,
                    screenHeight: n.windowHeight
                });
            }
        });
        var e = wx.createCanvasContext("shareCanvas");
        e.drawImage("../../images/mapbg.png", 0, 0, 1242, 2208), e.stroke();
        var t = this;
        console.log("----------------------------  111"), e.draw(!0, function(n) {
            wx.canvasToTempFilePath({
                width: 1242,
                height: 2208,
                destWidth: 1242,
                destHeight: 2208,
                canvasId: "shareCanvas",
                success: function(n) {
                    console.log("---------------- " + n.tempFilePath), t.setData({
                        hiddenCanvas: !0,
                        imagePath: n.tempFilePath
                    });
                },
                complete: function(n) {}
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
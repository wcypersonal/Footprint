var a = require("./data.js"), n = require("../../utils/util.js"), i = require("../../utils/server.js"), e = getApp();

Page({
    data: {
        hiddenCanvas: !0,
        extraData: {}
    },
    toshare: function() {
        var a = this.data.shareObj;
        a && (wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.path
        }), i.submitClick(a.appid));
    },
    tucao: function(){
        var that = this
        var customData = {
            nickname: "lengJing",
            avatar: "http://wx.qlogo.cn/mmopen/eBhXuS1y3rCIEeLp5YtNHLISibBfee8aNHoFKA7RbjgXQB6LB8YpiaTR6XOibwZNRv5neg4dYnfnibITanHzibk6W6nDFm73etJTm/0",
            openid: "121368577",
            // 参照 customData 里面的参数名设置
            clientInfo: " iPhone OS 10.3.1 / 3.2.0.43 / 0 ",
            imei: "7280BECE2FC29544172A2B858E9E90D0"
        }
        var extraData = {
            id: 30602,
            customData: customData
        }
        that.setData({
           extraData:extraData
        })
    },
    onLoad: function(n) {
        this.tucao()
        wx.showShareMenu({
            withShareTicket: !0
        });
        var i = e.globalData.shareObj;
        this.setData({
            shareObj: i
        });
        var t = a.province(), s = t[0].city;
        this.setData({
            province: t,
            city: s
        });
        var r = this;
        wx.getSystemInfo({
            success: function(a) {
                var n = !0;
                n = a.system.indexOf("iOS") > -1, r.setData({
                    iphone: n,
                    myheight: a.windowHeight,
                    screenWidth: a.windowWidth,
                    screenHeight: a.windowHeight
                });
            }
        });
    },
    provinceClick: function(a) {
        for (var n, i = a.currentTarget.dataset.d, e = this.data.province, t = 0; t < e.length; t++) {
            var s = e[t];
            s.id === i ? (s.cls = "cur", n = s.city) : s.cls = "pview";
        }
        this.setData({
            province: e,
            city: n
        });
    },
    cityClick: function(a) {
        for (var n = a.currentTarget.dataset.d, i = a.currentTarget.dataset.p, e = this.data.city, t = 0, s = 0; s < e.length; s++) n === e[s].id && ("citycurbtn" == e[s].cls ? e[s].cls = "citybtn" : e[s].cls = "citycurbtn"), 
        "citycurbtn" === e[s].cls && (t += 1);
        for (var r = this.data.province, s = 0; s < r.length; s++) {
            var g = r[s];
            g.id === i && (g.count = t, g.city = e);
        }
        this.setData({
            province: r,
            city: e
        });
    },
    doCancel: function() {
        this.setData({
            showModalStatus: !1,
            hiddenCanvas: !0
        });
    },
    doSubmit: function() {
        var a = this;
        wx.getUserInfo({
            fail: function(a) {
                wx.showToast({
                    title: "授权失败",
                    icon: "success",
                    image: "../../images/error.png",
                    duration: 2e3
                });
            },
            success: function(n) {
                var i = n.userInfo;
                a.setData({
                    nickName: i.nickName
                });
                for (var e = a.data.province, t = 0, s = [], r = [], g = 0, o = 0; o < e.length; o++) if (e[o].count > 0) if (t += 1, 
                1 == e[o].id) for (var c = e[o].city, d = 0; d < c.length; d++) "citycurbtn" == c[d].cls && (s.push(c[d].id), 
                r.push(c[d]), g += 1); else {
                    g += 1, s.push(e[o].id);
                    for (var c = e[o].city, d = 0; d < c.length; d++) "citycurbtn" == c[d].cls && r.push(c[d]);
                }
                t > 0 ? a.drawShareImg(s, r, g) : wx.showToast({
                    title: "请选择城市",
                    icon: "success",
                    image: "../../images/error.png",
                    duration: 2e3
                });
            }
        });
    },
    drawShareImg: function(a, n, i) {
        this.setData({
            showModalStatus: !0,
            hiddenCanvas: !1
        }), wx.showLoading({
            title: "图片生成中..."
        }), this._drawShareImg(a, n, i);
    },
    _drawShareImg: function(a, i, e) {
        this.setData({
            hiddenCanvas: !1
        });
        var t = wx.createCanvasContext("shareCanvas");
        t.drawImage("../../images/mapbg.png", 0, 0, 900, 1600), t.stroke(), t.setFontSize(40), 
        t.setFillStyle("#c8c8c8"), t.textAlign = "center", t.fillText("踏足中国          个省区，           个城市", 450, 250), 
        t.fillText("超越了                      的用户", 450, 350);
        var s = this.data.nickName;
        t.setFontSize(80), t.setFillStyle("#fac828"), t.textAlign = "center", t.fillText(s, 450, 150);
        var r = i.length;
        t.setFillStyle("#fac828"), t.fillText(e, 340, 250), t.fillText(r, 600, 250);
        var g = n.getRand(r);
        t.fillText(g + "%", 450, 350);
        for (var o = !1, c = "", d = 0, h = 0; h < i.length; h++) 2609 == i[h].id && (o = !0), 
        c += i[h].name + " ", (h + 1) % 9 == 0 && (d += 1), h != i.length - 1 && (h + 1) % 9 != 0 || (t.setFontSize(30), 
        t.setFillStyle("#000000"), t.textAlign = "left", h == i.length - 1 && (h + 1) % 9 != 0 && (d += 1), 
        t.fillText(c, 36, 1100 + 50 * d), c = "");
        n.arrayContains(a, 2) && t.drawImage("../../images/jiangsu.png", 614, 702), n.arrayContains(a, 3) && t.drawImage("../../images/zhejiang.png", 634, 769), 
        n.arrayContains(a, 4) && t.drawImage("../../images/anhui.png", 596, 709), n.arrayContains(a, 5) && t.drawImage("../../images/henan.png", 532, 678), 
        n.arrayContains(a, 6) && t.drawImage("../../images/shandong.png", 592, 642), n.arrayContains(a, 7) && t.drawImage("../../images/hebei.png", 575, 563), 
        n.arrayContains(a, 8) && t.drawImage("../../images/heilongjiang.png", 680, 361), 
        n.arrayContains(a, 9) && t.drawImage("../../images/jilin.png", 688, 496), n.arrayContains(a, 10) && t.drawImage("../../images/liaoning.png", 648, 547), 
        n.arrayContains(a, 11) && t.drawImage("../../images/neimenggu.png", 347, 363), n.arrayContains(a, 12) && t.drawImage("../../images/xinjiang.png", 22, 441), 
        n.arrayContains(a, 13) && t.drawImage("../../images/xizang.png", 89, 672), n.arrayContains(a, 14) && t.drawImage("../../images/qinghai.png", 243, 624), 
        n.arrayContains(a, 15) && t.drawImage("../../images/gansu.png", 282, 559), n.arrayContains(a, 16) && t.drawImage("../../images/ningxia.png", 450, 622), 
        n.arrayContains(a, 17) && t.drawImage("../../images/shanxi.png", 467, 615), n.arrayContains(a, 18) && t.drawImage("../../images/shanxi1.png", 528, 600), 
        n.arrayContains(a, 19) && t.drawImage("../../images/hubei.png", 500, 730), n.arrayContains(a, 20) && t.drawImage("../../images/hunan.png", 509, 790), 
        n.arrayContains(a, 21) && t.drawImage("../../images/jiangxi.png", 573, 794), n.arrayContains(a, 22) && t.drawImage("../../images/fujian.png", 606, 826), 
        n.arrayContains(a, 23) && t.drawImage("../../images/taiwan.png", 651, 875), n.arrayContains(a, 24) && t.drawImage("../../images/guangdong.png", 516, 877), 
        n.arrayContains(a, 25) && t.drawImage("../../images/guangxi.png", 450, 859), n.arrayContains(a, 26) && t.drawImage("../../images/hainan.png", 505, 973), 
        n.arrayContains(a, 27) && t.drawImage("../../images/sichuan.png", 345, 710), n.arrayContains(a, 28) && t.drawImage("../../images/guizhou.png", 439, 810), 
        n.arrayContains(a, 29) && t.drawImage("../../images/yunnan.png", 347, 805), n.arrayContains(a, 101) && t.drawImage("../../images/beijing.png", 601, 592), 
        n.arrayContains(a, 102) && t.drawImage("../../images/shanghai.png", 675, 757), n.arrayContains(a, 103) && t.drawImage("../../images/tianjin.png", 617, 606), 
        n.arrayContains(a, 104) && t.drawImage("../../images/chongqing.png", 460, 750), 
        n.arrayContains(a, 105) && t.drawImage("../../images/xianggang.png", 585, 940), 
        n.arrayContains(a, 106) && t.drawImage("../../images/aomen.png", 570, 943), o && t.drawImage("../../images/nanshaqundao.png", 497, 1093);
        var m = this;
        t.draw(!0, function(a) {
            wx.canvasToTempFilePath({
                width: 900,
                height: 1600,
                destWidth: 900,
                destHeight: 1600,
                canvasId: "shareCanvas",
                success: function(a) {
                    m.setData({
                        hiddenCanvas: !0,
                        imagePath: a.tempFilePath
                    });
                },
                complete: function(a) {
                    wx.hideLoading();
                }
            });
        });
    },
    _drawCity: function(a, n, i) {
        n = 866 + 15 * (116 - n), i = 890 + 30 * (i - 40), a.setFontSize(50), a.setFillStyle("#000"), 
        a.textAlign = "center", a.fillText("·", n, i);
    },
    saveImg: function() {
        var a = this, n = this.data.imagePath;
        return wx.saveImageToPhotosAlbum({
            filePath: n,
            success: function(n) {
                wx.showToast({
                    title: "已保存到相册",
                    icon: "success",
                    duration: 2e3
                }), a.setData({
                    hiddenCanvas: !0
                });
            }
        });
    },
    cancel: function() {
        this.setData({
            showModalStatus: !1,
            hiddenCanvas: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "[有人@我]来来来，炫一下你的诗和远方",
            path: "/pages/index/index"
        };
    }
});
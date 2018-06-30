var a = require("../../utils/util.js"), t = require("../../utils/server.js"), n = getApp();

Page({
    data: {
        btntext: " "
    },
    onLoad: function(i) {
        var o = this;
        wx.showShareMenu({
            withShareTicket: !0
        }), t.getConfig(function(t) {
            if (t.data) {
                var i = [], e = null, r = null, u = null;
                if (t.data) for (var d = 0; d < t.data.length; d++) {
                    var s = t.data[d];
                    0 === s.id || 1 === s.id || 2 === s.id || 3 === s.id ? i.push(s) : 4 === s.id ? e = s : 5 === s.id ? r = s : 6 === s.id && (u = s);
                }
                n.globalData.leftArr = i, n.globalData.moreObj = e, n.globalData.bannerObj = r, 
                n.globalData.shareObj = u;
                var l = null;
                i && i.length > 0 && (l = i[a.rand(0, i.length - 1)]), o.setData({
                    moreObj: e,
                    bannerObj: r,
                    shareObj: u,
                    randObj: l
                });
            }
        });
    },
    onReady: function() {
        setTimeout(function() {
            wx.redirectTo({
                url: "/pages/main/main"
            });
        }, 2e3);
    },
    formSubmit: function(a) {
        wx.navigateTo({
            url: "/pages/zuji/zuji"
        });
        var n = a.detail.formId;
        wx.login({
            success: function(a) {
                var i = a.code;
                t.uploadFormId(i, n);
            }
        });
    },
    cavs: function() {
        wx.navigateTo({
            url: "/pages/cavs/cavs"
        });
    },
    showWin: function() {
        this.setData({
            showModalStatus: !0
        });
    },
    doClose: function() {
        this.setData({
            showModalStatus: !1
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    tomore: function() {
        var a = this.data.moreObj;
        a && (wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.path
        }), t.submitClick(a.appid));
    },
    torand: function() {
        var a = this.data.randObj;
        a && (wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.path
        }), t.submitClick(a.appid));
    },
    tobanner: function() {
        var a = this.data.bannerObj;
        a && (wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.path
        }), t.submitClick(a.appid));
    },
    onShareAppMessage: function() {
        return {
            title: "别再说诗和远方了，这些地方你去过吗？",
            path: "/pages/index/index"
        };
    }
});
var t = require("./util.js"), i = getApp();

module.exports = {
    getConfig: function(t) {
        wx.showLoading({
            title: "数据加载中..."
        });
        wx.request({
            url: "https://zuji.weixinpy.com/0zuji/config.json",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(i) {
                i.data instanceof Array && "function" == typeof t && t(i);
            },
            fail: function(t) {},
            complete: function(t) {
                wx.hideLoading();
            }
        });
    },
    uploadFormId: function(t, o) {
        wx.request({
            url: i.HTTP_SERVER + "app/zuji/submitformid.htm",
            data: {
                code: t,
                formid: o
            },
            method: "POST",
            header: {
                sessionkey: "zujisk",
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {},
            fail: function(t) {}
        });
    },
    submitClick: function(o) {
        if (o) {
            var e = t.formatNow();
            console.log(e), wx.request({
                url: i.HTTP_SERVER + "app/zuji/submitclick.htm",
                data: {
                    appid: e + "-" + o
                },
                method: "POST",
                header: {
                    sessionkey: "zujisk",
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }
};
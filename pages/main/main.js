var a = require("../../utils/util.js"), t = require("../../utils/server.js"), n = getApp();

Page({
    data: {
    },
    onLoad: function(i) {
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    zuji: function () {
        wx.redirectTo({
            url:"/pages/zuji/zuji"
        })
    }
});
// ==UserScript==
// @name         去除安全中心，直接跳转链接地址。
// @version      0.0.1
// @match        http*://*.zhihu.com/*
// @match        http*://*.jianshu.com/*
// @match        http*://*.ld246.com/*
// @match        http*://*.juejin.cn/*
// @match        http*://*.zhihu.com/*
// @grant        none
// @license      GPLv3

// ==/UserScript==

(function () {
    /// 地址类型
    /// https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Falibaba%2Ffish-redux
    /// https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Falibaba%2Ffish-redux
    /// https://link.zhihu.com/?target=https%3A//www.royalapplications.com/ts/mac/features

    /// 获取所以a标签
    /// 循环判断 a 标签是否包含两个 http 字样
    /// 截取最后一个 http 内容, 并格式化
    /// 理论上支持所有网页
    /// 如需支持其他网页,请在头部新增你需要的网址
    /// 例如: @match        https://*.zhihu.com/*

    /// 获取正确的地址用于跳转
    function getRightHref() {
        const urls = location.href.split("http");

        if (urls.length > 2) {
            var targetStr = decodeURIComponent("http" + urls[2]);
            location.href = targetStr;
        }
    }

    window.onload = () => {
        setTimeout(() => {
            getRightHref();
        }, 400);
    };
})();

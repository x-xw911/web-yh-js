// ==UserScript==
// @name         Bilibili - 在未登录的情况下自动并无限试用最高画质
// @namespace    https://bilibili.com/
// @version      0.6
// @description  在未登录的情况下自动并无限试用最高画质 | V0.6 修复 bpx_player_profile 已存在时不修改 lastView 的bug
// @license      GPL-3.0
// @author       DD1969
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

(async function () {
    "use strict";

    // no need to continue this script if user has logged in
    if (document.cookie.includes("DedeUserID")) return;

    // change 'lastView' and cancel autoplay by default
    const profileString = window.localStorage.getItem("bpx_player_profile");
    if (profileString) {
        const profile = JSON.parse(profileString);
        profile.lastView = Date.now() - 864e5;
        window.localStorage.setItem("bpx_player_profile", JSON.stringify(profile));
    } else {
        window.localStorage.setItem(
            "bpx_player_profile",
            `{"lastView": ${Date.now() - 864e5}, "media": {"autoplay": false}}`
        );
    }

    // change 'lastView' everytime when 'bpx_player_profile' is about to be modified
    const originSetItem = window.localStorage.setItem;
    window.localStorage.setItem = function (key, value) {
        if (key === "bpx_player_profile") {
            const profile = JSON.parse(value);
            profile.lastView = Date.now() - 864e5;
            value = JSON.stringify(profile);
        }
        originSetItem.call(this, key, value);
    };

    // extend trial time by overriding "window.setTimeout"
    const originSetTimeout = window.setTimeout;
    window.setTimeout = function (func, delay) {
        if (delay === 3e4) delay = 3e8;
        return originSetTimeout.call(this, func, delay);
    };

    // click the trial button automatically
    const timer4Btn = setInterval(() => {
        const trialBtn = document.querySelector(".bpx-player-toast-confirm-login");
        if (trialBtn) {
            trialBtn.click();
            clearInterval(timer4Btn);
        }
    }, 200);
})();

// ==UserScript==

// @name         界面美化
// @version      0.0.28
// @description  自定义的美化网页界面
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js
// @match        http*://*.bilibili.com/*
// @match        http*://*.bing.com/*
// @grant        GM_addStyle

// @namespace https://greasyfork.org/users/1086579
// ==/UserScript==

(function () {
    //   bilibili-宽屏模式
    function bilibiliSetWidth() {
        setTimeout(() => {
            document.querySelector(".bpx-player-ctrl-wide")?.click()

            document.querySelector(".bui-collapse-arrow-text")?.click();

            document.querySelector(".is-bottom")?.style?.display = "none"

            document.querySelector(".login-tip")?.style?.display = "none";
            
            document.querySelector(".bpx-player-video-wrap video")?.volume = 1;
        }, 3000);
    }

    const windowDpmainTypes = {
        bilibili: () => {
            bilibiliSetWidth();
        },

        bing: () => {
            /*
                #b_content{padding:41px 0 20px 0;margin:0 auto;width:80%;}
                #b_results li {margin: 28px 0 2px;}
                .b_ans{display:none}
            */
            GM_addStyle(`
                #b_results{width:60%}
            `);

            document.querySelector(".b_logoArea")?.setAttribute("target", "");

            $("#mfa_root").css({
                top: "140px",
                bootom: "0",
                left: "0",
                right: "unset",
            });

            $(document).keydown(function (event) {
                console.log("q键被按下");
                if (
                    (event.ctrlKey || event.metaKey) &&
                    (event.keyCode == 81 || event.keyCode == 69)
                ) {
                    event.preventDefault();
                    $("#mfa_srch")[0].click();
                    $("#sb_form_q").select();
                }
            });
        },
    };

    window.onload = () => {
        const hostname = location.hostname;

        let webSite = "";

        if (hostname.includes("bing.com")) {
            webSite = "bing";
        }

        if (hostname.includes("bilibili.com")) {
            webSite = "bilibili";
        }

        console.log("webSite - >:", webSite);

        windowDpmainTypes[webSite]();
    };
})();


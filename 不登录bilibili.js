// ==UserScript==
// @name        就不登录-bilibili
// @namespace   github.com/ojer
// @match       https://www.bilibili.com/video/**
// @run-at      document-end
// @version     0.1
// @description  关闭播放 60 秒后的登录框并继续播放

// ==/UserScript==
const config = {
    dataScreen: "normal",
    biliScriptActive: 1,
    manual: 1,
    nIntervId: 0,
};

const callback = (mutationsList) => {
    const typeChildList = "childList";
    const loginDiaClass = "bili-mini-mask";
    mutationsList.forEach(({ type, addedNodes }) => {
        if (type !== typeChildList) {
            return;
        }

        for (let addedNode of addedNodes) {
            if (!addedNode.classList) {
                return;
            }
            if (!addedNode.classList.contains(loginDiaClass)) {
                return;
            }
            config.manual = 0;
            document.querySelector(".bili-mini-close-icon").click();
            setTimeout(() => {
                switch (config.dataScreen) {
                    case "full":
                    case "web":
                        document.querySelector(".bpx-player-ctrl-btn.bpx-player-ctrl-web").click();
                        break;
                    case "wide":
                        // document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-wide').click()
                        break;
                    case "normal":
                        break;
                    default:
                }
                // console.debug('play?',  config.biliScriptActive === 1)
                if (config.biliScriptActive === 1) {
                    unsafeWindow.player.play();
                    config.biliScriptActive = 0;
                }
                config.manual = 1;
            }, 500);
            break;
        }
    });
};

const intervalCallback = () => {
    const container = document.querySelector(
        "#bilibili-player .bpx-player-container.bpx-state-paused"
    );
    const videoTitle = document.querySelector(".video-title.special-text-indent");

    if (!container || !videoTitle) {
        return;
    }
    new MutationObserver((mutationsList) => {
        // console.debug('reset active', mutationsList)
        mutationsList.forEach((mutations) => {
            config.biliScriptActive = 1;
        });
    }).observe(videoTitle, {
        attributeFilter: ["data-title"],
    });

    new MutationObserver((mutationsList) => {
        // console.debug('screen change')
        mutationsList.forEach(({ target, oldValue }) => {
            setTimeout(() => {
                if (config.manual === 1) {
                    config.dataScreen = target.dataset.screen;
                }
            }, 300);
        });
    }).observe(container, {
        attributeFilter: ["data-screen"],
        attributeOldValue: true,
    });
    clearInterval(config.nIntervId);
};

config.nIntervId = setInterval(intervalCallback, 500);

setTimeout(() => {
    new MutationObserver(callback).observe(document.body, {
        childList: true,
    });
}, 55e3);

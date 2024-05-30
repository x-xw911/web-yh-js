// ==UserScript==
// @name         修复必应回到顶部
// @version      0.0.1
// @match        http*://*.bing.com/*

// ==/UserScript==

(function () {
    "use strict";

    function disableScrollToTop() {
        window.scrollTo = function (x, y) {
            if (y !== 0) {
                window.scrollTo.originalFunc(x, y);
            }
        };
        window.scrollTo.originalFunc = window.scrollTo;
    }

    window.addEventListener("focus", disableScrollToTop);
})();

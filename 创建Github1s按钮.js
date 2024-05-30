// ==UserScript==
// @name         显示 Github1s 按钮
// @version      0.0.1
// @match        https://github.com/*

// ==/UserScript==

/**
 * 创建 Github1s 按钮
 */
function createButton() {
    if (document.querySelector("#github1sButton")) {
        return;
    }

    const github1sUrl = `https://github1s.com${location.pathname}`;
    const element = `
            <li id="github1sButton">
                <a target="_blank" class="btn btn-sm" href="${github1sUrl}"> Github1s </a>
            </li>
        `;

    document
        .querySelector(".pagehead-actions.flex-shrink-0.d-none.d-md-inline")
        ?.insertAdjacentHTML("afterBegin", element);
}

createButton()

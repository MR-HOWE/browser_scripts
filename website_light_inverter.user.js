// ==UserScript==
// @name         Website Light Inverter
// @namespace    local.howe
// @version      1.0.0
// @description  指定网站黑底白字反转为白底黑字，并保持图片/视频原色
// @match        *://*/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @homepageURL  https://github.com/MR-HOWE/browser_scripts
// @updateURL    https://raw.githubusercontent.com/MR-HOWE/browser_scripts/main/website_light_inverter.user.js
// @downloadURL  https://raw.githubusercontent.com/MR-HOWE/browser_scripts/main/website_light_inverter.user.js
// ==/UserScript==

(function () {
    'use strict';

    const STORAGE_KEY = 'lightModeDomains';
    const STYLE_ID = 'userscript-light-inverter';

    /*
     * 初始网站列表。
     *
     * example.com 会同时匹配：
     *   example.com
     *   www.example.com
     *   abc.example.com
     *
     * 可以直接在这里填写，也可以之后通过油猴菜单修改。
     */
    const DEFAULT_DOMAINS = [
        // 'example.com',
        // 'github.com',
    ];

    function getDomains() {
        return GM_getValue(STORAGE_KEY, DEFAULT_DOMAINS);
    }

    function setDomains(domains) {
        GM_setValue(STORAGE_KEY, domains);
    }

    function normalizeDomain(domain) {
        return domain
            .trim()
            .toLowerCase()
            .replace(/^https?:\/\//, '')
            .replace(/\/.*$/, '')
            .replace(/^\*\./, '');
    }

    function domainMatches(hostname, domain) {
        domain = normalizeDomain(domain);

        return (
            hostname === domain ||
            hostname.endsWith('.' + domain)
        );
    }

    function isCurrentSiteEnabled() {
        const hostname = location.hostname.toLowerCase();

        return getDomains().some(domain =>
            domainMatches(hostname, domain)
        );
    }

    function enableLightMode() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = STYLE_ID;

        style.textContent = `
            /*
             * 整个网页反色：
             *
             * 黑 -> 白
             * 白 -> 黑
             *
             * hue-rotate(180deg) 用于尽量保持彩色 UI 的色相。
             */
            html {
                filter: invert(1) hue-rotate(180deg) !important;
                background: white !important;
            }

            /*
             * 图片、视频等再反一次，
             * 相当于恢复原本颜色。
             */
            img,
            picture,
            video,
            canvas,
            iframe {
                filter: invert(1) hue-rotate(180deg) !important;
            }
        `;

        document.documentElement.appendChild(style);
    }

    function disableLightMode() {
        document.getElementById(STYLE_ID)?.remove();
    }

    function refresh() {
        if (isCurrentSiteEnabled()) {
            enableLightMode();
        } else {
            disableLightMode();
        }
    }

    function toggleCurrentSite() {
        const hostname = location.hostname.toLowerCase();
        let domains = getDomains();

        const matched = domains.filter(domain =>
            domainMatches(hostname, domain)
        );

        if (matched.length > 0) {
            /*
             * 如果当前网站已经被某个规则覆盖，
             * 删除匹配当前网站的规则。
             */
            domains = domains.filter(domain =>
                !domainMatches(hostname, domain)
            );

            setDomains(domains);
            disableLightMode();

            alert(`已关闭：${hostname}`);
        } else {
            domains.push(hostname);
            domains = [...new Set(domains)].sort();

            setDomains(domains);
            enableLightMode();

            alert(`已开启：${hostname}`);
        }
    }

    function editDomains() {
        const domains = getDomains();

        const input = prompt(
            '每行填写一个网站域名：\n\n' +
            '例如：\n' +
            'github.com\n' +
            'reddit.com\n\n' +
            '填写 example.com 会同时作用于所有子域名。',
            domains.join('\n')
        );

        if (input === null) {
            return;
        }

        const newDomains = input
            .split(/[\n,]+/)
            .map(normalizeDomain)
            .filter(Boolean);

        setDomains([...new Set(newDomains)].sort());

        refresh();
    }

    function showDomains() {
        const domains = getDomains();

        alert(
            domains.length
                ? '当前启用的网站：\n\n' + domains.join('\n')
                : '目前没有启用任何网站。'
        );
    }

    /*
     * 页面尽早应用，减少黑色页面先闪一下再变白的问题。
     */
    refresh();

    GM_registerMenuCommand(
        isCurrentSiteEnabled()
            ? '☀️ 当前网站：关闭白底黑字'
            : '☀️ 当前网站：开启白底黑字',
        toggleCurrentSite
    );

    GM_registerMenuCommand(
        '✏️ 编辑网站列表',
        editDomains
    );

    GM_registerMenuCommand(
        '📋 查看网站列表',
        showDomains
    );
})();

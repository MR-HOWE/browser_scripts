// ==UserScript==
// @name         YouTube Larger Comments
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// @version      2026.11.09
// @homepageURL  https://github.com/MR-HOWE/browser_scripts
// @updateURL    https://raw.githubusercontent.com/MR-HOWE/browser_scripts/main/youtube_larger_comments.user.js
// @downloadURL  https://raw.githubusercontent.com/MR-HOWE/browser_scripts/main/youtube_larger_comments.user.js
// ==/UserScript==

GM_addStyle(`
    /* 评论正文 */
    ytd-comment-view-model #content-text,
    ytd-comment-renderer #content-text {
        font-size: 20px !important;
        line-height: 1.55 !important;
    }

    /* 用户名 */
    ytd-comment-view-model #author-text {
        font-size: 15px !important;
    }

    /* 发布时间、点赞数等 */
    ytd-comment-view-model #published-time-text,
    ytd-comment-view-model #vote-count-middle {
        font-size: 14px !important;
    }

    /* 视频简介正文 */
    #description-inline-expander,
    #description-inline-expander yt-attributed-string,
    #description-inline-expander yt-formatted-string {
        font-size: 20px !important;
        line-height: 1.55 !important;
    }
`);

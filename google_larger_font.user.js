
// ==UserScript==
// @name         Google Search Result Font Customizer
// @namespace    google-search-font-customizer
// @version      1.0
// @description  Customize URL, title, and snippet fonts in Google Search
// @match        https://www.google.com/search*
// @match        https://www.google.com.hk/search*
// @match        https://www.google.co.uk/search*
// @match        https://www.google.com.au/search*
// @grant        none
// @version      2026.11.09
// @homepageURL  https://github.com/MR-HOWE/browser_scripts
// @updateURL    https://raw.githubusercontent.com/MR-HOWE/browser_scripts/main/google_larger_font.user.js
// @downloadURL  https://raw.githubusercontent.com/MR-HOWE/browser_scripts/main/google_larger_font.user.js
// ==/UserScript==

(function () {
    'use strict';

    // ============================================================
    // Config
    // ============================================================

    const FONT = {

        title: {
            family: '"Verdana", "PingFang SC", sans-serif',
            size: '24px',
            line_height: '50px',
        },

        snippet: {
            family: '"Verdana", "PingFang SC", sans-serif',
            size: '18px',
            line_height: '25px',
        },
    };

    const LAYOUT = {
        resultWidth: '820px',
    };
    // ============================================================
    // CSS
    // ============================================================

    const style = document.createElement('style');

    style.textContent = `
        /*
         * Search result title
         */
        :is(
            a:has(h3) h3,
            h3.LC20lb,
            h3.DKV0Md
        ),
        :is(
            a:has(h3) h3,
            h3.LC20lb,
            h3.DKV0Md
        ) * {
            font-family: ${FONT.title.family} !important;
            font-size: ${FONT.title.size} !important;
            line-height: ${FONT.title.line_height} !important;
        }


        /*
         * Search result snippet / description
         */
        :is(
            .VwiC3b,
            .IsZvec,
            .yXK7lf,
            .s3v9rd
        ),
        :is(
            .VwiC3b,
            .IsZvec,
            .yXK7lf,
            .s3v9rd
        ) * {
            font-family: ${FONT.snippet.family} !important;
            font-size: ${FONT.snippet.size} !important;
            line-height: ${FONT.snippet.line_height} !important;
        }
        /*
         * Main search result column width
         */
        #center_col {
            width: ${LAYOUT.resultWidth} !important;
            max-width: ${LAYOUT.resultWidth} !important;
        }

        #rso {
            width: 100% !important;
            max-width: none !important;
        }
    `;

    document.head.appendChild(style);
})();

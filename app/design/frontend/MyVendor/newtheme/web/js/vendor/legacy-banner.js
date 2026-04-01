/**
 * legacy-banner.js — симуляція "старої" бібліотеки без AMD/CommonJS.
 *
 * ПРОБЛЕМА: файл не має define() — RequireJS не знає що він повертає.
 * РІШЕННЯ:  у requirejs-config.js прописати shim:
 *
 *   shim: {
 *       'js/vendor/legacy-banner': {
 *           deps:    ['jquery'],    // завантажити jquery ДО цього файлу
 *           exports: 'LegacyBanner' // взяти window.LegacyBanner як export
 *       }
 *   }
 *
 * Після цього require('legacyBanner') поверне об'єкт LegacyBanner,
 * і його можна використовувати як звичайну AMD-залежність.
 */
(function (window, document) {
    'use strict';

    /**
     * LegacyBanner — глобальний об'єкт, який бібліотека "публікує" у window.
     * Саме його ім'я вказуємо в shim.exports.
     */
    window.LegacyBanner = {

        /**
         * show — відобразити тимчасовий банер у верхній частині сторінки.
         *
         * @param {string} message  — текст повідомлення
         * @param {string} [type]   — 'success' | 'error' | 'info' (default: 'info')
         * @param {number} [duration] — тривалість у мс (default: 3000)
         */
        show: function (message, type, duration) {
            var banner = document.createElement('div');
            banner.className = 'legacy-banner legacy-banner--' + (type || 'info');
            banner.setAttribute('role', 'alert');
            banner.style.cssText = [
                'position:fixed', 'top:0', 'left:0', 'right:0',
                'z-index:9999', 'padding:10px 20px', 'text-align:center',
                'font-weight:bold',
                type === 'success' ? 'background:#d4edda;color:#155724' :
                type === 'error'   ? 'background:#f8d7da;color:#721c24' :
                                     'background:#fff3cd;color:#856404'
            ].join(';');
            banner.textContent = message;

            document.body.prepend(banner);

            setTimeout(function () {
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, duration || 3000);
        },

        /** hide — прибрати всі активні банери. */
        hide: function () {
            var banners = document.querySelectorAll('.legacy-banner');
            for (var i = 0; i < banners.length; i++) {
                banners[i].parentNode.removeChild(banners[i]);
            }
        }
    };

}(window, document));

(function (window, document) {
    'use strict';

    window.LegacyBanner = {

        /**
         * @param {string} message  
         * @param {string} [type]  
         * @param {number} [duration] 
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

        hide: function () {
            var banners = document.querySelectorAll('.legacy-banner');
            for (var i = 0; i < banners.length; i++) {
                banners[i].parentNode.removeChild(banners[i]);
            }
        }
    };

}(window, document));

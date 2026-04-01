var config = {
    map: {
        '*': {
            likeCounter:        'js/like-counter',
            productCardHandler: 'js/product-card-handler',
            imageZoomHover:     'js/image-zoom-hover',
            legacyBanner:       'js/vendor/legacy-banner'
        }
    },
    
    shim: {
        'js/vendor/legacy-banner': {
            deps:    ['jquery'],
            exports: 'LegacyBanner'
        }
    },

    config: {
        mixins: {
            'mage/collapsible': {
                'js/mixins/collapsible-mixin': true
            }
        }
    }
};

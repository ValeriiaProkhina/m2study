define([
    'jquery',
    'jquery-ui-modules/widget',
    'mage/translate',
    'legacyBanner'          
], function ($, widget, $t, LegacyBanner) {
    'use strict';

    $.widget('myvendor.likeCounter', {

        options: {
            initialLikes:        0,
            likeButtonSelector:  '[data-role="like-button"]',
            countDisplaySelector: '[data-role="count-value"]',
            activeClass:         '_is-liked',
        },

        _create: function () {
            this.currentLikes = this.options.initialLikes;
            this.button       = this.element.find(this.options.likeButtonSelector);
            this.countDisplay = this.element.find(this.options.countDisplaySelector);

            this._on({ 'click [data-role="like-button"]': '_addLike' });

            console.log($t('Like Counter initialized with %1 likes').replace('%1', this.currentLikes));
        },

        _addLike: function (e) {
            e.preventDefault();
            this.currentLikes++;
            this.countDisplay.text(this.currentLikes);
            $(e.currentTarget).addClass(this.options.activeClass);

            LegacyBanner.show(
                $t('Thank you! Total likes: %1').replace('%1', this.currentLikes),
                'success',
                2500
            );
        },

        _destroy: function () {
            this.countDisplay.text(this.options.initialLikes);
            this.button.removeClass(this.options.activeClass);
            LegacyBanner.hide();

            this._super();
            console.log($t('Like Counter destroyed'));
        }
    });

    return $.myvendor.likeCounter;
});

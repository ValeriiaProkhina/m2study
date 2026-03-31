define (['jquery', 'jquery-ui-modules/widget'], function ($) {
    'use strict';

    $.widget('myvendor.likeCounter', {
        options: {
            initialLikes: 0,
            likeButtonSelector: '[data-role="like-button"]',
            countDisplaySelector: '[data-role="count-value"]',
            activeClass: '_is-liked',
        },

        _create: function () {
            this.currentLikes = this.options.initialLikes;
            this.button = this.element.find(this.options.likeButtonSelector);
            this.countDisplay = this.element.find(this.options.countDisplaySelector);

            this._on({'click [data-role="like-button"]': this._addLike });

            console.log('Like Counter widget initialized with ' + this.curentLikes + ' likes');
        },

        _addLike: function (e) {
            e.preventDefault();
            this.currentLikes++;
            this.countDisplay.text(this.currentLikes);
            $(e.currentTarget).addClass(this.options.activeClass);
            console.log('New likes count: ', this.currentLikes);
        }
    })
    return $.myvendor.likeCounter;
})
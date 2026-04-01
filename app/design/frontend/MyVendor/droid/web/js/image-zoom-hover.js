define([
    'jquery',
    'jquery-ui-modules/widget'
], function ($) {
    'use strict';

    $.widget('mage.imageZoomHover', {
        options: {
            gallerySelector: '[data-gallery-role=gallery-placeholder]',
            zoomScale: 1.3,
            transitionDuration: '0.3s'
        },

        _create: function () {
            this.gallery = $(this.options.gallerySelector);

            if (!this.gallery.length) return;

            this._bindEvents();
        },

        _bindEvents: function () {
            this._on(this.gallery, {
                mouseenter: this._onEnter,
                mouseleave: this._onLeave,
                mousemove: this._onMove
            });
        },

        _onEnter: function () {
            var frame = this._getFrame();
            if (!frame.length) return;

            frame.css({
                transition: 'transform ' + this.options.transitionDuration + ' ease',
                transformOrigin: 'center center',
                transform: 'scale(' + this.options.zoomScale + ')'
            });
        },

        _onLeave: function () {
            var frame = this._getFrame();
            if (!frame.length) return;

            frame.css({
                transform: 'scale(1)',
                transformOrigin: 'center center'
            });
        },

        _onMove: function (e) {
            var frame = this._getFrame();
            if (!frame.length) return;

            var rect = frame[0].getBoundingClientRect();

            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
            var yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

            frame.css('transform-origin', xPercent + '% ' + yPercent + '%');
        },

        _getFrame: function () {
            return this.gallery.find('.fotorama__active');
        }
    });

    return $.mage.imageZoomHover;
});

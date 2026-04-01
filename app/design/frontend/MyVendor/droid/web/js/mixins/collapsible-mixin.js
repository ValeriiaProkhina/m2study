define(['jquery', 'mage/translate'], function ($, $t) {
    'use strict';

    return function (target) {

        $.widget('mage.collapsible', target, {

            activate: function () {
                this._super();

                var header = this.options.header
                    ? $(this.options.header).text().trim()
                    : this.element.attr('id') || '?';

                console.log($t('Mixin Collapsible opened: ') + '"' + header + '"');
            },

            deactivate: function () {
                this._super();
                console.log($t('Mixin Collapsible closed'));
            }
        });

        return $.mage.collapsible;
    };
});

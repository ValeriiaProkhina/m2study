/**
 * like-counter.js — jQuery UI Widget з перекладами та legacyBanner (shim-demo).
 *
 * ЗАЛЕЖНОСТІ:
 *   jquery                — jQuery (стандарт)
 *   jquery-ui-modules/widget — Widget Factory
 *   mage/translate        — функція $t() для i18n рядків у JS
 *   legacyBanner          — аліас з requirejs-config.js map, завантажується
 *                           через shim (файл web/js/vendor/legacy-banner.js)
 *
 * ПЕРЕКЛАДИ (i18n у JS):
 *   $t('рядок') шукає рядок у CSV-файлах i18n/LOCALE.csv усіх модулів.
 *   Якщо переклад є — повертає перекладений рядок; якщо нема — оригінал.
 *   CSV-файли підключаються автоматично через Magento i18n механізм.
 */
define([
    'jquery',
    'jquery-ui-modules/widget',
    'mage/translate',
    'legacyBanner'           // ← завантажується через shim; exports: 'LegacyBanner'
], function ($, widget, $t, LegacyBanner) {
    'use strict';

    /**
     * $.widget(namespace.name, { ... })
     *
     * namespace:  'myvendor' — власний неймспейс (не 'mage', щоб не конфліктувати з core)
     * name:       'likeCounter'
     * Доступ до екземпляру: $el.myvendor('likeCounter') або $el.data('myvendor-likeCounter')
     */
    $.widget('myvendor.likeCounter', {

        /**
         * options — дефолтні параметри віджету.
         * Можна перевизначити через data-mage-init або при програмному виклику:
         *   $el.likeCounter({ initialLikes: 5 });
         */
        options: {
            initialLikes:        0,
            likeButtonSelector:  '[data-role="like-button"]',
            countDisplaySelector: '[data-role="count-value"]',
            activeClass:         '_is-liked',
        },

        /**
         * _create — єдина обов'язкова точка входу, викликається автоматично
         * при ініціалізації. Аналог конструктора.
         */
        _create: function () {
            this.currentLikes = this.options.initialLikes;
            this.button       = this.element.find(this.options.likeButtonSelector);
            this.countDisplay = this.element.find(this.options.countDisplaySelector);

            // _on — обгортка над jQuery .on(), яка автоматично відписується у _destroy()
            this._on({ 'click [data-role="like-button"]': '_addLike' });

            // $t() — переклад рядка через Magento i18n
            console.log($t('Like Counter initialized with %1 likes').replace('%1', this.currentLikes));
        },

        /** _addLike — обробник кліку на кнопку "like". */
        _addLike: function (e) {
            e.preventDefault();
            this.currentLikes++;
            this.countDisplay.text(this.currentLikes);
            $(e.currentTarget).addClass(this.options.activeClass);

            // Демо shim + exports: використовуємо LegacyBanner.show()
            // Цей об'єкт RequireJS отримав через window['LegacyBanner'] завдяки shim.exports
            LegacyBanner.show(
                $t('Thank you! Total likes: %1').replace('%1', this.currentLikes),
                'success',
                2500
            );
        },

        /**
         * _destroy — прибираємо за собою при знищенні віджету.
         *
         * Викликається автоматично при $el.likeCounter('destroy') або при
         * видаленні елемента зі сторінки. Правило хорошого тону для кожного віджету.
         *
         * _super() у _destroy() відписує всі _on() слухачі та прибирає
         * CSS-класи, додані Widget Factory.
         */
        _destroy: function () {
            this.countDisplay.text(this.options.initialLikes);
            this.button.removeClass(this.options.activeClass);
            LegacyBanner.hide();

            // ЗАВЖДИ викликати _super() в _destroy() в кінці
            this._super();
            console.log($t('Like Counter destroyed'));
        }
    });

    return $.myvendor.likeCounter;
});

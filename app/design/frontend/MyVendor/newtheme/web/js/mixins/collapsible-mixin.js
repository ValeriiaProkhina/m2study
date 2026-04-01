/**
 * collapsible-mixin.js — mixin до вбудованого mage/collapsible.
 *
 * ПІДКЛЮЧЕНО через requirejs-config.js:
 *   config: { mixins: { 'mage/collapsible': { 'js/mixins/collapsible-mixin': true } } }
 *
 * ЯК ПРАЦЮЄ mixin у Magento 2:
 *   RequireJS перед тим як повернути оригінальний модуль (mage/collapsible),
 *   пропускає його через функцію-mixin. Mixin отримує оригінал (target)
 *   і ПОВЕРТАЄ розширену версію. Оригінальний файл у vendor/ не чіпаємо.
 *
 * КОЛИ MIXIN, а КОЛИ OVERRIDE:
 *
 *   ✅ MIXIN — коли:
 *      - треба додати/змінити 1–2 методи у чужому (core/vendor) файлі
 *      - хочемо зберегти оригінальну логіку через this._super()
 *      - кілька модулів незалежно розширюють один файл
 *
 *   ✅ OVERRIDE (копіюємо файл у тему або модуль) — коли:
 *      - замінюємо понад ~50% логіки
 *      - файл є шаблоном (.phtml / .html / .less) — вони не мають mixins
 *      - потрібно змінити структуру або сигнатуру методів
 */
define(['mage/translate'], function ($t) {
    'use strict';

    /**
     * Mixin-функція завжди приймає один аргумент — оригінальний модуль (target)
     * і повертає модифіковану версію.
     *
     * Для jQuery-віджетів target — це конструктор $.widget.
     * Для uiComponent — це клас, який можна .extend().
     */
    return function (target) {

        /**
         * $.widget(namespace, ParentWidget, overrides)
         *
         * Перший аргумент — 'mage.collapsible' — ім'я того самого віджету.
         * Другий  — target (оригінальний конструктор) — стає батьком.
         * Третій  — об'єкт з методами, які ми перевизначаємо.
         *
         * Це стандартний jQuery Widget Factory спадок (inheritance).
         */
        $.widget('mage.collapsible', target, {

            /**
             * activate — оригінальний метод, що відкриває секцію accordion.
             * Викликаємо this._super() щоб оригінал відпрацював,
             * потім додаємо свою логіку.
             */
            activate: function () {
                this._super(); // ← ОБОВ'ЯЗКОВО: без цього секція не відкриється

                // Демо: логуємо відкриття секції з перекладом
                var header = this.options.header
                    ? $(this.options.header).text().trim()
                    : this.element.attr('id') || '?';

                console.log($t('[Mixin demo] Collapsible opened: ') + '"' + header + '"');
            },

            /**
             * deactivate — закриття секції.
             */
            deactivate: function () {
                this._super();
                console.log($t('[Mixin demo] Collapsible closed'));
            }
        });

        // Повертаємо оновлений конструктор — саме його отримає кожен require('mage/collapsible')
        return $.mage.collapsible;
    };
});

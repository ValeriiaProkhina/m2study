/**
 * droid.js — демонстрація Knockout JS у Magento 2 UI Component.
 *
 * ЗАЛЕЖНОСТІ:
 *   uiComponent     — базовий клас Magento UI Component (extend, defaults, initialize)
 *   ko              — Knockout.js: observable, observableArray, computed
 *   mage/translate  — $t() для перекладів у JS
 *
 * КЛЮЧОВІ КОНЦЕПЦІЇ KO:
 *   ko.observable(val)       — одне реактивне значення; при зміні — DOM оновлюється
 *   ko.observableArray([])   — реактивний масив; push/pop/remove → DOM оновлюється
 *   ko.computed(fn, context) — обчислюване значення, автоматично перераховується
 *                              коли змінюється будь-яка залежність всередині fn
 */
define(['uiComponent', 'ko', 'mage/translate'], function (Component, ko, $t) {
    'use strict';

    return Component.extend({

        /**
         * defaults — значення за замовчуванням.
         * Можна перевизначити через jsLayout config у layout XML.
         */
        defaults: {
            template:       'My_Droid/droid',
            droidName:      'R2-D2',
            welcomeMessage: 'Meet your droid!',
        },

        initialize: function () {
            this._super();

            // --- ko.observable -------------------------------------------
            // Зберігає одне значення. Getter: this.droidName()
            //                         Setter: this.droidName('C-3PO')
            // При кожній зміні KO автоматично оновлює всі data-bind у шаблоні.
            this.droidName = ko.observable(this.droidName);

            // Observable для поточного статусу операції
            this.status = ko.observable('');

            // --- ko.observableArray --------------------------------------
            // Реактивний масив. Методи: push, pop, remove, removeAll, splice.
            // Кожен виклик цих методів оновлює foreach у шаблоні.
            this.missions = ko.observableArray([
                { id: 1, title: $t('Deliver message to Obi-Wan') },
                { id: 2, title: $t('Repair hyperdrive')           },
                { id: 3, title: $t('Beep at the right moment')    },
            ]);

            // --- ko.computed --------------------------------------------
            // Автоматично перераховується, коли missions() змінюється.
            // "Pure" computed (третій аргумент { pure: true }) —
            // не підписується на сповіщення поки немає підписників у DOM.
            this.missionCount = ko.computed(function () {
                return this.missions().length;
            }, this);

            // Computed з форматуванням рядка + переклад
            this.statusLabel = ko.computed(function () {
                var s = this.status();
                return s ? $t('Last action: %1').replace('%1', s) : '';
            }, this);

            return this;
        },

        // -----------------------------------------------------------------
        // МЕТОДИ — прив'язуються до кнопок через data-bind="click: method"
        // -----------------------------------------------------------------

        /** Змінити ім'я дроїда — демо: setter для ko.observable */
        changeName: function () {
            var names   = ['C-3PO', 'BB-8', 'R2-D2', 'K-2SO', 'IG-11'];
            var current = this.droidName();
            var next    = names[(names.indexOf(current) + 1) % names.length];
            this.droidName(next);
            this.status($t('name changed to %1').replace('%1', next));
        },

        /** Додати місію — демо: observableArray.push */
        addMission: function () {
            var id    = this.missions().length + 1;
            var title = $t('Mission #%1: stand by').replace('%1', id);
            this.missions.push({ id: id, title: title });
            this.status($t('mission %1 added').replace('%1', id));
        },

        /**
         * Видалити місію — демо: observableArray.remove + event context.
         *
         * У шаблоні: data-bind="click: $parent.removeMission.bind($parent, $data)"
         * $data — поточний елемент масиву (об'єкт { id, title })
         * $parent — батьківський контекст (сам компонент)
         */
        removeMission: function (mission) {
            this.missions.remove(mission);
            this.status($t('mission %1 removed').replace('%1', mission.id));
        },
    });
});


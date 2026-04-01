define(['uiComponent', 'ko', 'mage/translate'], function (Component, ko, $t) {
    'use strict';

    return Component.extend({

        
        defaults: {
            template:       'My_Droid/droid',
            droidName:      'R2-D2',
            welcomeMessage: 'Meet your droid!',
        },

        initialize: function () {
            this._super();

            // --- ko.observable -------------------------------------------

            //                         Setter: this.droidName('C-3PO')

            this.droidName = ko.observable(this.droidName);

            this.status = ko.observable('');

            // --- ko.observableArray --------------------------------------

            this.missions = ko.observableArray([
                { id: 1, title: $t('Deliver message to Obi-Wan') },
                { id: 2, title: $t('Repair hyperdrive')           },
                { id: 3, title: $t('Beep at the right moment')    },
            ]);

            // --- ko.computed --------------------------------------------

            this.missionCount = ko.computed(function () {
                return this.missions().length;
            }, this);

            this.statusLabel = ko.computed(function () {
                var s = this.status();
                return s ? $t('Last action: %1').replace('%1', s) : '';
            }, this);

            return this;
        },

        // -----------------------------------------------------------------

        // -----------------------------------------------------------------

        
        changeName: function () {
            var names   = ['C-3PO', 'BB-8', 'R2-D2', 'K-2SO', 'IG-11'];
            var current = this.droidName();
            var next    = names[(names.indexOf(current) + 1) % names.length];
            this.droidName(next);
            this.status($t('name changed to %1').replace('%1', next));
        },

        
        addMission: function () {
            var id    = this.missions().length + 1;
            var title = $t('Mission #%1: stand by').replace('%1', id);
            this.missions.push({ id: id, title: title });
            this.status($t('mission %1 added').replace('%1', id));
        },

        
        removeMission: function (mission) {
            this.missions.remove(mission);
            this.status($t('mission %1 removed').replace('%1', mission.id));
        },
    });
});

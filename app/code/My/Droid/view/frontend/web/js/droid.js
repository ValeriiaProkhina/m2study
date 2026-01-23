define(["uiComponent", "ko"], function (Component, ko) {
    "use strict";

    return Component.extend({
        defaults: {
            droidName: "R2-D2",
            welcomeMessage: "Hello!",
            template: "My_Droid/droid",
        },
        initialize: function () {
            this._super();
            console.log("My Droid component initialized");

            this.droidName = ko.observable(this.droidName);
            console.log(this.droidName());

            return this;
        },
        changeName: function () {
            this.droidName("C-3PO");
        },
    });
});

define(["jquery", "jquery-ui-modules/widget", "mage/translate"], function (
    $,
    widget,
    $t,
) {
    "use strict";

    $.widget("my.productCardHandler", {
        options: {
            activeClass: "is-active",
            productName: $t("Default Label"),
        },

        _create: function () {
            this._bindEvents();
        },

        _bindEvents: function () {
            var self = this;
            var $card = this.element;

            $card
                .on("mouseenter", function () {
                    $card
                        .addClass(self.options.activeClass)
                        .css("position", "relative");

                    if ($card.find(".active-hover").length === 0) {
                        $('<span class="active-hover"></span>')
                            .css({
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                color: "white",
                                "background-color": "black",
                                padding: "5px 10px",
                                "z-index": "90",
                            })
                            .text(self.options.productName)
                            .appendTo($card);
                    }
                })
                .on("mouseleave", function () {
                    $card.removeClass(self.options.activeClass);
                    $card.find(".active-hover").remove();
                });
        },
    });
    return $.my.productCardHandler;
});

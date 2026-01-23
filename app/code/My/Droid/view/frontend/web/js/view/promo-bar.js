define([
    "uiComponent",
    "Magento_Customer/js/customer-data",
    "ko",
    "Magento_Catalog/js/price-utils",
], function (Component, customerData, ko, priceUtils) {
    "use strict";

    return Component.extend({
        defaults: {
            template: "My_Droid/promo-bar",
            freeShipping: 100,
        },

        initialize: function () {
            this._super();
            this.cart = customerData.get("cart");

            this.cartSubtotal = ko.computed(function () {
                const cartData = this.cart();
                const amount =
                    cartData && cartData.subtotalAmount
                        ? parseFloat(cartData.subtotalAmount)
                        : 0;

                return amount;
            }, this);

            this.amountLeft = ko.computed(function () {
                const left = this.freeShipping - this.cartSubtotal();
                return left > 0 ? left : 0;
            }, this);
            console.log(this.amountLeft());
        },
        getFormattedAmountLeft: function (amount) {
            return priceUtils.formatPrice(
                amount,
                window.checkoutConfig ? window.checkoutConfig.format : {},
            );
        },
    });
});

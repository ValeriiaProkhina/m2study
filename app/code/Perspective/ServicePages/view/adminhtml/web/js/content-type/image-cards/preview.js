/*eslint-disable */
/* jscs:disable */

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define([
    "mage/translate",
    "Magento_PageBuilder/js/events",
    "Magento_PageBuilder/js/config",
    "Magento_PageBuilder/js/content-type-factory",
    "Magento_PageBuilder/js/content-type-menu/hide-show-option",
    "Magento_PageBuilder/js/content-type-menu/option",
    "Magento_PageBuilder/js/content-type/preview-collection"
], function (_translate, _events, _config, _contentTypeFactory, _hideShowOption, _option, _previewCollection) {

    var Preview = /*#__PURE__*/function (_previewCollection2) {
        "use strict";

        _inheritsLoose(Preview, _previewCollection2);

        function Preview(contentType, config, observableUpdater) {
            return _previewCollection2.call(this, contentType, config, observableUpdater) || this;
        }

        var _proto = Preview.prototype;

        _proto.retrieveOptions = function retrieveOptions() {
            var options = _previewCollection2.prototype.retrieveOptions.call(this);

            options.add = new _option({
                preview: this,
                icon: "<i class='icon-pagebuilder-add'></i>",
                title: (0, _translate)("Add"),
                action: this.addCard,
                classes: ["add-child"],
                sort: 10
            });
            options.hideShow = new _hideShowOption({
                preview: this,
                icon: _hideShowOption.showIcon,
                title: _hideShowOption.showText,
                action: this.onOptionVisibilityToggle,
                classes: ["hide-show-content-type"],
                sort: 40
            });
            return options;
        };

        _proto.addCard = function addCard() {
            var _this = this;

            (0, _contentTypeFactory)(
                _config.getConfig("content_types").image_card,
                _this.contentType,
                _this.contentType.stageId
            ).then(function (card) {
                _this.contentType.addChild(card, _this.contentType.children().length);
            });
        };

        _proto.bindEvents = function bindEvents() {
            var _this = this;

            _previewCollection2.prototype.bindEvents.call(this);

            _events.on("image_cards:dropAfter", function (args) {
                if (args.id === _this.contentType.id && _this.contentType.children().length === 0) {
                    _this.addCard();
                    _this.addCard();
                }
            });
        };

        _proto.isContainer = function isContainer() {
            return false;
        };

        return Preview;
    }(_previewCollection);

    return Preview;
});

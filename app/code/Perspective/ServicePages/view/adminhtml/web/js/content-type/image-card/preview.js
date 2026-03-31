/*eslint-disable */
/* jscs:disable */

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define([
    "Magento_PageBuilder/js/events",
    "Magento_PageBuilder/js/uploader",
    "Magento_PageBuilder/js/content-type/preview"
], function (_events, _uploader, _preview) {

    var Preview = /*#__PURE__*/function (_preview2) {
        "use strict";

        _inheritsLoose(Preview, _preview2);

        function Preview(contentType, config, observableUpdater) {
            return _preview2.call(this, contentType, config, observableUpdater) || this;
        }

        var _proto = Preview.prototype;

        /**
         * Get registry callback reference to uploader UI component
         *
         * @returns {Uploader}
         */
        _proto.getUploader = function getUploader() {
            var initialImageValue = this.contentType.dataStore
                .get(this.config.additional_data.uploaderConfig.dataScope, "");

            return new _uploader(
                "imageuploader_" + this.contentType.id,
                this.config.additional_data.uploaderConfig,
                this.contentType.id,
                this.contentType.dataStore,
                initialImageValue
            );
        };

        /**
         * @inheritDoc
         */
        _proto.bindEvents = function bindEvents() {
            var _this = this;

            _preview2.prototype.bindEvents.call(this);

            _events.on("image_card:mountAfter", function (args) {
                if (args.id === _this.contentType.id) {
                    _this.isSnapshot.subscribe(function () {
                        _this.changeUploaderControlsVisibility();
                    });
                    _this.changeUploaderControlsVisibility();
                }
            });

            _events.on(_this.config.name + ":" + _this.contentType.id + ":updateAfter", function () {
                var files = _this.contentType.dataStore
                    .get(_this.config.additional_data.uploaderConfig.dataScope);
                var imageObject = files ? files[0] : {};
                _events.trigger("image:" + _this.contentType.id + ":assignAfter", imageObject);
            });
        };

        /**
         * Change uploader controls visibility
         */
        _proto.changeUploaderControlsVisibility = function changeUploaderControlsVisibility() {
            var _this = this;
            this.getUploader().getUiComponent()(function (uploader) {
                uploader.visibleControls = !_this.isSnapshot();
            });
        };

        return Preview;
    }(_preview);

    return Preview;
});

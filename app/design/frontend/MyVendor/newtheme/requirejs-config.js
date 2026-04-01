var config = {

    /**
     * map — псевдоніми (аліаси) для JS-модулів.
     *
     * Замість повного шляху в data-mage-init або require([...]) можна
     * писати короткий аліас: "likeCounter" замість "MyVendor_NewTheme/js/like-counter".
     *
     * "*" означає: аліас діє для ВСІХ модулів на сторінці.
     * Можна обмежити: { "My_Droid/js/view/promo-bar": { ... } }
     */
    map: {
        '*': {
            likeCounter:        'js/like-counter',
            productCardHandler: 'js/product-card-handler',
            imageZoomHover:     'js/image-zoom-hover',

            // Аліас для legacy-бібліотеки, яку підключаємо через shim нижче.
            // У data-mage-init / define([]) пишемо просто 'legacyBanner'.
            legacyBanner:       'js/vendor/legacy-banner'
        }
    },

    /**
     * shim — підключення "старих" бібліотек, що не підтримують AMD (немає define()).
     *
     * exports:  ім'я глобальної змінної, яку бібліотека створює у window.
     *           RequireJS після завантаження поверне window['LegacyBanner']
     *           як результат require('legacyBanner').
     *
     * deps:     масив залежностей, які МАЮТЬ завантажитись ДО бібліотеки
     *           (аналог того, якби бібліотека сама писала require([...]) на початку).
     *           Тут jquery має бути у DOM до того, як legacy-banner.js виконається.
     */
    shim: {
        'js/vendor/legacy-banner': {
            deps:    ['jquery'],
            exports: 'LegacyBanner'
        }
    },

    /**
     * config.mixins — "тихе" розширення модуля БЕЗ зміни його файлу.
     *
     * Коли використовувати MIXIN:
     *   ✅ Потрібно додати або змінити 1–2 методи стороннього / core модуля.
     *   ✅ Хочемо зберегти оригінальну логіку через this._super().
     *   ✅ Не маємо права редагувати файл (vendor/, core Magento).
     *   ✅ Декілька модулів розширюють один файл — кожен своїм міксином.
     *
     * Коли використовувати OVERRIDE (скопіювати файл у тему / модуль):
     *   ✅ Змінюємо більше ніж половину логіки.
     *   ✅ Потрібно повністю замінити поведінку, а не доповнити.
     *   ✅ Файл — шаблон .phtml / .html / .less (шаблони не мають mixins).
     *   ❌ Не варто для дрібних правок — важко підтримувати при оновленні Magento.
     */
    config: {
        mixins: {
            // Розширюємо вбудований mage/collapsible (accordion на homepage).
            // Оригінальний файл у vendor/ не чіпаємо.
            'mage/collapsible': {
                'js/mixins/collapsible-mixin': true
            }
        }
    }
};
# USP PageBuilder Component

## Опис

USP (Unique Selling Points) - компонент для Magento 2 PageBuilder, який дозволяє відображати переваги магазину/товару/послуги на CMS сторінках та блоках.

## Функціонал

### Поля для налаштування в адмінці:

1. **Title** - Заголовок блоку USP
2. **Dynamic Rows** - Динамічний список USP елементів (можна додавати/видаляти)
    - **Image** - Зображення для елемента (image uploader)
    - **Title** - Заголовок елемента
    - **Description** - Опис елемента (WYSIWYG редактор)
3. **Display Link** - Показувати лінк (Yes/No toggle)
4. **Link Text** - Текст лінка
5. **Link URL** - URL адреса лінка

## Структура файлів

```
app/code/Perspective/ServicePages/
├── view/
│   ├── adminhtml/
│   │   ├── layout/
│   │   │   ├── pagebuilder_usp_form.xml
│   │   │   └── pagebuilder_usp_item_form.xml
│   │   ├── pagebuilder/
│   │   │   └── content_type/
│   │   │       └── usp.xml
│   │   ├── ui_component/
│   │   │   ├── pagebuilder_usp_form.xml
│   │   │   └── pagebuilder_usp_item_form.xml
│   │   └── web/
│   │       └── template/
│   │           └── content-type/
│   │               └── usp/
│   │                   └── default/
│   │                       ├── master.html
│   │                       └── preview.html
│   └── frontend/
│       ├── layout/
│       │   └── default.xml
│       └── web/
│           └── css/
│               └── usp-component.css
```

## Використання

1. Відкрийте редагування CMS сторінки або блоку через PageBuilder
2. У меню "Single Service" знайдіть компонент "USP"
3. Перетягніть його на сторінку
4. Натисніть на компонент для налаштування
5. Заповніть:
    - Заголовок блоку
    - Додайте USP елементи через кнопку "Add item"
    - Для кожного елемента завантажте картинку, вкажіть заголовок та опис
    - При потребі увімкніть відображення лінка та вкажіть його параметри
6. Збережіть зміни

## Відображення на фронтенді

Компонент відображається як:

-   Секція з заголовком
-   Сітка USP елементів (адаптивна під різні екрани)
-   Кожний елемент містить: іконку, заголовок, опис
-   Внизу може бути кнопка-лінк (якщо увімкнено)

## CSS Стилізація

Базові CSS класи:

-   `.usp-section` - основна секція
-   `.usp-section__title` - заголовок
-   `.usp-items` - сітка елементів
-   `.usp-item` - окремий елемент
-   `.usp-item__image` - картинка елемента
-   `.usp-item__title` - заголовок елемента
-   `.usp-item__description` - опис елемента
-   `.usp-link__btn` - кнопка лінка

Стилі можна кастомізувати у файлі: `view/frontend/web/css/usp-component.css`

## Після встановлення

Виконайте команди:

```bash
bin/magento cache:clean
bin/magento cache:flush
```

Для production:

```bash
bin/magento setup:static-content:deploy
```

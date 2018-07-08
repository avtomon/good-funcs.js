<a name="GoodFuncs"></a>

## GoodFuncs
Полезные функции js

**Kind**: global class  

* [GoodFuncs](#GoodFuncs)
    * [.getScripts(paths, type)](#GoodFuncs.getScripts)
    * [.createElementWithAttrs(tagName, attrs)](#GoodFuncs.createElementWithAttrs) ⇒ <code>HTMLElement</code>
    * [.getDelegateTarget(event, selector)](#GoodFuncs.getDelegateTarget) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.siblings(element, filter, type)](#GoodFuncs.siblings) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
    * [.prevAll(element, filter)](#GoodFuncs.prevAll) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
    * [.nextAll(element, filter)](#GoodFuncs.nextAll) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
    * [.checkEmptyVal()](#GoodFuncs.checkEmptyVal) ⇒ <code>boolean</code>
    * [.getStyleSheet(styleSheetName)](#GoodFuncs.getStyleSheet) ⇒ <code>CSSStyleSheet</code> \| <code>null</code>
    * [.removeStyleRule(styleSheetName, styleNumber)](#GoodFuncs.removeStyleRule) ⇒ <code>boolean</code>
    * [.insertStyleRule(styleSheetName, selector, rules, styleNumber)](#GoodFuncs.insertStyleRule) ⇒ <code>number</code> \| <code>null</code>
    * [.index(element, selector)](#GoodFuncs.index) ⇒ <code>number</code>
    * [.prev(element, selector)](#GoodFuncs.prev) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.next(element, selector)](#GoodFuncs.next) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.getRandomString(symbolCount)](#GoodFuncs.getRandomString) ⇒ <code>string</code>
    * [.setAttributes(element, attribites)](#GoodFuncs.setAttributes)

<a name="GoodFuncs.getScripts"></a>

### GoodFuncs.getScripts(paths, type)
Добаление скриптов на страницу

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| paths | <code>Array.&lt;string&gt;</code> |  | массив путей к скриптам |
| type | <code>&quot;sync&quot;</code> \| <code>&quot;defer&quot;</code> \| <code>&quot;async&quot;</code> | <code>sync</code> |  |

<a name="GoodFuncs.createElementWithAttrs"></a>

### GoodFuncs.createElementWithAttrs(tagName, attrs) ⇒ <code>HTMLElement</code>
Создать элемент с заданными атрибутами

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| tagName | <code>string</code> | тег элемента |
| attrs | <code>Attrs</code> | объект атрибутов |

<a name="GoodFuncs.getDelegateTarget"></a>

### GoodFuncs.getDelegateTarget(event, selector) ⇒ <code>HTMLElement</code> \| <code>null</code>
Вернуть делегированный элемент по селектору

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | произошедншее событие |
| selector | <code>string</code> | селектор элемента |

<a name="GoodFuncs.siblings"></a>

### GoodFuncs.siblings(element, filter, type) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
Получить соседние элементы

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>HTMLElement</code> |  | относительно какого элемента ищем |
| filter | <code>string</code> |  | фильтрующий селектор |
| type | <code>Utils.SiblingsType</code> | <code>all</code> | тип соседства (все, выше или ниже) |

<a name="GoodFuncs.prevAll"></a>

### GoodFuncs.prevAll(element, filter) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
Все предыдущие соседствующие элементы

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | относительно какого элемента ищем |
| filter | <code>string</code> | фильтрующий селектор |

<a name="GoodFuncs.nextAll"></a>

### GoodFuncs.nextAll(element, filter) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
Все следующие соседствующие элементы

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | относительно какого элемента ищем |
| filter | <code>string</code> | фильтрующий селектор |

<a name="GoodFuncs.checkEmptyVal"></a>

### GoodFuncs.checkEmptyVal() ⇒ <code>boolean</code>
Проверка элементов форм на пустые обязательные значения

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  
<a name="GoodFuncs.getStyleSheet"></a>

### GoodFuncs.getStyleSheet(styleSheetName) ⇒ <code>CSSStyleSheet</code> \| <code>null</code>
Вернуть объект таблицы стилей по имени файла

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| styleSheetName | <code>string</code> | имя файла таблицы стилей |

<a name="GoodFuncs.removeStyleRule"></a>

### GoodFuncs.removeStyleRule(styleSheetName, styleNumber) ⇒ <code>boolean</code>
Удалить правило из таблицы стилей

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| styleSheetName | <code>string</code> | имя файла таблицы стилей |
| styleNumber | <code>number</code> | номер правила |

<a name="GoodFuncs.insertStyleRule"></a>

### GoodFuncs.insertStyleRule(styleSheetName, selector, rules, styleNumber) ⇒ <code>number</code> \| <code>null</code>
Вставить правило в таблицу стилей

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| styleSheetName | <code>string</code> | имя файла таблицы стилей |
| selector | <code>string</code> | селектор правила |
| rules | <code>Utils.Attrs</code> | объект директив правила |
| styleNumber | <code>number</code> | в какой номер вставлять правило |

<a name="GoodFuncs.index"></a>

### GoodFuncs.index(element, selector) ⇒ <code>number</code>
Индекст элемента среди соседствующих

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | элемент |
| selector | <code>string</code> | фильтрующий селектор |

<a name="GoodFuncs.prev"></a>

### GoodFuncs.prev(element, selector) ⇒ <code>HTMLElement</code> \| <code>null</code>
Предыдущий элемент среди соседей, соответствующий селектору

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | исходный элемент |
| selector | <code>string</code> | фильтрующий селектор |

<a name="GoodFuncs.next"></a>

### GoodFuncs.next(element, selector) ⇒ <code>HTMLElement</code> \| <code>null</code>
Следующий элемент среди соседей, соответствующий селектору

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | исходный элемент |
| selector | <code>string</code> | фильтрующий селектор |

<a name="GoodFuncs.getRandomString"></a>

### GoodFuncs.getRandomString(symbolCount) ⇒ <code>string</code>
Случайная строка заданной длины

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| symbolCount | <code>number</code> | количество символов в строке |

<a name="GoodFuncs.setAttributes"></a>

### GoodFuncs.setAttributes(element, attribites)
Массовая установка атрибутов элемента

**Kind**: static method of [<code>GoodFuncs</code>](#GoodFuncs)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | элемент |
| attribites | <code>Utils.Attrs</code> | объект атрибутов |


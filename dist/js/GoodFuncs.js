"use strict";
export var Utils;
(function (Utils) {
    /**
     * Полезные функции JavaScript и TypeScript
     */
    class GoodFuncs {
        /**
         * Добаление скриптов на страницу
         *
         * @param {string[]} paths - массив путей к скриптам
         * @param {Attr} attrs - атрибуты
         *
         * @returns {Promise<void>[]}
         */
        static getScripts(paths, attrs = {}) {
            let scriptElements = Array.from(document.getElementsByTagName('script')), scriptCount = scriptElements.length, lastScript = scriptElements[scriptCount - 2];
            let promises = [];
            paths.forEach(function (script, index) {
                promises[index] = new Promise(function (resolve) {
                    if (document.querySelector(`script[src="${script}"]`)) {
                        resolve();
                        return;
                    }
                    attrs['src'] = script;
                    let scriptElement = GoodFuncs.createElementWithAttrs('script', attrs);
                    lastScript.after(scriptElement);
                    lastScript = scriptElement;
                    scriptElement.onload = function () {
                        if (!this['executed']) { // выполнится только один раз
                            this['executed'] = true;
                            resolve();
                        }
                    };
                    scriptElement['onreadystatechange'] = function () {
                        if (this.readyState === 'complete' || this.readyState === 'loaded') {
                            setTimeout(function () {
                                this.onload();
                            }.bind(this), 0); // сохранить "this" для onload
                        }
                    };
                });
            });
            return promises;
        }
        ;
        /**
         * Добавление файлов стилей
         *
         * @param {string[]} paths - массив путей к файлам стилей
         * @param {Utils.Attrs} attrs - атрибуты
         */
        static addCss(paths, attrs = {}) {
            let cssElements = Array.from(document.querySelectorAll('link[rel="stylesheet"]')), cssCount = cssElements.length, lastCss = cssElements[cssCount - 1];
            paths.forEach(function (css) {
                if (document.querySelector(`link[href="${css}"]`)) {
                    return;
                }
                attrs['href'] = css;
                attrs['rel'] = 'stylesheet';
                let cssElement = GoodFuncs.createElementWithAttrs('link', attrs);
                lastCss.after(cssElement);
                lastCss = cssElement;
            });
        }
        ;
        /**
         * Создать элемент с заданными атрибутами
         *
         * @param {string} tagName - тег элемента
         * @param {Attrs} attrs - объект атрибутов
         *
         * @returns {HTMLElement}
         */
        static createElementWithAttrs(tagName, attrs) {
            let element = document.createElement(tagName);
            for (let attr in attrs) {
                if (!attr) {
                    continue;
                }
                if (attr === 'text') {
                    element.innerText = attrs[attr];
                    continue;
                }
                if (attr === 'html') {
                    element.innerHTML = attrs[attr];
                    continue;
                }
                element.setAttribute(attr, attrs[attr]);
            }
            return element;
        }
        ;
        /**
         * Вернуть делегированный элемент по селектору
         *
         * @param {Event} event - произошедншее событие
         * @param {string} selector - селектор элемента
         *
         * @returns {HTMLElement | null}
         */
        static getDelegateTarget(event, selector) {
            let target = event.target, child = target.closest ? target.closest(selector) : null;
            if (!child) {
                return null;
            }
            if (!event.currentTarget.contains(child)) {
                return null;
            }
            return child;
        }
        /**
         * Получить соседние элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         * @param {Utils.SiblingsType} type - тип соседства (все, выше или ниже)
         *
         * @returns {HTMLElement[]}
         */
        static siblings(element, filter = '', type = 'all') {
            let ok = type === 'prev', parent = element.parentNode, siblings = (!filter
                ? Array.from(parent.children)
                : Array.from(parent.querySelectorAll(filter)));
            return siblings.filter(function (child) {
                switch (type) {
                    case 'all':
                        ok = true;
                        break;
                    case 'prev':
                        if (child === element) {
                            ok = false;
                        }
                        break;
                    case 'next':
                        if (child === element) {
                            ok = true;
                        }
                        break;
                }
                return ok && child !== element;
            });
        }
        ;
        /**
         * Все предыдущие соседствующие элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         *
         * @returns {HTMLElement[]}
         */
        static prevAll(element, filter) {
            return GoodFuncs.siblings(element, filter, 'prev');
        }
        ;
        /**
         * Все следующие соседствующие элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         *
         * @returns {HTMLElement[]}
         */
        static nextAll(element, filter) {
            return GoodFuncs.siblings(element, filter, 'next');
        }
        ;
        /**
         * Проверка элементов форм на пустые обязательные значения
         *
         * @returns {HTMLElement[]}
         */
        static checkEmptyVal(parent = document) {
            let invalidElements = [];
            for (let element of Array.from(parent.querySelectorAll('input:required, select:required, textarea:required'))) {
                if (element.value === '') {
                    invalidElements.push(element);
                    continue;
                }
                if (['checkbox', 'radio'].includes(element['type'])
                    && !parent.querySelector(`[name="${element.name}"]:checked`)) {
                    invalidElements.push(element);
                }
            }
            return invalidElements;
        }
        ;
        /**
         * Вернуть объект таблицы стилей по имени файла
         *
         * @param {string} styleSheetName - имя файла таблицы стилей
         *
         * @returns {CSSStyleSheet | null}
         */
        static getStyleSheet(styleSheetName) {
            for (let sheet of Array.from(document.styleSheets)) {
                if (sheet.href && sheet.href.indexOf(styleSheetName) !== -1) {
                    return sheet;
                }
            }
            return null;
        }
        /**
         * Удалить правило из таблицы стилей
         *
         * @param {string} styleSheetName - имя файла таблицы стилей
         * @param {number} styleNumber - номер правила
         *
         * @returns {boolean}
         */
        static removeStyleRule(styleSheetName, styleNumber) {
            if (!styleSheetName || styleNumber === undefined) {
                return false;
            }
            let styleSheet = GoodFuncs.getStyleSheet(styleSheetName);
            if (!styleSheet) {
                return false;
            }
            styleSheet.removeRule(styleNumber);
            return true;
        }
        ;
        /**
         * Вставить правило в таблицу стилей
         *
         * @param {string} styleSheetName - имя файла таблицы стилей
         * @param {string} selector - селектор правила
         * @param {Utils.Attrs} rules - объект директив правила
         * @param {number} styleNumber - в какой номер вставлять правило
         *
         * @returns {number | null}
         */
        static insertStyleRule(styleSheetName, selector, rules, styleNumber) {
            if (!styleSheetName || !selector || !rules) {
                return null;
            }
            let styleSheet = GoodFuncs.getStyleSheet(styleSheetName);
            if (!styleSheet) {
                return null;
            }
            let ruleStr = JSON.stringify(rules).replace(/["]/g, '');
            return styleSheet.insertRule(`${selector} ${ruleStr}`, styleNumber);
        }
        ;
        /**
         * Вернуть функцию добавления заданных правил
         *
         * @param {string} styleSheet - имя файла таблицы стилей
         * @param {string} selector - селектор
         *
         * @returns {(rules: Utils.Attrs) => number}
         */
        static pseudo(styleSheet, selector) {
            return function (rules) {
                return GoodFuncs.insertStyleRule(styleSheet, selector, rules);
            };
        }
        ;
        /**
         * Индекст элемента среди соседствующих
         *
         * @param {HTMLElement} element - элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {number}
         */
        static index(element, selector = '') {
            let children = element.parentElement ? Array.from(element.parentElement.children) : [];
            if (!children.length) {
                return -1;
            }
            if (selector) {
                children = children.filter(function (item) {
                    return item.matches(selector);
                });
            }
            for (let i in children) {
                if (children[i] === element) {
                    return Number(i);
                }
            }
            return -1;
        }
        /**
         * Предыдущий элемент среди соседей, соответствующий селектору
         *
         * @param {HTMLElement} element - исходный элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {HTMLElement | null}
         */
        static prev(element, selector) {
            let prev = element.previousElementSibling;
            while (prev) {
                if (prev.matches(selector)) {
                    return prev;
                }
                prev = prev.previousElementSibling;
            }
            return null;
        }
        /**
         * Следующий элемент среди соседей, соответствующий селектору
         *
         * @param {HTMLElement} element - исходный элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {HTMLElement | null}
         */
        static next(element, selector) {
            let next = element.nextElementSibling;
            while (next) {
                if (next.matches(selector)) {
                    return next;
                }
                next = next.nextElementSibling;
            }
            return null;
        }
        /**
         * Случайная строка заданной длины
         *
         * @param {number} symbolCount - количество символов в строке
         *
         * @returns {string}
         */
        static getRandomString(symbolCount) {
            return Math.random().toString(36).substring(2, symbolCount);
        }
        /**
         * Массовая установка атрибутов элемента
         *
         * @param {HTMLElement} element - элемент
         * @param {Utils.Attrs} attributes - объект атрибутов
         */
        static setAttributes(element, attributes) {
            Object.keys(attributes).forEach(function (name) {
                element.setAttribute(name, attributes[name]);
            });
        }
        /**
         * Переключение свойств HTML-элементов
         *
         * @param {HTMLElement} element - элемент
         * @param {string} prop - имя свойства
         */
        static toggleProp(element, prop) {
            let value = Boolean(element[prop]);
            element[prop] = !value;
        }
        /**
         * Отфильтровать массив элементов по селектору
         *
         * @param {HTMLElement[]} elements - набор елементов
         * @param {string} selector - селектор
         *
         * @returns {HTMLElement[]}
         */
        static filter(elements, selector) {
            return elements.filter(function (element) {
                return element.matches(selector);
            });
        }
        /**
         * Видим ли элемент
         *
         * @param {HTMLElement} element - проверяемый элемент
         * @param {boolean} strict - использовать строгий режим
         *
         * @returns {boolean}
         */
        static isVisible(element, strict = false) {
            return strict ? window.getComputedStyle(element).display !== 'none' : element.offsetParent !== null;
        }
        /**
         * Числовой хэш запроса
         *
         * @param {string} url
         * @param {Object} params
         *
         * @returns {number}
         */
        static requestHash(url, params = {}) {
            let hash = 0, i, chr;
            if (url.length === 0) {
                return hash;
            }
            let urlObject = new URL(url, window.location.origin);
            Object.keys(params).forEach(function (key) {
                if (Array.isArray(params[key])) {
                    for (let index in params[key]) {
                        urlObject.searchParams.append(key, params[key][index]);
                    }
                    return;
                }
                urlObject.searchParams.append(key, params[key]);
            });
            const urlString = urlObject.toString();
            for (i = 0; i < urlString.length; i++) {
                chr = urlString.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }
    }
    Utils.GoodFuncs = GoodFuncs;
})(Utils || (Utils = {}));
//# sourceMappingURL=GoodFuncs.js.map
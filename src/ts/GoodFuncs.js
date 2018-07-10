"use strict";
var Utils;
(function (Utils) {
    /**
     * Полезные функции JavaScript и TypeScript
     */
    class GoodFuncs {
        /**
         * Добаление скриптов на страницу
         *
         * @param {string[]} paths - массив путей к скриптам
         * @param {"sync" | "defer" | "async"} type
         */
        static getScripts(paths, type = 'sync') {
            Array.from(document.scripts).forEach(function (script) {
                let scriptIndex = paths.indexOf(script.src);
                if (scriptIndex !== -1) {
                    delete paths[scriptIndex];
                }
            });
            paths.forEach(function (script) {
                document.body.insertAdjacentHTML('beforeend', `<script src="${script}"></script>`);
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
            let child = event.target.closest(selector);
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
        static siblings(element, filter, type = 'all') {
            let ok = type === 'prev', parent = element.parentNode, siblings = (filter ? Array.from(parent.children) : Array.from(parent.querySelectorAll(filter)));
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
         * @returns {boolean}
         */
        static checkEmptyVal() {
            for (let element of document.querySelectorAll('input:requred, select:required, textarea:required')) {
                if (!element.value) {
                    return false;
                }
            }
            return true;
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
            return styleSheet.insertRule(`${selector} { ${ruleStr} }`, styleNumber);
        }
        ;
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
            let children = Array.from(element.parentElement.children);
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
            while (!prev.matches(selector)) {
                prev = prev.previousElementSibling;
            }
            return prev;
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
            while (!next.matches(selector)) {
                next = next.nextElementSibling;
            }
            return next;
        }
        /**
         * Случайная строка заданной длины
         *
         * @param {number} symbolCount - количество символов в строке
         *
         * @returns {string}
         */
        static getRandomString(symbolCount) {
            return Math.random().toString(36).substring(symbolCount);
        }
        /**
         * Массовая установка атрибутов элемента
         *
         * @param {HTMLElement} element - элемент
         * @param {Utils.Attrs} attribites - объект атрибутов
         */
        static setAttributes(element, attribites) {
            Object.keys(attribites).forEach(function (name) {
                element.setAttribute(name, attribites[name]);
            });
        }
    }
    Utils.GoodFuncs = GoodFuncs;
})(Utils || (Utils = {}));
//# sourceMappingURL=GoodFuncs.js.map
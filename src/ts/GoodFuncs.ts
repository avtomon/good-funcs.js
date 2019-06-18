"use strict";

import {Templater} from '../../../apply-ajax.js/dist/js/ApplyAjax.js';

export namespace Utils {

    /**
     * Тип объекта атрибутов HTML-элемента
     */
    export type Attrs = { [prop : string] : string | number | boolean };

    /**
     * Тип соседства HTML-элементов
     */
    type SiblingsType = 'all' | 'prev' | 'next';

    /**
     * Полезные функции JavaScript и TypeScript
     */
    export class GoodFuncs {

        /**
         * Добаление скриптов на страницу
         *
         * @param {string[]} paths - массив путей к скриптам
         * @param {Attr} attrs - атрибуты
         *
         * @returns {Promise<void>[]}
         */
        static getScripts(paths : string[], attrs : Attrs = {}) : Promise<void>[] {

            let scriptElements : HTMLScriptElement[] = Array.from(document.getElementsByTagName('script')),
                scriptCount : number = scriptElements.length,
                lastScript : HTMLScriptElement = scriptElements[scriptCount - 2];

            let promises : Promise<void>[] = [];
            paths.forEach(function (script, index) {
                promises[index] = new Promise<void>(function (resolve) {

                    if (document.querySelector(`script[src="${script}"]`)) {
                        resolve();
                        return;
                    }

                    attrs['src'] = script;
                    let scriptElement : HTMLScriptElement = GoodFuncs.createElementWithAttrs('script', attrs) as HTMLScriptElement;
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
                                this.onload()
                            }.bind(this), 0); // сохранить "this" для onload
                        }
                    };
                });
            });


            return promises;
        };

        /**
         * Добавление файлов стилей
         *
         * @param {string[]} paths - массив путей к файлам стилей
         * @param {Utils.Attrs} attrs - атрибуты
         */
        static addCss(paths : string[], attrs : Attrs = {}) : void {

            let cssElements : HTMLLinkElement[] = Array.from(document.querySelectorAll('link[rel="stylesheet"]')),
                cssCount : number = cssElements.length,
                lastCss : HTMLLinkElement = cssElements[cssCount - 1];

            paths.forEach(function (css) {
                if (document.querySelector(`link[href="${css}"]`)) {
                    return;
                }

                attrs['href'] = css;
                attrs['rel'] = 'stylesheet';
                let cssElement : HTMLLinkElement = GoodFuncs.createElementWithAttrs('link', attrs) as HTMLLinkElement;
                lastCss.after(cssElement);
                lastCss = cssElement;
            });
        };

        /**
         * Создать элемент с заданными атрибутами
         *
         * @param {string} tagName - тег элемента
         * @param {Attrs} attrs - объект атрибутов
         *
         * @returns {HTMLElement}
         */
        static createElementWithAttrs(tagName : string, attrs : Attrs) : HTMLElement {

            let element : HTMLElement = document.createElement(tagName);
            for (let attr in attrs) {
                if (!attr) {
                    continue;
                }

                if (attr === 'text') {
                    element.innerText = attrs[attr] as string;
                    continue;
                }

                if (attr === 'html') {
                    element.innerHTML = attrs[attr] as string;
                    continue;
                }

                element.setAttribute(attr, attrs[attr] as string);
            }

            return element;
        };


        /**
         * Вернуть делегированный элемент по селектору
         *
         * @param {Event} event - произошедншее событие
         * @param {string} selector - селектор элемента
         *
         * @returns {HTMLElement | null}
         */
        static getDelegateTarget(event : Event, selector : string) : HTMLElement | null {

            let target = event.target as HTMLElement,
                child = target.closest ? target.closest(selector) : null;
            if (!child) {
                return null;
            }

            if (!(event.currentTarget as HTMLElement).contains(child)) {
                return null;
            }

            return child as HTMLElement;
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
        static siblings(element : HTMLElement, filter : string = '', type : SiblingsType = 'all') : HTMLElement[] {

            let ok : boolean = type === 'prev',
                parent = element.parentNode as HTMLElement,
                siblings : HTMLElement[] = (
                    !filter
                        ? Array.from(parent.children)
                        : Array.from(parent.querySelectorAll(filter))
                ) as HTMLElement[];

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
        };

        /**
         * Все предыдущие соседствующие элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         *
         * @returns {HTMLElement[]}
         */
        static prevAll(element : HTMLElement, filter : string) : HTMLElement[] {
            return GoodFuncs.siblings(element, filter, 'prev');
        };

        /**
         * Все следующие соседствующие элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         *
         * @returns {HTMLElement[]}
         */
        static nextAll(element : HTMLElement, filter : string) : HTMLElement[] {
            return GoodFuncs.siblings(element, filter, 'next');
        };

        /**
         * Проверка элементов форм на пустые обязательные значения
         *
         * @returns {boolean}
         */
        static checkEmptyVal(parent : HTMLElement | Document = document) : boolean {

            for (let element of parent.querySelectorAll('input:required, select:required, textarea:required')) {
                if ((element as Templater.FormElement).value === '') {
                    return false;
                }

                if (['checkbox', 'radio'].includes(element['type'])
                    && !parent.querySelector(`[name="${(element as Templater.FormElement).name}"]:checked`)) {

                    return false;
                }
            }

            return true;
        };

        /**
         * Вернуть объект таблицы стилей по имени файла
         *
         * @param {string} styleSheetName - имя файла таблицы стилей
         *
         * @returns {CSSStyleSheet | null}
         */
        static getStyleSheet(styleSheetName : string) : CSSStyleSheet | null {

            for (let sheet of Array.from(document.styleSheets)) {
                if (sheet.href && sheet.href.indexOf(styleSheetName) !== -1) {
                    return sheet as CSSStyleSheet;
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
        static removeStyleRule(styleSheetName : string, styleNumber : number) : boolean {

            if (!styleSheetName || styleNumber === undefined) {
                return false;
            }

            let styleSheet : CSSStyleSheet | null = GoodFuncs.getStyleSheet(styleSheetName);

            if (!styleSheet) {
                return false;
            }

            styleSheet.removeRule(styleNumber);

            return true;
        };

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
        static insertStyleRule(styleSheetName : string, selector : string, rules : Attrs, styleNumber? : number) : number | null {

            if (!styleSheetName || !selector || !rules) {
                return null;
            }

            let styleSheet : CSSStyleSheet | null = GoodFuncs.getStyleSheet(styleSheetName);

            if (!styleSheet) {
                return null;
            }

            let ruleStr = JSON.stringify(rules).replace(/["]/g, '');

            return styleSheet.insertRule(`${selector} ${ruleStr}`, styleNumber);
        };

        /**
         * Вернуть функцию добавления заданных правил
         *
         * @param {string} styleSheet - имя файла таблицы стилей
         * @param {string} selector - селектор
         *
         * @returns {(rules: Utils.Attrs) => number}
         */
        static pseudo(styleSheet : string, selector : string) : (rules : Attrs) => number | null {

            return function (rules : Attrs) {
                return GoodFuncs.insertStyleRule(styleSheet, selector, rules);
            };
        };

        /**
         * Индекст элемента среди соседствующих
         *
         * @param {HTMLElement} element - элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {number}
         */
        static index(element : HTMLElement, selector : string = '') : number {

            let children : HTMLElement[] = element.parentElement ? Array.from(element.parentElement.children) as HTMLElement[] : [];

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
        static prev(element : HTMLElement, selector : string) : HTMLElement | null {

            let prev = element.previousElementSibling;
            while (prev) {
                if (prev.matches(selector)) {
                    return prev as HTMLElement;
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
        static next(element : HTMLElement, selector : string) : HTMLElement | null {

            let next = element.nextElementSibling;
            while (next) {
                if (next.matches(selector)) {
                    return next as HTMLElement;
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
        static getRandomString(symbolCount : number) : string {

            return Math.random().toString(36).substring(2, symbolCount);
        }

        /**
         * Массовая установка атрибутов элемента
         *
         * @param {HTMLElement} element - элемент
         * @param {Utils.Attrs} attributes - объект атрибутов
         */
        static setAttributes(element : HTMLElement, attributes : Attrs) : void {

            Object.keys(attributes).forEach(function (name : string) {
                element.setAttribute(name, attributes[name] as string);
            })
        }

        /**
         * Переключение свойств HTML-элементов
         *
         * @param {HTMLElement} element - элемент
         * @param {string} prop - имя свойства
         */
        static toggleProp(element : HTMLElement, prop : string) : void {

            let value : boolean = Boolean(element[prop]);

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
        static filter(elements : HTMLElement[], selector : string) : HTMLElement[] {

            return elements.filter(function (element) {

                return element.matches(selector);
            })
        }

        /**
         * Видим ли элемент
         *
         * @param {HTMLElement} element - проверяемый элемент
         * @param {boolean} strict - использовать строгий режим
         *
         * @returns {boolean}
         */
        static isVisible(element : HTMLElement, strict : boolean = false) : boolean {
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
        static requestHash(url : string, params : Object = {}) : number {
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

                urlObject.searchParams.append(key, params[key])
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
}

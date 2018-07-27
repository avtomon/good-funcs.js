"use strict";

import {Templater} from '../../../ApplyAjax.js/dist/ApplyAjax.js';

export namespace Utils {

    /**
     * Тип объекта атрибутов HTML-элемента
     */
    export type Attrs = { [prop: string]: string | number };

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
         * @param {"sync" | "defer" | "async"} type
         */
        static getScripts(paths: string[], type: 'sync' | 'defer' | 'async' = 'sync'): void {

            Array.from(document.scripts).forEach(function (script) {
                let scriptIndex = paths.indexOf(script.src);
                if (scriptIndex !== -1) {
                    delete paths[scriptIndex];
                }
            });

            paths.forEach(function (script) {
                document.body.insertAdjacentHTML('beforeend', `<script src="${script}"></script>`)
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
        static createElementWithAttrs(tagName: string, attrs: Attrs): HTMLElement {

            let element: HTMLElement = document.createElement(tagName);
            for (let attr in attrs) {
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
        static getDelegateTarget(event: Event, selector: string): HTMLElement | null {

            let child = (event.target as HTMLElement).closest(selector);
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
        static siblings(element: HTMLElement, filter: string = '', type: SiblingsType = 'all'): HTMLElement[] {

            let ok: boolean = type === 'prev',
                parent = element.parentNode as HTMLElement,
                siblings: HTMLElement[] = (filter ? Array.from(parent.children) : Array.from(parent.querySelectorAll(filter))) as HTMLElement[];

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
        static prevAll(element: HTMLElement, filter: string): HTMLElement[] {
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
        static nextAll(element: HTMLElement, filter: string): HTMLElement[] {
            return GoodFuncs.siblings(element, filter, 'next');
        };

        /**
         * Проверка элементов форм на пустые обязательные значения
         *
         * @returns {boolean}
         */
        static checkEmptyVal(): boolean {

            for (let element of document.querySelectorAll('input:required, select:required, textarea:required')) {
                if ((element as Templater.FormElement).value === '') {
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
        static getStyleSheet(styleSheetName: string): CSSStyleSheet | null {

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
        static removeStyleRule(styleSheetName: string, styleNumber: number): boolean {

            if (!styleSheetName || styleNumber === undefined) {
                return false;
            }

            let styleSheet: CSSStyleSheet = GoodFuncs.getStyleSheet(styleSheetName);

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
        static insertStyleRule(styleSheetName: string, selector: string, rules: Attrs, styleNumber?: number): number | null {

            if (!styleSheetName || !selector || !rules) {
                return null;
            }

            let styleSheet: CSSStyleSheet = GoodFuncs.getStyleSheet(styleSheetName);

            if (!styleSheet) {
                return null;
            }

            let ruleStr = JSON.stringify(rules).replace(/["]/g, '');

            return styleSheet.insertRule(`${selector} { ${ruleStr} }`, styleNumber);
        };

        static pseudo(styleSheet: string, selector: string): (rules: Attrs) => number {

            return function (rules: Attrs) {
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
        static index(element: HTMLElement, selector: string = ''): number {

            let children: HTMLElement[] = Array.from(element.parentElement.children) as HTMLElement[];

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
        static prev(element: HTMLElement, selector: string): HTMLElement | null {

            let prev = element.previousElementSibling;
            while (!prev.matches(selector)) {
                prev = prev.previousElementSibling;
            }

            return prev as HTMLElement;
        }

        /**
         * Следующий элемент среди соседей, соответствующий селектору
         *
         * @param {HTMLElement} element - исходный элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {HTMLElement | null}
         */
        static next(element: HTMLElement, selector: string): HTMLElement | null {

            let next = element.nextElementSibling;
            while (!next.matches(selector)) {
                next = next.nextElementSibling;
            }

            return next as HTMLElement;
        }

        /**
         * Случайная строка заданной длины
         *
         * @param {number} symbolCount - количество символов в строке
         *
         * @returns {string}
         */
        static getRandomString(symbolCount: number): string {

            return Math.random().toString(36).substring(symbolCount);
        }

        /**
         * Массовая установка атрибутов элемента
         *
         * @param {HTMLElement} element - элемент
         * @param {Utils.Attrs} attribites - объект атрибутов
         */
        static setAttributes(element: HTMLElement, attribites: Attrs): void {

            Object.keys(attribites).forEach(function (name: string) {
                element.setAttribute(name, attribites[name] as string);
            })
        }
    }
}
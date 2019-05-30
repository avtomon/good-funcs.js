export declare namespace Utils {
    /**
     * Тип объекта атрибутов HTML-элемента
     */
    type Attrs = {
        [prop: string]: string | number | boolean;
    };
    /**
     * Тип соседства HTML-элементов
     */
    type SiblingsType = 'all' | 'prev' | 'next';
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
        static getScripts(paths: string[], attrs?: Attrs): Promise<void>[];
        /**
         * Добавление файлов стилей
         *
         * @param {string[]} paths - массив путей к файлам стилей
         * @param {Utils.Attrs} attrs - атрибуты
         */
        static addCss(paths: string[], attrs?: Attrs): void;
        /**
         * Создать элемент с заданными атрибутами
         *
         * @param {string} tagName - тег элемента
         * @param {Attrs} attrs - объект атрибутов
         *
         * @returns {HTMLElement}
         */
        static createElementWithAttrs(tagName: string, attrs: Attrs): HTMLElement;
        /**
         * Вернуть делегированный элемент по селектору
         *
         * @param {Event} event - произошедншее событие
         * @param {string} selector - селектор элемента
         *
         * @returns {HTMLElement | null}
         */
        static getDelegateTarget(event: Event, selector: string): HTMLElement | null;
        /**
         * Получить соседние элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         * @param {Utils.SiblingsType} type - тип соседства (все, выше или ниже)
         *
         * @returns {HTMLElement[]}
         */
        static siblings(element: HTMLElement, filter?: string, type?: SiblingsType): HTMLElement[];
        /**
         * Все предыдущие соседствующие элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         *
         * @returns {HTMLElement[]}
         */
        static prevAll(element: HTMLElement, filter: string): HTMLElement[];
        /**
         * Все следующие соседствующие элементы
         *
         * @param {HTMLElement} element - относительно какого элемента ищем
         * @param {string} filter - фильтрующий селектор
         *
         * @returns {HTMLElement[]}
         */
        static nextAll(element: HTMLElement, filter: string): HTMLElement[];
        /**
         * Проверка элементов форм на пустые обязательные значения
         *
         * @returns {boolean}
         */
        static checkEmptyVal(parent?: HTMLElement | Document): boolean;
        /**
         * Вернуть объект таблицы стилей по имени файла
         *
         * @param {string} styleSheetName - имя файла таблицы стилей
         *
         * @returns {CSSStyleSheet | null}
         */
        static getStyleSheet(styleSheetName: string): CSSStyleSheet | null;
        /**
         * Удалить правило из таблицы стилей
         *
         * @param {string} styleSheetName - имя файла таблицы стилей
         * @param {number} styleNumber - номер правила
         *
         * @returns {boolean}
         */
        static removeStyleRule(styleSheetName: string, styleNumber: number): boolean;
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
        static insertStyleRule(styleSheetName: string, selector: string, rules: Attrs, styleNumber?: number): number | null;
        /**
         * Вернуть функцию добавления заданных правил
         *
         * @param {string} styleSheet - имя файла таблицы стилей
         * @param {string} selector - селектор
         *
         * @returns {(rules: Utils.Attrs) => number}
         */
        static pseudo(styleSheet: string, selector: string): (rules: Attrs) => number | null;
        /**
         * Индекст элемента среди соседствующих
         *
         * @param {HTMLElement} element - элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {number}
         */
        static index(element: HTMLElement, selector?: string): number;
        /**
         * Предыдущий элемент среди соседей, соответствующий селектору
         *
         * @param {HTMLElement} element - исходный элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {HTMLElement | null}
         */
        static prev(element: HTMLElement, selector: string): HTMLElement | null;
        /**
         * Следующий элемент среди соседей, соответствующий селектору
         *
         * @param {HTMLElement} element - исходный элемент
         * @param {string} selector - фильтрующий селектор
         *
         * @returns {HTMLElement | null}
         */
        static next(element: HTMLElement, selector: string): HTMLElement | null;
        /**
         * Случайная строка заданной длины
         *
         * @param {number} symbolCount - количество символов в строке
         *
         * @returns {string}
         */
        static getRandomString(symbolCount: number): string;
        /**
         * Массовая установка атрибутов элемента
         *
         * @param {HTMLElement} element - элемент
         * @param {Utils.Attrs} attributes - объект атрибутов
         */
        static setAttributes(element: HTMLElement, attributes: Attrs): void;
        /**
         * Переключение свойств HTML-элементов
         *
         * @param {HTMLElement} element - элемент
         * @param {string} prop - имя свойства
         */
        static toggleProp(element: HTMLElement, prop: string): void;
        /**
         * Отфильтровать массив элементов по селектору
         *
         * @param {HTMLElement[]} elements - набор елементов
         * @param {string} selector - селектор
         *
         * @returns {HTMLElement[]}
         */
        static filter(elements: HTMLElement[], selector: string): HTMLElement[];
        /**
         * Видим ли элемент
         *
         * @param {HTMLElement} element - проверяемый элемент
         * @param {boolean} strict - использовать строгий режим
         *
         * @returns {boolean}
         */
        static isVisible(element: HTMLElement, strict?: boolean): boolean;
        /**
         * Числовой хэш запроса
         *
         * @param {string} url
         * @param {Object} params
         *
         * @returns {number}
         */
        static requestHash(url: string, params?: Object): number;
    }
}

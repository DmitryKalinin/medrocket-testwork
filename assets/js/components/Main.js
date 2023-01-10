//родительский класс для вложенных блоков, содержит общий конструктор,
//методы очистки блока, сворачивания, создания элемента

import api from "../api/api.js";

export default class Main {

    constructor(data, parent) {
        this.data = data;
        this.api = api;
		this.parent = parent;
    }
    clearChildren(parent) {
        for (let i = 1; i < parent.childNodes.length; i++) {
            parent.childNodes[i].remove();
        }
    }
    getElement(type, options) {
        const element = document.createElement(type);
        switch (typeof options) {
            case 'object':
                {
                    for (let attr in options) {
                        element.setAttribute(attr, options[attr])
                    }
					break
                }
            case 'string':
                {
                    element.classList.add(options)
					break
                }
        }
        return element;
    }

    show(element, func) {
        if (element.childNodes.length > 1) {
			element.classList.remove('open')
            for (let i = 1; i < element.childNodes.length; i++) {
                element.childNodes[i].remove();
            }
        } else{
			element.classList.add('open')
			func();
		}
    }
    render() {}
}
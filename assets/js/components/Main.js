//родительский класс для вложенных блоков, содержит общий конструктор,
//методы очистки блока, сворачивания, создания элемента

import { API } from "../API.js";
const api = new API();
export class General {

    constructor(data) {
        this.data = data;
        this.api = api;
    }
    clearChildren(parent) {
        for (let i = 1; i < parent.childNodes.length; i++) {
            parent.childNodes[i].remove();
        }
    }
    generalCreateElement(type, className) {
        let element = document.createElement(type);
        element.classList.add(className);
        return element;
    }
    show(element, func) {
        if (element.childNodes.length > 1) {
            for (let i = 1; i < element.childNodes.length; i++) {
                element.childNodes[i].remove();
            }
        } else func();
    }
    render() {}
}
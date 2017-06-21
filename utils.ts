export function templateClone(id: string): DocumentFragment {
    let selector = "template#" + id;
    let template = document.querySelector(selector) as HTMLTemplateElement | null;
    if (!template) {
        throw new Error(`Document missing required '${selector}' element`);
    }
    let fragment = document.importNode(template.content, true);
    return fragment;
}

export function fillControllerElements(parentNode: NodeSelector, controllerName: string, newChild: DocumentFragment): void {
    let elems = findControllerElements(parentNode, controllerName);
    // NodeList isn't iterable on Edge, so you can't use array.forEach()
    Array.prototype.forEach.call(elems, (e: HTMLElement) => {
        e.innerHTML = "";
        e.appendChild(newChild);
    });
}

function findControllerElements(parentNode: NodeSelector, controllerName: string): NodeListOf<HTMLElement> {
    let selector = `[data-estd-controller='${controllerName}']`;
    return findAllElements(parentNode, selector) as NodeListOf<HTMLElement>;
}

export function fillContentElements(parentNode: NodeSelector, propName: string, content: string): void {
    let elems = findContentElements(parentNode, propName);
    // NodeList isn't iterable on Edge, so you can't use array.forEach()
    Array.prototype.forEach.call(elems, (e: Element) => {
        e.textContent = content;
    });
}

function findContentElements(parentNode: NodeSelector, propName: string): NodeListOf<Element> {
    let selector = `[data-estd-content='${propName}']`;
    return findAllElements(parentNode, selector);
}

export function setAttrElements(parentNode: NodeSelector, attrName: string, value: string): void {
    let elems = findAttrElements(parentNode, attrName);
    // NodeList isn't iterable on Edge, so you can't use array.forEach()
    Array.prototype.forEach.call(elems, (e: Element) => {
        e.setAttribute(attrName, value);
    });
}

function findAttrElements(parentNode: NodeSelector, attrName: string): NodeListOf<Element> {
    let selector = `[data-estd-attr='${attrName}']`;
    return findAllElements(parentNode, selector);
}

export function findElement(parentNode: NodeSelector, selector: string): Element {
    let element = parentNode.querySelector(selector);
    if (!element) {
        throw new Error(`'${parentNode}' missing required '${selector}' element`);
    }
    return element;
}

function findAllElements(parentNode: NodeSelector, selector: string): NodeListOf<Element> {
    let elements = parentNode.querySelectorAll(selector);
    if (!elements.length) {
        throw new Error(`'${parentNode}' missing required '${selector}' element`);
    }
    return elements;
}

export function getRequiredAttribute(element: Element, attributeName: string): string {
    let value = element.getAttribute(attributeName);
    if (!value) {
        throw new Error(`'${element}' missing required '${attributeName}' attribute`);
    }
    return value;
}

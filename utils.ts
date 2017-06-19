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
    findControllerElements(parentNode, controllerName).forEach(e => {
        e.innerHTML = "";
        e.appendChild(newChild)}
    );
}

function findControllerElements(parentNode: NodeSelector, controllerName: string): NodeListOf<HTMLElement> {
    let selector = `[data-estd-controller='${controllerName}']`;
    return findAllElements(parentNode, selector) as NodeListOf<HTMLElement>;
}

export function setContentElement(parentNode: NodeSelector, propName: string, content: string): void {
    findContentElements(parentNode, propName).forEach(elem => elem.textContent = content);
}

function findContentElements(parentNode: NodeSelector, propName: string): NodeListOf<Element> {
    let selector = `[data-estd-content='${propName}']`;
    return findAllElements(parentNode, selector);
}

export function setPropElements(parentNode: NodeSelector, propName: string, value: string): void {
    let attributeName = "data-estd-" + propName;
    findPropElements(parentNode, propName).forEach(elem => elem.setAttribute(attributeName, value));
}

function findPropElements(parentNode: NodeSelector, propName: string): NodeListOf<Element> {
    let selector = `[data-estd-prop='${propName}']`;
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
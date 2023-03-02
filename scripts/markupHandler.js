function* infinite() {
    let index = 0;
    while (true) {
        yield index++;
    }
}
const generator = infinite(); // "Generator { }"
const createElement = (tagName, options) => { return { contentType: "element", tagName, ...options, componentID: options?.attributes?.find(attribute => attribute.attributeName === "componentid")?.attributeValue || generator.next().value } }
const createText = (tagText) => { return { contentType: "text", tagText } }
const createAttribute = (attributeName, attributeValue = true) => { return { attributeName, attributeValue } }
const buildElement = ({ tagName, children, attributes, componentID }, parentElement) => {
    const newElement = document.createElement(tagName);
    newElement.setAttribute("componentID", componentID)
    if (attributes) {
        attributes.forEach(({ attributeName, attributeValue }) => {
            newElement.setAttribute(
                attributeName,
                attributeValue ? attributeValue : true
            );
        });
    }
    if (children) {
        children.forEach((child) => {
            buildUI(child, newElement);
        });
    }
    return parentElement.appendChild(newElement);
}
const buildText = ({ tagText }, parentElement) => {
    const newElement = document.createTextNode(tagText);
    return parentElement.appendChild(newElement);
}
const buildUI = (element, parentElement) => {
    const { contentType } = element;
    return contentType === "element"
        ? buildElement(element, parentElement)
        : buildText(element, parentElement);
}
export {
    createElement,
    createText,
    createAttribute,
    buildElement,
    buildText,
    buildUI,
}
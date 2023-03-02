import { app } from "./webComponents.js";
import { isFoundObj } from "./helpers.js";
import { createMarkdownForElement } from "./webComponents.js";

const mutationObserver = new MutationObserver((entries) => {
  console.log("🚀 ~ file: observeDOM.js:6 ~ mutationObserver ~ entries[0]:", entries[0])
  const { type, target, addedNodes, removedNodes } = entries[0];
  if (type === "childList") {
    const componentID = target.getAttribute("componentID");
    const parentObj = isFoundObj(app, componentID);
    if (addedNodes.length) {
      const refElement = addedNodes[0];
      const newElement = createMarkdownForElement(
        refElement.tagName.toLowerCase(),
        refElement
      );
      if(parentObj?.children){
        parentObj.children = [...parentObj.children, newElement];
      } else {
        Object.assign(parentObj, {children: [newElement]});
      }
    }
    if (removedNodes.length) {
      parentObj.children = parentObj.children.filter(
        (child) =>
          child.componentID != removedNodes[0].getAttribute("componentID")
      );
    }
  }
});
const config = {
  // Check for changes in HTML
  childList: true,
  // Check for changes in attributes
  attributes: true,
  attributeOldValue: true,
  // A filter to observe only certain attributes
  // attributeFilter: ["id"],
  // Check for changes in text
  characterData: true,
  characterDataOldValue: true,
  // Check for changes all descendents of the element we are observing
  subtree: true,
};
const observeElementForChanges = (elementSelector) => {
  const element = document.querySelector(elementSelector);
  mutationObserver.observe(element, config);
};

export { observeElementForChanges };

import { app } from "./webComponents.js";
import { isFoundObj } from "./helpers.js";
import { createMarkdownForElement } from "./webComponents.js";
import { createText } from "./markupHandler.js";

// This function is used to observe the the HTML for any changes.
// It syncs these changes with the APP markdown variable,
// so that these changes can be downloaded.
const mutationObserver = new MutationObserver((entries) => {
  console.log("🚀 ~ file: observeDOM.js:9 ~ mutationObserver ~ entries:", entries)
  const { type, target, addedNodes, removedNodes } = entries[0];
  if (type === "childList") {
    const componentID = target.getAttribute("componentID");
    const parentObj = isFoundObj(app, componentID);
    if (addedNodes.length) {
      const refElement = addedNodes[0];
      const newElement = createMarkdownForElement(
        refElement.tagName?.toLowerCase(),
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
  if (type === "attributes"){
    const componentID = target.getAttribute("componentID");
    const parentObj = isFoundObj(app, componentID);
    const updatedEl = createMarkdownForElement(target.tagName.toLowerCase(), target);
    parentObj.attributes = updatedEl.attributes;
  }
  if (type === "characterData") {
    const componentID = target.parentNode.getAttribute("componentID");
    const parentObj = isFoundObj(app, componentID);
    parentObj.children = [createText(target.data)]
    console.log("🚀 ~ file: observeDOM.js:47 ~ mutationObserver ~ parentObj:", app)
  }
});
const config = {
  childList: true,
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true,
  subtree: true,
};
const syncDOMWithMarkdown = (elementSelector) => {
  const element = document.querySelector(elementSelector);
  mutationObserver.observe(element, config);
};

export { syncDOMWithMarkdown };

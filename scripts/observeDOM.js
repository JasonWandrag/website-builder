import { app } from "./webComponents.js";
import { isFoundObj } from "./helpers.js";
import { createMarkdownForElement } from "./webComponents.js";

const mutationObserver = new MutationObserver((entries) => {
  // For every change in the DOM, I need to update the 'app' object
  console.log(entries);
  const { type, target, addedNodes, removedNodes } = entries[0];
  // console.log(type);
  if(type === "childList") {
    // console.log(target.getAttribute("componentid"))
    const componentID = target.getAttribute("componentid")
    const parentObj = isFoundObj(app, componentID)
    console.log("🚀 ~ file: observeDOM.js:14 ~ mutationObserver ~ parentObj:", parentObj)
    // console.log({addedNodes, removedNodes})
    if(addedNodes.length){
      const refElement = addedNodes[0]
      const newElement = createMarkdownForElement(refElement.tagName.toLowerCase(), refElement)
      parentObj.children = [...parentObj.children, newElement]
    }
    console.log("🚀 ~ file: observeDOM.js:13 ~ mutationObserver ~ parentObj:", parentObj)
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

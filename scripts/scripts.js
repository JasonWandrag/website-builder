import { buildUI } from "./markupHandler.js";
import { app } from "./webComponents.js";
import { observeElementForChanges } from "./observeDOM.js";
console.log(app);
buildUI(app, document.querySelector("website"));
observeElementForChanges("#app")
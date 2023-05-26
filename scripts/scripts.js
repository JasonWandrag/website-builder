import { buildUI } from "./markupHandler.js";
import { app } from "./webComponents.js";
import { syncDOMWithMarkdown } from "./observeDOM.js";
console.log(app);
buildUI(app, document.querySelector("website"));
syncDOMWithMarkdown("#app")

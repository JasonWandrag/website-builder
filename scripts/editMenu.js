import { app, generateSection, generateUI } from "./webComponents.js";
import { waitForMs, toggleModal } from "./helpers.js";
import { buildUI } from "./markupHandler.js";
import { touchDuration, isMobile, elementTypes } from "./lib/constants.js";

// Move to helpers
const createStyleGrouping = (items) => {
    console.log("hello: ", 1);
    const styleable = document.querySelector(`[componentID='${selectedID}']`)
  const commonStyleGroups = [
    "animation",
    "background",
    "border",
    "flex",
    "font",
    "grid",
    "list",
    "margin",
    "outline",
    "overflow",
    "padding",
    "scroll",
    "text",
    "transform",
    "transition",
  ];
  const sizeAttributes = [
    "height",
    "max-height",
    "min-height",
    "width",
    "max-width",
    "min-width",
  ];
  const positionAttributes = [
    "position",
    "top",
    "bottom",
    "left",
    "right",
    "z-index",
  ];
  const displayAttributes = ["display", "box-shadow", "opacity", "visibility"];
  const flexAndGrid = ["align-", "justify-"];
  const fontExtras = [
    "color",
    "letter-spacing",
    "line-break",
    "line-height",
    "white-space",
    "word-break",
    "word-spacing",
    "writing-mode",
  ];
  const mouse = ["cursor", "pointer-events"];
  const imageExtras = ["object-fit", "object-position"];
  const transformExtras = [
    "perspective",
    "perspective-origin",
    "rotate",
    "scale",
    "translate",
    "zoom",
  ];
  return items.reduce((styleDefinitions, styleAttribute) => {
    const commonGroup = commonStyleGroups.find((group) =>
      styleAttribute.startsWith(group)
    );
    if (commonGroup) {
      if (!styleDefinitions[commonGroup]) styleDefinitions[commonGroup] = {};
      styleDefinitions[commonGroup][styleAttribute] =
        styleable.style[styleAttribute];
    } else if (sizeAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.size) styleDefinitions.size = {};
      styleDefinitions.size[styleAttribute] = styleable.style[styleAttribute];
    } else if (positionAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.position) styleDefinitions.position = {};
      styleDefinitions.position[styleAttribute] =
        styleable.style[styleAttribute];
    } else if (displayAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.display) styleDefinitions.display = {};
      styleDefinitions.display[styleAttribute] =
        styleable.style[styleAttribute];
    } else if (sizeAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.size) styleDefinitions.size = {};
      styleDefinitions.size[styleAttribute] = styleable.style[styleAttribute];
    } else if (flexAndGrid.find((group) => styleAttribute.startsWith(group))) {
      if (!styleDefinitions.flex) styleDefinitions.flex = {};
      if (!styleDefinitions.grid) styleDefinitions.grid = {};
      styleDefinitions.flex[styleAttribute] = styleable.style[styleAttribute];
      styleDefinitions.grid[styleAttribute] = styleable.style[styleAttribute];
    } else if (fontExtras.includes(styleAttribute)) {
      if (!styleDefinitions.font) styleDefinitions.font = {};
      styleDefinitions.font[styleAttribute] = styleable.style[styleAttribute];
    } else if (mouse.includes(styleAttribute)) {
      if (!styleDefinitions.mouse) styleDefinitions.mouse = {};
      styleDefinitions.mouse[styleAttribute] = styleable.style[styleAttribute];
    } else if (imageExtras.includes(styleAttribute)) {
      if (!styleDefinitions.images) styleDefinitions.images = {};
      styleDefinitions.images[styleAttribute] = styleable.style[styleAttribute];
    } else if (transformExtras.includes(styleAttribute)) {
      if (!styleDefinitions.transform) styleDefinitions.transform = {};
      styleDefinitions.transform[styleAttribute] =
        styleable.style[styleAttribute];
    } else {
      if (!styleDefinitions.other) styleDefinitions.other = {};
      styleDefinitions.other[styleAttribute] = styleable.style[styleAttribute];
    }
    return styleDefinitions;
  }, {});
};
const renderStyleInputs = (styleGroup, selectedID) => {
    const styleable = document.querySelector(`[componentID='${selectedID}']`)
    
    const inputs = [];
    for (const styleAttr in styleGroup) {
      inputs.push(`
          <label class="accordion-heading">
            ${styleAttr}: 
            <input 
              type=${styleAttr.includes("color") ? "color" : "text"} 
              value="${styleable.style[styleAttr]}"
              onInput="updateStyle('${styleAttr}', this.value, '${selectedID}')"
            />
          </label>`);
    }
    return inputs.join("");
  };
  
const nav = document.querySelector("#navbar");
const navButtons = document.querySelectorAll(".nav-button");

const addEl = document.querySelector("[add-element]");
const elementTypeSelector = document.querySelector("[elementTypeSelector]");
const typeVariantSelector = document.querySelector("[typeVariantSelector]");
const variantOptions = document.querySelector("[variantOptions]");
const createElementBtn = document.querySelector("[createElementBtn]");

const editEl = document.querySelector("[edit-element]");

const toggleScreenSizeBtn = document.querySelector("[mobile-responsive]");

const delEl = document.querySelector("[delete-element]");
const dlBtn = document.querySelector("[download-website]");
const settingsBtn = document.querySelector("[site-settings]");

const sectionCols = document.querySelector("[sectionCols]");
const sectionDirection = document.querySelector("[sectionDirection]");
const sectionSubmit = document.querySelector("[sectionSubmit]");
const addSection = document.querySelector("[add-section]");

let menuVisible;
let timer;
let selectedID = null;
let elToCreate = {};

const toggleNav = async (e) => {
  const x = !isMobile ? e.clientX : e.touches[0].pageX;
  const y = !isMobile ? e.clientY : e.touches[0].pageY;
  menuVisible = !menuVisible;
  nav.classList.toggle("show");
  navButtons.forEach((item) => item.classList.toggle("show"));
  if (!menuVisible) await waitForMs(250);
  nav.style.left = `${menuVisible ? x : "-300"}px`;
  nav.style.top = `${y}px`;
};
const onLongTouch = (e) => {
  toggleNavMobile(e);
  if (!menuVisible) clearTimeout(timer);
};
window.oncontextmenu = (e) => {
  selectedID = e.target.getAttribute("componentID");
  toggleNav(e);
  return false; // cancel default menu
};
document.querySelector("body").addEventListener("touchstart", (e) => {
  if (!timer) {
    timer = setTimeout(onLongTouch(e), touchDuration);
  }
});
document.querySelector("body").addEventListener("touchend", (e) => {
  if (timer) {
    clearTimeout(timer);
  }
});
document.querySelectorAll(".nav-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    toggleNav(e);
  });
});

// Adding an element
addEl.addEventListener("click", () => {
  toggleModal("addElementModal");
});
// Editing an element
editEl.addEventListener("click", () => {
  const elementToEdit = document.querySelector(`[componentID='${selectedID}']`);
  const styleOptions = document.querySelector("#style-options");
  const computedStyles = window.getComputedStyle(elementToEdit);
  const styleAttributes = Array.from(computedStyles);
  const groupedItems = Object.fromEntries(
    Object.entries(createStyleGrouping(styleAttributes)).sort()
  );
  styleOptions.innerHTML = ""
  for (const styleGroup in groupedItems) {
    styleOptions.innerHTML += `<div>
      <h3 class="accordion-heading">
        ${styleGroup}
        <button onClick="document.querySelector('#${styleGroup}-accordion').classList.toggle('open')">+</button>
      </h3>
      <div class="style-inputs" id="${styleGroup}-accordion">
        ${renderStyleInputs(groupedItems[styleGroup], selectedID)}
      </div>
    </div>`;
  }
  toggleModal("editElementModal");
});
settingsBtn.addEventListener("click", () => {
  toggleModal("siteSettingsModal");
});
const screenSizes = ["desktop", "tablet", "mobile"];
let screenSizeIndex = 0;
toggleScreenSizeBtn.addEventListener("click", () => {
  const appContainer = document.querySelector("website");
  screenSizeIndex++;
  if (screenSizeIndex === screenSizes.length) screenSizeIndex = 0;
  appContainer.classList = screenSizes[screenSizeIndex];
});
// Create initial Select
for (let elements in elementTypes) {
  elementTypeSelector.innerHTML += `<option value=${elements}>${elements}</option>`;
}
// Change Type
elementTypeSelector.addEventListener("change", (e) => {
  elToCreate = {};
  elToCreate.elementType = e.target.value;
  typeVariantSelector.innerHTML =
    "<option disabled selected>Select a type</option>";
  for (let variant in elementTypes[e.target.value]) {
    typeVariantSelector.innerHTML += `<option value=${variant}>${variant}</option>`;
  }
  variantOptions.innerHTML = "";
});
// Change Variant
typeVariantSelector.addEventListener("change", (e) => {
  elToCreate.variantType = e.target.value;
  variantOptions.innerHTML = "";
  for (let option in elementTypes[elToCreate.elementType][e.target.value]) {
    variantOptions.innerHTML += `<input type="text" placeholder=${option} value='${
      elementTypes[elToCreate.elementType][e.target.value][option]
    }' variantOptionInput>`;
  }
});
// Create element
createElementBtn.addEventListener("click", () => {
  const elementOptions = document.querySelectorAll(`[variantOptionInput]`);
  elementOptions.forEach((option) => {
    elToCreate[option.placeholder] = option.value;
  });
  buildUI(
    generateUI(elToCreate),
    document.querySelector(`[componentID='${selectedID}']`)
  );
  toggleModal("addElementModal");
});

// Adding a section
addSection.addEventListener("click", () => {
  toggleModal("addSectionModal");
});
sectionSubmit.addEventListener("click", () => {
  const newSection = {
    // rows: sectionRows.value,
    cols: sectionCols.value,
    direction: sectionDirection.value,
  };
  buildUI(
    generateSection(newSection),
    document.querySelector(`[componentID='${selectedID}']`)
  );
  toggleModal("addSectionModal");
});

// Delete a section
delEl.addEventListener("click", (e) => {
  document.querySelector(`[componentID='${selectedID}']`).remove();
});

// Download Markup
function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  window.open("https://dynamic-site-loader.netlify.app/", "_blank");
}

dlBtn.addEventListener("click", (e) => {
  downloadObjectAsJson(app, "markdown");
});

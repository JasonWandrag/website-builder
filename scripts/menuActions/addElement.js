import { generateUI } from "../webComponents.js";
import { toggleModal } from "../helpers.js";
import { buildUI } from "../markupHandler.js";
import { selectedID, elToCreate, elementTypes } from "./menuVariables.js";

const addEl = document.querySelector("[add-element]");
const elementTypeSelector = document.querySelector("[elementTypeSelector]");
const typeVariantSelector = document.querySelector("[typeVariantSelector]");
const variantOptions = document.querySelector("[variantOptions]");
const createElementBtn = document.querySelector("[createElementBtn]");


// Adding an element
addEl.addEventListener("click", () => {
  toggleModal("addElementModal");
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

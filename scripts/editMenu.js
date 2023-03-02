import { app, generateSection, generateUI } from './webComponents.js'
import { waitForMs, toggleModal } from './helpers.js';
import { buildUI } from './markupHandler.js';

const nav = document.querySelector("#navbar");
const navButtons = document.querySelectorAll(".nav-button");
const addEl = document.querySelector('[add-element]')
const delEl = document.querySelector('[delete-element]')
const dlBtn = document.querySelector('[download-website]')
const elementTypeSelector = document.querySelector('[elementTypeSelector]')
const typeVariantSelector = document.querySelector('[typeVariantSelector]')
const sectionCols = document.querySelector('[sectionCols]')
const sectionDirection = document.querySelector('[sectionDirection]')
const sectionSubmit = document.querySelector('[sectionSubmit]')
const variantOptions = document.querySelector('[variantOptions]')
const createElementBtn = document.querySelector('[createElementBtn]')
const addSection = document.querySelector('[add-section]')
const touchDuration = 200;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
);
const elementTypes = {
    media: {
        img: {
            src: "",
            alt: "",
        },
        // video: {
        //     src: "",
        //     alt: "",
        // },
    },
    input: {
        text: {
            placeholder: "",
            name: ""
        },
        email: {
            placeholder: "",
            name: ""
        },
        checkbox: {
            value: "",
            name: ""
        },
        radio: {
            value: "",
            name: ""
        },
        range: {
            min: 1,
            max: 10,
            value: 5,
            step: 1,
        },
        // date: {
        //     min: 1,
        //     max: 10,
        //     value: 5,
        //     step: 1,
        // },
        number: {
            min: 1,
            max: 10,
            value: 5,
            step: 1,
            placeholder: ""
        },
        submit: {
            text: "",
        },
        form: {
            action: "",
            method: "post",
            autocomplete: "on"
        }
    },
    text: {
        h1: {
            text: ""
        },
        h2: {
            text: ""
        },
        h3: {
            text: ""
        },
        h4: {
            text: ""
        },
        h5: {
            text: ""
        },
        h6: {
            text: ""
        },
        p: {
            text: ""
        },
        button: {
            text: ""
        },
        a: {
            href: "#",
            target: "_self",
            text: ""
        }
    }
}

let menuVisible;
let timer;
let selectedID = null
let elToCreate = {}

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
    selectedID = e.target.getAttribute("componentID")
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
    toggleModal("addElementModal")
})
// Create initial Select
for (let elements in elementTypes) {
    elementTypeSelector.innerHTML += `<option value=${elements}>${elements}</option>`
}
// Change Type
elementTypeSelector.addEventListener("change", (e) => {
    elToCreate = {}
    elToCreate.elementType = e.target.value
    typeVariantSelector.innerHTML = '<option disabled selected>Select a type</option>'
    for(let variant in elementTypes[e.target.value]){
        typeVariantSelector.innerHTML += `<option value=${variant}>${variant}</option>`
    }
    variantOptions.innerHTML = ""
})
// Change Variant
typeVariantSelector.addEventListener("change", (e) => {
    elToCreate.variantType = e.target.value
    variantOptions.innerHTML = ""
    for(let option in elementTypes[elToCreate.elementType][e.target.value]){
        variantOptions.innerHTML += `<input type="text" placeholder=${option} value='${elementTypes[elToCreate.elementType][e.target.value][option]}' variantOptionInput>`
    }
})
// Create element
createElementBtn.addEventListener("click", () => {
    const elementOptions = document.querySelectorAll(`[variantOptionInput]`)
    elementOptions.forEach((option) => {
        elToCreate[option.placeholder] = option.value
    })
    buildUI(generateUI(elToCreate), document.querySelector(`[componentID='${selectedID}']`))
    toggleModal("addElementModal")
})

// Adding a section
addSection.addEventListener("click", () => {
    toggleModal("addSectionModal")
})
sectionSubmit.addEventListener("click", () => {
    const newSection = {
        // rows: sectionRows.value,
        cols: sectionCols.value,
        direction: sectionDirection.value
    }
    buildUI(generateSection(newSection), document.querySelector(`[componentID='${selectedID}']`))
    toggleModal("addSectionModal")
})

delEl.addEventListener("click", e => {
    document.querySelector(`[componentID='${selectedID}']`).remove()
})

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    window.open("https://dynamic-site-loader.netlify.app/", "_blank");
  }

dlBtn.addEventListener("click", e => {
    downloadObjectAsJson(app, "markdown")
})
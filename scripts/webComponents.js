import { createElement, createText, createAttribute } from "./markupHandler.js";
// Sections or pages to generate
const sections = [
  "landing",
  "about",
  "projects",
  "testimonials",
  "skills",
  "contact",
];
// UI Components
const navbar = createElement("nav", {
  children: [
    createElement("h1", { children: [createText("Jason")] }),
    createElement("ul", {
      children: sections.map((section) =>
        createElement("li", {
          children: [
            createElement("a", {
              children: [createText(section)],
              attributes: [
                createAttribute("href", `#${section}`),
                createAttribute(
                  "style",
                  `
                    text-decoration: none;
                    color: inherit;
                    padding: 10px;
                    display: block;
                    text-transform: capitalize;
                  `
                ),
              ],
            }),
          ],
        })
      ),
      attributes: [
        createAttribute(
          "style",
          `
                display: flex;
                list-style-type: none;
              `
        ),
      ],
    }),
  ],
  attributes: [
    createAttribute(
      "style",
      `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: cornflowerblue;
        padding: 1rem 3rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      `
    ),
  ],
});
const content = createElement("main", {
  children: sections.map((section, index) =>
    createElement("section", {
      children: [
        createElement("h1", {
          children: [createText(section)],
          attributes: [
            createAttribute(
              "style",
              `text-transform: uppercase; margin-bottom: 20px`
            ),
            createAttribute("contenteditable"),
          ],
        }),
        createElement("p", {
          children: [
            createText(
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officiis facilis officia, tempora inventore earum provident! Voluptatem minima, repellendus itaque earum dolor omnis eos ipsa unde tempore suscipit rem nobis."
            ),
          ],
          attributes: [
            createAttribute("style", `text-align: center;`),
            createAttribute("contenteditable"),
          ],
        }),
      ],
      attributes: [
        createAttribute("id", section),
        createAttribute(
          "style",
          `
            min-height: 100vh;
            padding: 10%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: ${index % 2 === 0 ? "cornflowerblue" : "#333"};
            background: ${index % 2 === 0 ? "#333" : "cornflowerblue"};
          `
        ),
      ],
    })
  ),
});
const footer = createElement("footer", {
  children: [createText("Made by Jason")],
  attributes: [
    createAttribute(
      "style",
      `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem 3rem;
        background: cornflowerblue;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      `
    ),
  ],
});
// Load components to main app component
const app = createElement("div", {
  children: [navbar, content, footer],
  attributes: [createAttribute("id", "app")],
});

// Default Element Constructors
const createInputUI = (elementMarkdown) => {
  switch (elementMarkdown.variantType) {
    case "text":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute("placeholder", elementMarkdown.placeholder),
          createAttribute("name", elementMarkdown.name),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block; width: 100%`
          ),
        ],
      });
    case "email":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute("placeholder", elementMarkdown.placeholder),
          createAttribute("name", elementMarkdown.name),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block; width: 100%`
          ),
        ],
      });
    case "checkbox":
      return createElement("label", {
        children: [
          createElement("input", {
            attributes: [
              createAttribute("type", elementMarkdown.variantType),
              createAttribute("value", elementMarkdown.value),
              createAttribute("name", elementMarkdown.name),
              createAttribute(
                "style",
                `text-align: center; padding: 10px; display: block`
              ),
            ],
          }),
          createText(elementMarkdown.value),
        ],
      });
    case "radio":
      return createElement("label", {
        children: [
          createElement("input", {
            attributes: [
              createAttribute("type", elementMarkdown.variantType),
              createAttribute("value", elementMarkdown.value),
              createAttribute("name", elementMarkdown.name),
              createAttribute(
                "style",
                `text-align: center; padding: 10px; display: block`
              ),
            ],
          }),
          createText(elementMarkdown.value),
        ],
      });
    case "range":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute("value", elementMarkdown.value),
          createAttribute("min", elementMarkdown.min),
          createAttribute("max", elementMarkdown.max),
          createAttribute("step", elementMarkdown.step),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block`
          ),
        ],
      });
    case "submit":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block`
          ),
        ],
        children: [createText(elementMarkdown.text)],
      });
    case "form":
      return createElement(elementMarkdown.variantType, {
        attributes: [
          createAttribute("action", elementMarkdown.action),
          createAttribute("method", elementMarkdown.method),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; background: rgba(255, 255, 255, 0.3); display: flex; flex-direction: column`
          ),
        ],
      });
  }
};
const createTextUI = (elementMarkdown) => {
  switch (elementMarkdown.variantType) {
    case "a":
      return createElement(elementMarkdown.variantType, {
        children: [createText(elementMarkdown.text)],
        attributes: [
          createAttribute("href", elementMarkdown.href),
          createAttribute("target", elementMarkdown.target),
          createAttribute("style", `text-align: center; padding: 10px; `),
          createAttribute("contenteditable")
        ],
      });
    default:
      return createElement(elementMarkdown.variantType, {
        children: [createText(elementMarkdown.text)],
        attributes: [
          createAttribute("style", `text-align: center; padding: 10px; `),
          createAttribute("contenteditable")
        ],
      });
  }
};
const createMediaUI = (elementMarkdown) => {
  // if (mediaType === "video") return createElement()
  if (elementMarkdown.variantType === "img")
    return createElement("img", {
      attributes: [
        createAttribute("src", elementMarkdown.src),
        createAttribute("alt", elementMarkdown.alt),
        createAttribute(
          "style",
          `width: 100%; height: 100%; object-fit: cover; object-position: center center;`
        ),
      ],
    });
};

// Handle element creation from the form
const generateUI = (elementMarkdown) => {
  if (elementMarkdown.elementType === "input")
    return createInputUI(elementMarkdown);
  if (elementMarkdown.elementType === "text")
    return createTextUI(elementMarkdown);
  if (elementMarkdown.elementType === "media")
    return createMediaUI(elementMarkdown);
};
// Handle Section creation from the form
const generateSection = (sectionMarkdown) => {
  let boxes = [];
  // let amtBoxes = sectionMarkdown.rows * sectionMarkdown.cols

  for (let i = 0; i < sectionMarkdown.cols; i++) {
    boxes.push(
      createElement("div", {
        attributes: [
          createAttribute(
            "style",
            `text-align: center; padding: 10px; background: rgba(255,255,255,0.3); color: #333; width: ${
              sectionMarkdown.direction == "row"
                ? `calc(100% / ${sectionMarkdown.cols})`
                : "100%"
            };`
          ),
        ],
      })
    );
  }
  return createElement("section", {
    children: boxes,
    attributes: [
      createAttribute(
        "style",
        `width: 100%; text-align: center; display: flex; flex-direction: ${sectionMarkdown.direction}; gap: 10px; justify-content: space-between`
      ),
    ],
  });
};

const createMarkdownForElement = (tagName, element) => {
  const children = element.children.length
    ? Array.from(element.children).map((child) =>
        createMarkdownForElement(child.tagName.toLowerCase(), child)
      )
    : [];
  const attributes = element.attributes.length
    ? Array.from(element.attributes)
        .map((attribute) => {
          if (attribute.name === "contenteditable") return;
          return createAttribute(attribute.name, attribute.value);
        })
        .filter((attribute) => attribute)
    : [];
  if (element.innerText) children.push(createText(element.innerText));
  return createElement(tagName, { children, attributes });
};

export { app, generateUI, generateSection, createMarkdownForElement };

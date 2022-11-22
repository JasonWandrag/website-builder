const waitForMs = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Not used anymore
const isFoundObj = (obj, val) => {
    if (obj.componentID == val) {
        return obj
    } else if (obj.contentType == "element" && obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
            const found = isFoundObj(obj.children[i], val);
            if (found) return found
        }
    }
};
const toggleModal = (modalID) => {
    document.querySelector(`#${modalID}`).classList.toggle("show")
}
export {
    waitForMs,
    toggleModal
}
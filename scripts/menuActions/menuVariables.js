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

export {touchDuration, isMobile, elementTypes, menuVisible, timer, elToCreate, selectedID} 
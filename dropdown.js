class Dropdown extends HTMLElement {

    setAttributes() {
        this.setAttribute('data-its-dropdown', '');
        this.setItemAttributes('data-its-dropdown-item', this.children);
    }

    // setItemAttributes(itemAttribute, items) {
    //     if (items.children.length) {
    //         console.log('hallo');
    //         for (let index = 0; items.children.length > index; index++) {
    //             items.children[index].setAttribute(itemAttribute, '');
    //         }
    //     }
    // }

    setItemAttributes(attributeName, childElements) {
        for (let item = 0; item < childElements.length; item++) {
            childElements[item].setAttribute(attributeName, '');
        }
    }

    setTitle() {
        if (this.attributes.label) {
            const titleElement = document.createElement('p');
            const textElement = document.createTextNode(this.attributes.label.value);
            titleElement.appendChild(textElement);
            titleElement.setAttribute('data-its-dropdown-label', '');
            this.parentNode.insertBefore(titleElement, this);
        }
    }

    constructor() {
        super();
        this.setAttributes();
        const itemElements = this.querySelectorAll('[data-its-dropdown-item]');
        this.setTitle();
        console.log(this.children, titleElement, itemElements);
    }
}
window.customElements.define('its-dropdown', Dropdown);

class Dropdown extends HTMLElement {

    setAttributes() {
        this.setAttribute('data-its-dropdown', '');
        this.setItemAttributes('data-its-dropdown-item');
    }

    setItemAttributes(attributeName) {
        let childElements = this.children;
        for (let item = 0; item < childElements.length; item++) {
            if (childElements[item].attributes.length > 0) {
                let familiarAttribute = false;
                for (let attribute = 0; attribute < childElements[item].attributes.length; attribute++) {
                    switch (childElements[item].attributes[attribute].name) {
                        case 'data-its-dropdown-name':
                            familiarAttribute = true;
                            break;
                        default:
                            break;
                    }
                }
                if (!familiarAttribute) {
                    childElements[item].setAttribute(attributeName, '');
                }
            } else {
                childElements[item].setAttribute(attributeName, '');
            }
        }
    }

    constructor() {
        super();
        this.setAttributes();
        const titleElement = this.querySelector('data-its-dropdown-name');
        const itemElements = this.querySelectorAll('data-its-dropdown-item');
        console.log(this.children, titleElement, itemElements);
    }
}
window.customElements.define('its-dropdown', Dropdown);

import { chevron } from './icons.js';

class Dropdown extends HTMLElement {

    setAttributes() {
        this.setAttribute('data-its-dropdown', '');
        this.setItemAttributes('data-its-dropdown-item', this.children);
    }

    setItemAttributes(attributeName, childElements) {
        for (let item = 0; item < childElements.length; item++) {
            childElements[item].setAttribute(attributeName, '');
        }
    }

    setLabel() {
        if (this.attributes.label) {
            const titleElement = document.createElement('p');
            const textElement = document.createTextNode(this.attributes.label.value);
            titleElement.appendChild(textElement);
            titleElement.setAttribute('data-its-dropdown-label', '');
            this.insertBefore(titleElement, this.firstElementChild);
        }
    }

    setItems() {
        const itemElements = this.querySelectorAll('[data-its-dropdown-item]');
        const containerElement = document.createElement('div');
        containerElement.setAttribute('data-its-dropdown-items', '');
        for (let itemIndex = 0; itemIndex < itemElements.length; itemIndex++) {
            containerElement.appendChild(itemElements[itemIndex]);
        }
        this.appendChild(containerElement);
    }

    setIcon() {
        const titleElement = this.querySelector('[data-its-dropdown-label]');
        if (titleElement) {
            console.log(chevron());
            titleElement.appendChild(chevron());
        }
    }

    showItems() {
        this.querySelector('[data-its-dropdown-items]').classList.add('active');
    }

    hideItems() {
        this.querySelector('[data-its-dropdown-items]').classList.remove('active');
    }

    rotateIconOpen() {
        this.querySelector('[data-its-dropdown-icon]').style.transform = 'rotate(180deg)';
    }

    rotateIconClose() {
        this.querySelector('[data-its-dropdown-icon]').style.transform = 'rotate(0deg)';
    }

    dropdownOpenController() {
        this.querySelector('[data-its-dropdown-label]').addEventListener('click', () => {
            if (this.visibile) {
                this.visibile = false;
                this.hideItems();
                this.rotateIconClose();
            } else {
                this.visibile = true;
                this.showItems();
                this.rotateIconOpen();
                startOutsideClickListener();
                startEscListener();
            }
        });

        const startOutsideClickListener = () => {
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    this.visibile = false;
                    this.hideItems();
                    this.rotateIconClose();
                    stopListeners();
                }
            });
        }

        const startEscListener = () => {
            document.addEventListener('keyup', (e) => {
                if (e.key.toLowerCase() === 'escape') {
                    this.visibile = false;
                    this.hideItems();
                    this.rotateIconClose();
                    stopListeners();
                }
            });
        }

        const stopListeners = () => {
            document.removeEventListener('click', startOutsideClickListener);
            document.removeEventListener('keyup', startEscListener);
        }
    }

    dropdownAlignmentController() {
        const setItemsAlignment = () => {
            const labelDimensions = this.querySelector('[data-its-dropdown-label]').getBoundingClientRect();
            const itemsDimensions = this.querySelector('[data-its-dropdown-items]').getBoundingClientRect();
            // Calculate minimum space needed before items go off screen
            if (labelDimensions.left < (itemsDimensions.width - labelDimensions.width)) {
                // If there is not enough space for items align them left against label
                this.querySelector('[data-its-dropdown-items]').style.left = labelDimensions.left;
            } else {
                // If there is enough space align them right against label by setting label.left - label.width
                this.querySelector('[data-its-dropdown-items]').style.left = `${labelDimensions.left - labelDimensions.width}px`;
            }
        }
        const updateItemsAlignment = window.addEventListener('resize', () => {
            setItemsAlignment();
        })
        setItemsAlignment();
    }

    constructor() {
        let visibile = false;
        super();
        this.setAttributes();
        this.setItems();
        this.setLabel();
        this.setIcon();
        this.dropdownOpenController();
        this.dropdownAlignmentController();
    }
}
window.customElements.define('its-dropdown', Dropdown);

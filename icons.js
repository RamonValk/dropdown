export const chevron = () => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    icon.setAttribute('data-its-dropdown-icon', '');
    path.setAttributeNS(null , 'd', 'M1.41 0L6 4.59 10.59 0 12 1.42l-6 6-6-6z');
    icon.appendChild(path);
    return icon;
}

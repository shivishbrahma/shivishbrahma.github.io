export function getProperty (element, property) {
    if (["x", "y", "width", "height"].includes(property)) {
        return element.getBoundingClientRect()[property];
    }

    return window.getComputedStyle(element).getPropertyValue(property);
}
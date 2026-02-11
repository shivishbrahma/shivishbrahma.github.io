export function getProperty (element, property) {
    if (["x", "y", "width", "height"].includes(property)) {
        return element.getBoundingClientRect()[property];
    }
    return window.getComputedStyle(element).getPropertyValue(property);
}

export function getBoundedClientVisibleRect (element) {
    const rect = element.getBoundingClientRect();
    let resRect = {};
    const parent = element.parentElement;
    if (parent && getComputedStyle(parent).overflow === 'hidden') {
        const parentRect = parent.getBoundingClientRect();
        resRect = {
            left: Math.max(rect.left, parentRect.left),
            top: Math.max(rect.top, parentRect.top),
            width: Math.min(rect.width, parentRect.width),
            height: Math.min(rect.height, parentRect.height),
            right: Math.min(rect.right, parentRect.right),
            bottom: Math.min(rect.bottom, parentRect.bottom),
        };
    } else {
        resRect = rect;
    }
    return resRect;
}
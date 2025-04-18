const resetDOM = (container) => {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

export {resetDOM}
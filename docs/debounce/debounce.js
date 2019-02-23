function debounce(func, wait) {
    var timeout;
    return function(argus) {
        var argus = arguments;
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout( () => func.apply(context, argus), wait );
    }
}
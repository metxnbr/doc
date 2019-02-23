function throttle(func, limit) {
    var inThrottle;
    return function(){
        var argus = arguments;
        var context = this;
        if(!inThrottle) {
            func.apply(context, argus);
            inThrottle = true;
            setTimeout( function() {
                inThrottle = false;
            }, limit)
        }
    }
}
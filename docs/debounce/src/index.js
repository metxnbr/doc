function rain() {
    var dropConfig = {
        speed: 3,
    }

    var tankConfig = {
        deep: 50,
        edge: 50,
    }

    var wrapper = document.querySelector('.wrapper');
    var water = document.querySelector('.water');
    var area = document.querySelector('.event-area');

    var debAndThr = document.querySelector('.debAndThr');

    var dropCount = 0;

    var eventFnsObj = {
        'none': createDrop,
        debounce: debounce(createDrop, 1000),
        throttle: throttle(createDrop, 1000),
    }

    var eventFn = eventFnsObj['none'];

    function changeEventFn(value) {
        area.removeEventListener('mousemove', eventFn, false)
        area.removeEventListener('touchmove', eventFn, false)

        eventFn = eventFnsObj[value] || eventFnsObj['none'];

        area.addEventListener('mousemove', eventFn, false)
        area.addEventListener('touchmove', eventFn, false)
    }

    

    area.addEventListener('mousemove', eventFn, false)
    area.addEventListener('touchmove', eventFn, false)

    debAndThr.addEventListener('change', function(event) {
        var value = event.target.value;
        changeEventFn(value)
    }, false);

    function setDeep(count) {
        water.style.height = Math.floor(count / 10) + 'px'; 
    }

    function createDrop() {
        var x = wrapper.offsetWidth;
        var y = wrapper.offsetHeight;
        var drop = document.createElement('div');
        drop.style.width = '5px';
        drop.style.height = '5px';
        drop.style.backgroundColor = '#fff';
        drop.style.opacity = 0.7;
        drop.style.position = 'absolute';

        drop.style.left = Math.random() * x + 'px';
        drop.style.top = 0;
        wrapper.appendChild(drop);

        var p = 0
        function fall() {
            p += dropConfig.speed
            drop.style.transform = 'translateY(' + p + 'px)';
            if (p < y) {
                window.requestAnimationFrame(fall);
            } else {
                dropCount += 1;
                setDeep(dropCount);
                wrapper.removeChild(drop);
            }
        }

        requestAnimationFrame(fall)

    }
}
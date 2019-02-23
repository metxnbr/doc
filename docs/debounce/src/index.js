function rain() {
    var dropConfig = {
        speed: 3,
    }

    var tankConfig = {
        deep: 50,
        edge: 50,
        fullSpeed: 10,
    }

    var wrapper = document.querySelector('.wrapper');
    var tank = document.querySelector('.tank');
    var water = document.querySelector('.water');
    var area = document.querySelector('.event-area');
    var areaText = document.querySelector('.event-area-text');

    var debAndThr = document.querySelector('.debAndThr');

    var delayEle = document.querySelector('.delay');

    var dropCount = 0;

    var isFull = false

    var eventFn
    
    const getEventFn = function() {
        var value = debAndThr.value;
        var delay = delayEle.value;

        // to number
        try {
            delay = parseFloat(delay)
            delay = isNaN(delay) ? 0 : delay;
        } catch (error) {
            delay = 0
        }

        // >= 0
        delay = delay > 0 ? delay : 0; 
        
        var eventFnsObj = {
            'none': createDrop,
            debounce: debounce(createDrop, delay),
            throttle: throttle(createDrop, delay),
        }
        return eventFnsObj[value] || eventFnsObj['none'];
    }

    function changeEventFn() {
        removeEvents();
        addEvents()
    }

    function addEvents() {
        if(isFull) return
        eventFn = getEventFn()
        area.addEventListener('mousemove', eventFn, false)
        area.addEventListener('touchmove', eventFn, false)
    }

    function removeEvents() {
        area.removeEventListener('mousemove', eventFn, false)
        area.removeEventListener('touchmove', eventFn, false)
    }

    // init
    addEvents()

    debAndThr.addEventListener('change', function() {
        changeEventFn()
    }, false);

    delayEle.addEventListener('keyup', function(event) {
        if(debAndThr.value !== 'none') {
            changeEventFn()
        }
    }, false);

    function setDeep(count) {
        var height = Math.floor(count / tankConfig.fullSpeed);
        if(height < tank.offsetHeight) {
            water.style.height = height + 'px'; 
        } else {
            removeEvents();
            isFull = true;
            areaText.innerHTML = "It's full!"
        }
        
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
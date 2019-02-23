function rain() {
    var dropConfig = {
        speed: 3,
    }

    var tankConfig = {
        edge: 50,
    }

    var wrapper = document.querySelector('.wrapper');
    var water = document.querySelector('.water');
    var dragArea = document.getElementById('drag-area');

    var dropCount = 0

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

    dragArea.addEventListener('mousemove', createDrop, false)
}
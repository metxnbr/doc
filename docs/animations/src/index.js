function main() {
  var container = document.querySelector(".container");

  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;

  var head = document.querySelector(".head");

  /**
   * title
   */
  var text = "Captain Marvel is coming soon...";

  var title = document.querySelector(".title");

  function bounce(timeFraction) {
    for (var a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return (
          -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        );
      }
    }
  }

  function animateText(text) {
    var to = text.length;
    var from = 0;

    animate({
      duration: 2500,
      timing: bounce,
      draw: function(progress) {
        let result = (to - from) * progress + from;
        title.innerHTML = text.substr(0, Math.ceil(result));
      }
    });
  }

  animateText(text);

  /**
   * top
   * timing options
   */
  var optionsWrap = document.querySelector(".options-wrap");
  var options = document.querySelector(".options");

  var easingKey = "linear";

  /**
   * renderList
   */
  function renderList() {
    var list = [];
    var renderItem = function(key) {
      var wrap = document.createElement("div");
      wrap.className = "item";

      if (easingKey === key) {
        wrap.className = "item select";
      }

      var icon = document.createElement("div");
      icon.className = "item-icon";

      icon.addEventListener(
        "click",
        function() {
          list.forEach(function(current) {
            current.className = "item";
          });
          wrap.className = "item select";
          easingKey = key;
        },
        false
      );

      var text = document.createElement("div");
      text.className = "item-text";
      text.innerText = key;

      wrap.appendChild(icon);
      wrap.appendChild(text);

      options.appendChild(wrap);
      list.push(wrap);
    };
    for (key in EasingFunctions) {
      renderItem(key);
    }
  }

  renderList();

  var toggleList = document.querySelector(".toggle-list");

  toggleList.addEventListener(
    "click",
    function() {
      var close = "options-wrap w";
      var open = "options-wrap w open";
      if (optionsWrap.className === close) {
        optionsWrap.className = open;
      } else {
        optionsWrap.className = close;
      }
    },
    false
  );

  /**
   * star
   */
  function renderStars() {
    var star = function() {
      var ele = document.createElement("div");
      ele.style.position = "absolute";
      var size = Math.random() * 3;
      ele.style.width = size + "px";
      ele.style.height = size + "px";
      ele.style.borderRadius = "50%";
      ele.style.left = Math.random() * containerWidth + "px";
      ele.style.top = Math.random() * containerHeight + "px";
      ele.style.opacity = Math.random();
      ele.style.boxShadow = "0 0 5px #fff";
      ele.style.backgroundColor = "#fff";

      // twinkle twinkle little star
      if (Math.random() < 0.5) {
        ele.style.animationName = "twinkle";
        ele.style.animationDuration = Math.ceil(Math.random() * 3) + "s";
        ele.style.animationDelay = Math.ceil(Math.random() * 3) + "s";
        ele.style.animationDirection = "alternate";
        ele.style.animationIterationCount = "infinite";
      }

      container.appendChild(ele);
    };
    var count = 2000;
    while (count > 0) {
      star();
      count -= 1;
    }
  }

  renderStars();

  var img = new Image();
  img.src = "./Captain-Marvel.png";
  img.className = "go";

  img.onload = function() {
    img.style.marginLeft = -img.width / 2 + "px";
    document.body.appendChild(img);

    setTimeout(function() {
      window.scroll(0, containerHeight);
    }, 0);

    setTimeout(function() {
      container.removeChild(title);
      img.className = "go show";
      img.addEventListener("click", letGo, false);
    }, 5000);
  };

  function animate({ timing, draw, duration }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // calculate the current animation state
      let progress = timing(timeFraction);

      draw(progress); // draw it

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }

  function letGo() {
    /**
     * clean up
     */
    img.removeEventListener("click", letGo, false);
    container.removeChild(optionsWrap);
    head.removeChild(toggleList);

    window.scroll(0, containerHeight - 500); // bottom

    var currentScrollTop = getScrollTop();
    animate({
      timing: EasingFunctions[easingKey],
      draw: function(p) {
        const y = (1 - p) * currentScrollTop;

        window.scroll(0, y);

        if (p === 1) {
          img.className = "go show fly";
        }
      },
      duration: 1000 * 10
    });
  }
}

(function() {
  var valueEle = document.querySelector(".propagate-drop-value");
  var optionsEle = document.querySelector(".propagate-drop-options");
  var arrowEle = document.querySelector(".propagate-drop-arrow");
  var itemEles = document.querySelectorAll(".propagate-drop-item");

  function getOptions() {
    var result = [];
    itemEles.forEach(function(item) {
      result.push(item.innerHTML);
    });
    return result;
  }

  itemEles.forEach(function(item, i) {
    item.addEventListener(
      "click",
      function(e) {
        var opt = getOptions();
        var preValue = valueEle.innerHTML;

        valueEle.innerHTML = opt[i];
        item.innerHTML = preValue;
      },
      false
    );
  });

  valueEle.addEventListener("click", makeDropDown, false);
  arrowEle.addEventListener("click", makeDropDown, false);

  optionsEle.addEventListener("click", makeSelect, false);

  document.body.addEventListener("click", closeDrop, false);

  function closeDrop() {
    optionsEle.style.display = "none";
    arrowEle.className = "propagate-drop-arrow";
  }

  function toggle(ele) {
    var current = ele.style.display;

    return {
      optionsEle: current === "block" ? "none" : "block",
      arrow:
        current === "block"
          ? "propagate-drop-arrow"
          : "propagate-drop-arrow drop"
    };
  }

  function makeSelect() {}

  function makeDropDown(e) {
    e.stopPropagation();

    var result = toggle(optionsEle);

    optionsEle.style.display = result.optionsEle;
    arrowEle.className = result.arrow;
  }
})();

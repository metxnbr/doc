(function() {
  var boxEle = document.querySelector(".delegation-box");

  function Item(box, item) {
    this.box = box;
    this.item = item;
    this.count = [];
  }

  Item.prototype.randomSize = function() {
    var min = item.min;
    var max = item.max;
    var range = min + Math.random() * (max - min);
    return {
      width: range,
      height: range
    };
  };

  Item.prototype.randomPos = function(size) {
    var width = size.width;
    var height = size.height;
    var left = Math.random() * (this.box.width - width);
    var top = Math.random() * (this.box.height - height);
    return {
      left: left,
      top: top
    };
  };

  Item.prototype.create = function() {
    var size = this.randomSize();
    var pos = this.randomPos(size);
    var obj = {
      left: pos.left,
      top: pos.top,
      width: size.width,
      height: size.height
    };
    this.count.push(obj);
    return obj;
  };

  Item.prototype.render = function() {
    const styles = this.create();
    var item = document.createElement("div");

    item.style.left = styles.left + "px";
    item.style.top = styles.top + "px";
    item.style.width = styles.width + "px";
    item.style.height = styles.height + "px";
    item.className = "delegation-item";
    this.box.ele.appendChild(item);
  };

  var box = {
    width: 300,
    height: 300,
    ele: boxEle
  };

  var item = {
    min: 15,
    max: 50
  };

  boxEle.addEventListener("click", fn, false);

  var test = new Item(box, item);

  test.render(); // init

  function fn(event) {
    var target = event.target;
    if (target.className === "delegation-item") {
      test.render();
    }
  }
})();

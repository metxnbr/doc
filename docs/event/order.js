(function() {
  var count = document.querySelector(".order-count");

  var boxs = document.querySelectorAll(".order-box");
  var btns = document.querySelectorAll(".order-btn");
  var codes = document.querySelectorAll(".order-code-text");
  var nums = document.querySelectorAll(".order-num");

  const events = [
    {
      box: boxs[0],
      btn: btns[2],
      code: codes[2],
      num: nums[0],
      fn: aFn,
      opt: false
    },
    {
      box: boxs[1],
      btn: btns[1],
      code: codes[1],
      num: nums[1],
      fn: bFn,
      opt: false
    },
    {
      box: boxs[2],
      btn: btns[0],
      code: codes[0],
      num: nums[2],
      fn: cFn,
      opt: false
    }
  ];

  var ORDER_NUM = 0;
  var COUNT = 0;
  var isComplete = false;
  var timeTask = undefined;

  function clearToReTest() {
    ORDER_NUM = 0;
    isComplete = false;
    nums.forEach(function(item) {
      item.innerHTML = "";
    });
  }

  events.forEach(function(item, i) {
    item.box.addEventListener("click", item.fn, item.opt);

    item.btn.addEventListener(
      "click",
      function() {
        var e = events[i];
        var fn = e.fn;
        var opt = e.opt;

        item.box.removeEventListener("click", fn, opt);

        events[i].opt = !opt; // 直接修改events

        item.box.addEventListener("click", fn, !opt);

        const changedValeu = opt ? "<b>false</b>" : "<b>true</b>";

        item.code.innerHTML = item.code.innerHTML.replace(
          /false|true/,
          changedValeu
        );
      },
      false
    );
  });

  function makeTask() {
    if (timeTask) {
      clearTimeout(timeTask);
    }

    timeTask = setTimeout(function() {
      ORDER_NUM = 0;
      isComplete = true;
    }, 0);
  }

  function recordCount() {
    COUNT += 1;
    count.getElementsByTagName("span")[0].innerHTML = COUNT;
  }

  function aFn() {
    fn(0);
  }

  function bFn() {
    fn(1);
  }

  function cFn() {
    fn(2);
  }

  function fn(i) {
    recordCount();
    makeTask();
    if (isComplete) {
      clearToReTest();
    }
    ORDER_NUM += 1;
    events[i].num.innerHTML = ORDER_NUM;
  }
})();

// ä¼˜å…ˆé˜Ÿåˆ—
function PriorityQueue() {

  function Queue() {
    var collection = [];

    this.print = function () {
      console.log(collection);
    }

    this.enqueue = function (element) {
      collection.push(element);
    }

    this.dequeue = function () {
      return collection.shift();
    }

    this.front = function () {
      return collection[0];
    }

    this.isEmpty = function () {
      return collection.length === 0;
    }

    this.size = function () {
      return collection.length;
    }
  }

    this.enqueue = function (element) {
      if (this.isEmpty()) {
        collection.push(element);
      } else {
        var added = false;
        for (var i = 0; i < collection.length; i++) {
          if (element[1] < collection[i][1]) {
            collection.splice(i, 0, element);
            added = true;
            break;
          }
        }
        if (!added) {
          collection.push(element);
        }
      }
    }
  }

(function () {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  Snake.View = View = function($el) {
    this.$el = $el;
    this.board = new Snake.Board(20,20);
    this.createGrid();
    this.bindListener();
    setInterval((function () {
      this.board.moveSnake();
      this.render();
    }).bind(this), 500);
  };

  View.prototype.createGrid = function () {
    for (var i = 0; i < this.board.height; i++) {
      this.createRow(i);
    }
  }

  View.prototype.createRow = function (j) {
    var rowStr = "";
    for (var i = 0; i < this.board.width; i++) {
      rowStr += "<div class='square' data-id='" + (j * this.board.width + i) + "'></div>";
    }
    this.$el.append(rowStr);
  }

  View.prototype.bindListener = function () {
    $('body').keydown((function (event) {
      // debugger
      this.handleKeyEvent(event);
    }).bind(this));
  };

  View.prototype.handleKeyEvent = function (event) {
    var keyCode = event.keyCode;
    if (keyCode === 38) {
      this.board.snake.turn([-1, 0]);
    } else if (keyCode === 40) {
      this.board.snake.turn([1, 0]);
    } else if (keyCode === 37) {
      this.board.snake.turn([0, -1]);
    } else if (keyCode === 39) {
      this.board.snake.turn([0, 1]);
    }
  };

  View.prototype.render = function () {
    this.$el.children().attr('class', 'square');
    var apple = this.board.apple;
    var id = (apple[0] * this.board.width) + apple[1];
    var $square = $("div[data-id='" + id + "']");
    $square.attr('class','square apple');
    var snake = this.board.render();
    for (var i = 0; i < snake.length; i++) {
      var id = (snake[i][0] * this.board.width) + snake[i][1];
      // debugger
      var $square = $("div[data-id='" + id + "']");
      $square.attr('class','square snake');
    }
  };

})();

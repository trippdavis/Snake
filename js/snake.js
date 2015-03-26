(function () {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  Snake.Snake = Snake = function () {
    this.dir = [1, 0];
    this.segments = [[0,0]];
    this.length = 8;
  };

  Snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead = Coord.add(head, this.dir);
    if (Coord.includes(this.segments, newHead)) {
      return false;
    } else {
      this.segments.unshift(newHead);
      if (this.segments.length >= this.length) {
        this.segments.pop();
      }
    }
  };

  Snake.prototype.turn = function (newDir) {
    if (!Coord.isOpposite(this.dir, newDir)) {
      this.dir = newDir;
    }
  };

  Snake.Coord = Coord = function () {
  };

  Coord.add = function(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
  };

  Coord.includes = function(list, vec) {
    for(var i=0; i< list.length; i++) {
      if (Coord.equals(vec, list[i])) {
        return true;
      }
    }
    return false;
  }

  Coord.equals = function(vec1, vec2) {
    return (vec1[0] === vec2[0]) && (vec1[1] === vec2[1]);
  };

  Coord.isOpposite = function(vec1, vec2) {
    return (vec1[0] === -vec2[0]) && (vec1[1] === -vec2[1]);
  };

  Snake.Board = Board = function (height, width) {
    // this.grid = new Array(height);
    // for (var i = 0; i < this.grid; i++) {
    //   this.grid[i] = new Array(width);
    // }
    this.height = height;
    this.width = width;
    this.snake = new Snake();
    this.apple = [5, 5];
    // this.makeApple();
  };

  Board.prototype.moveSnake = function () {
    var snakeHead = this.snake.segments[0];
    var newHead = Coord.add(snakeHead, this.snake.dir);
    if (this.outOfBounds(newHead)) {
      return false;
    } else {
      if (Coord.equals(newHead, this.apple)) {
        this.snake.length += 1;
        this.makeApple();
      }
      this.snake.move();
    }
  };

  Board.prototype.makeApple = function () {
    var height = (Math.random() * this.height) | 0
    var width = (Math.random() * this.width) | 0
    var apple = [height, width];
    if (Coord.includes(this.snake.segments, apple)) {
      this.makeApple()
    } else {
      this.apple = apple;
    }
  }

  Board.prototype.outOfBounds = function (pos) {
    return pos[0] < 0 || pos[0] >= this.height || pos[1] < 0 || pos[1] >= this.width;
  };

  Board.prototype.render = function () {
    return this.snake.segments;
  };

})();

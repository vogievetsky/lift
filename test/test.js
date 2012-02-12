lift = require('../lift');

function add(/* args */) {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
function concat(/* args */) { return Array.prototype.slice.call(arguments).join(''); }
function head(arr) { return arr[0] }
function getCtxPoo() { return this.poo; }
function getX(d) { return d.x; }
function getY(d) { return d.y; }

exports['value + value'] = function(test) {
  test.strictEqual(lift(add)(2, 3), 5, '');
  test.done();
}

exports['function + function'] = function(test) {
  test.strictEqual(lift(add)(Math.abs, 3)(-2), 5, '');
  test.done();
}

exports['function concatenation'] = function(test) {
  test.strictEqual(lift(concat)("transition(", getX, ",", getY, ")")({ x:1, y:3 }), 'transition(1,3)', '');
  test.done();
}

exports['head value'] = function(test) {
  test.strictEqual(lift(head)([11,22,33]), 11, '');
  test.done();
}

exports['head function'] = function(test) {
  test.strictEqual(lift(head)(function() { return [11,22,33]; })(), 11, '');
  test.done();
}

exports['head function adv'] = function(test) {
  test.strictEqual(lift(head)(function(d) { return [d,22,33]; })(12), 12, '');
  test.done();
}

exports['context carry'] = function(test) {
  test.strictEqual(lift(add)(1, getCtxPoo).call({ poo: 4 }), 5, '');
  test.done();
}

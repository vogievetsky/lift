"use strict"

/*********************************************
 * Lift.js                                   *
 *                                           *
 * ADDING FUNTIONS TO NUMBERS ISN'T NORMAL.  *
 *                       BUT ON LIFT IT IS.  *
 * ----------------------------------------- *
 *                            LIFT           *
 *                            not even once  *
 *********************************************/

function lift(fn) {
  var fn = arguments[0];
  if ('function' !== typeof fn) throw new TypeError();

  return function(/* args: to fn */) {
    var args = Array.prototype.slice.call(arguments),
        n = args.length,
        i;

    for (i = 0; i < n; i++) {
      if ('function' === typeof args[i]) {
        return function(/* args2 to function wrapper */) {
          var args2 = Array.prototype.slice.call(arguments),
              reduced = [],
              i, v;

          for (i = 0; i < n; i++) {
            v = args[i];
            reduced.push('function' === typeof v ? v.apply(this, args2) : v);
          }

          return fn.apply(null, reduced);
        };
      }
    }

    // Fell through so there are no functions in the arguments to fn -> call it!
    return fn.apply(null, args);
  };
}

function test(code, expect) {
  var res = eval(code);
  if (res === expect) {
    console.log('PASS:', code)
  } else {
    console.log('FAIL:', code)
    console.log('got:', res)
    console.log('------------------------------------------------------')
  }
}

function add(/* args */) {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
function concat(/* args */) {
  return Array.prototype.slice.call(arguments).join('');
}
function head(arr) { return arr[0] }
function getCtxPoo() { return this.poo; }
function getX(d) { return d.x; }
function getY(d) { return d.y; }

test('lift(add)(2, 3)', 5);
test('lift(add)(Math.abs, 3)(-2)', 5);
test('lift(concat)("transition(", getX, ",", getY, ")")({ x:1, y:3 })', 'transition(1,3)');
test('lift(head)([11,22,33])', 11);
test('lift(head)(function() { return [11,22,33]; })()', 11);
test('lift(head)(function(d) { return [d,22,33]; })(12)', 12);
test('lift(add)(1, getCtxPoo).call({ poo: 4 })', 5);
test('lift(add)(1, getCtxPoo).call({ poo: 4 })', 5);





































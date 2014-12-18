# lift.js

**Lift.js** is a tiny library for lifting functional application out of expressions.

Imagine you have:

```js
var f = function(x) { /*...*/ };
var g = function(x) { /*...*/ };
```

Wouldn't it be cool if you could write:

```js
var h = f + g;
```

To mean:

```js
var h = function(x) { f(x) + g(x); };
```

## Example

```js
function add(a,b) { return a+b };
var liftedAdd = lift(add);

liftedAdd(3,4) // == 7
liftedAdd(function() { return 3; },4)() // == 7
```

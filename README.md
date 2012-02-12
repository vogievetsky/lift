# lift.js

**ADDING FUNTIONS TO NUMBERS ISN'T NORMAL.**
**BUT ON LIFT IT IS.**

                           LIFT
                           not even once

---
**Lift.js** is a tiny labrary for lifting functional aplication out of expressions.

Imagine you have:

```js
var f = function(x) { /*...*/ };
var g = function(x) { /*...*/ };
```

Wouldn't it be cool if you could write:

```js
var h = f + g;
```

And get:

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

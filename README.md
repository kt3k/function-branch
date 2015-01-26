# function-branch v1.0.0

> Function.prototype enhancement which makes it easier to define classes in ES5 syntax.

# Usage

```js
// define plain old javascript class
var MyClass = Object.branch(function (pt) {
     'use strict';

     pt.myMethod = function () {...};
     ...

});
```


```js
// inheritance
var MySubclass = MyClass.branch(function (pt) {
     'use strict';

     pt.myAnotherMethod = function () {
         // ...
     };

     // ...

});
```


```js
// call parent's method
// `super` means basically parent's prototype
var MySubclass = MyClass.branch(function (pt, super) {
    'use strict';

    pt.myMethod = function () {

         var result = super.myMethod();

         // ... do something ...

         return result;

    };

});
```

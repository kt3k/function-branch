/**
 * function-branch v1.0.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 *
 * This is Function.prototype enhancement which enables developers
 * to easily define classes in ES5 syntax.
 *
 * @example
 *     // define plain old javascript class
 *     var MyClass = Object.branch(function (pt) {
 *          'use strict';
 *
 *          pt.myMethod = function () {...};
 *          ...
 *
 *     });
 *
 *
 * @example
 *     // inheritance
 *     var MySubclass = MyClass.branch(function (pt) {
 *          'use strict';
 *
 *          pt.myAnotherMethod = function () {
 *              // ...
 *          };
 *
 *          // ...
 *
 *     });
 *
 *
 * @example
 *     // call parent's method
 *     // `super` means basically parent's prototype
 *     var MySubclass = MyClass.branch(function (pt, super) {
 *         'use strict';
 *
 *         pt.myMethod = function () {
 *
 *              var result = super.myMethod();
 *
 *              // ... do something ...
 *
 *              return result;
 *
 *         };
 *
 *     });
 *
 */


(function () {
    'use strict';

    /**
     * Subclass constructor with given class definition.
     *
     * @param {Function<(pt: Object, super: Object) => void>} classDefinition
     * @returns {Function}
     */
    Function.prototype.branch = function (classDefinition) {

        var parent = this;


        // create proxy constructor for inheritance
        var proxy = function () {};

        proxy.prototype = parent.prototype;

        var prototype = new proxy();


        // apply the given class definition
        classDefinition(prototype, parent.prototype);


        if (prototype.constructor === proxy.prototype.constructor) {

            // if no child constructor definition
            // create one for the child
            prototype.constructor = function () {

                proxy.prototype.constructor.apply(this, arguments);

            };
        }


        // set prototype to constructor
        prototype.constructor.prototype = prototype;


        return prototype.constructor;

    };

}());

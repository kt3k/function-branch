

describe('function.branch', function () {
    'use strict';

    it('returns a function', function () {

        expect(Object.branch(function () {})).to.be.instanceof(Function);
        expect(Object.branch(null)).to.be.instanceof(Function);

    });

    it('throws an error when invoked with things except function or null', function () {

        expect(function () {
            Object.branch('abc');
        }).to.throw(Error);

        expect(function () {
            Object.branch(123);
        }).to.throw(Error);

        expect(function () {
            Object.branch({});
        }).to.throw(Error);

        expect(function () {
            Object.branch([]);
        }).to.throw(Error);

    });

    it('creates class with enhancement of prototype', function () {

        var MyClass = Object.branch(function (pt) {

            pt.method = function () {

                return 42;

            };

        });


        var myObj = new MyClass();

        expect(myObj.constructor).to.equal(MyClass);
        expect(myObj.method).to.be.instanceof(Function);
        expect(myObj.method()).to.equal(42);

    });

});

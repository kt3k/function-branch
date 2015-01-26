

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


    it('subclasses existing class', function () {

        var MyClass = Object.branch(function (pt) {

            pt.method = function () {
                return 36;
            };

        });

        var MySubclass = MyClass.branch(function (pt, parent) {

            pt.method = function () {
                return parent.method() * 2;
            };

        });

        var myObj = new MySubclass();

        expect(myObj).to.be.instanceof(MyClass);
        expect(myObj).to.be.instanceof(MySubclass);
        expect(myObj.constructor).to.not.equal(MyClass);
        expect(myObj.constructor).to.equal(MySubclass);
        expect(myObj.method()).to.equal(72);

    });


    it('creates class with given constructor', function () {

        var MyClass = Object.branch(function (pt) {

            pt.constructor = function (name, age) {
                this.name = name;
                this.age = age;
            };

        });

        var myObj = new MyClass('John', 36);

        expect(myObj).to.be.instanceof(MyClass);
        expect(myObj.constructor).to.equal(MyClass);
        expect(myObj.name).to.equal('John');
        expect(myObj.age).to.equal(36);

    });


    it('inherits constructor if subclass does not provide one', function () {

        var MyClass = Object.branch(function (pt) {

            pt.constructor = function (name, age) {
                this.name = name;
                this.age = age;
            };

        });

        var MySubclass = MyClass.branch(function (pt) { });

        var myObj = new MySubclass('Paul', 34);

        expect(myObj).to.be.instanceof(MyClass);
        expect(myObj).to.be.instanceof(MySubclass);
        expect(myObj.constructor).to.equal(MySubclass);
        expect(myObj.constructor).to.not.equal(MyClass);
        expect(myObj.name).to.equal('Paul');
        expect(myObj.age).to.equal(34);

    });

});

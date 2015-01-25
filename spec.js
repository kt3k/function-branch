

describe('function.branch', function () {
    'use strict';

    it('returns a function', function () {

        expect(Object.branch(function () {})).to.be.instanceof(Function);

    });
});

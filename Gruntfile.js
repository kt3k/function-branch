


module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        'mocha-chai-sinon': {
            'index.js': {
                src: ['./index.js', './spec.js'],
                options: {
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

};

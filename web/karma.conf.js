/*global module*/
module.exports = function(config) {
    "use strict";
    config.set({
        plugins: ['karma-chrome-launcher', 'karma-coverage', 'karma-jasmine'],
        frameworks: ['jasmine'],
        files: [
            'js/sm.namespaces.js',
            'js/sm.googleMaps.js',
            'js/sm.readEXIFdata.js',
            'js/sm.visualize.js',
            'js/start.js'
        ],

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],
        browsers: ['Chrome'],
        singleRun: true,

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'js/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }
    });
};
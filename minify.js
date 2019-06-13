/*minify.js - process of removing redundant data without 
affecting how this app is processed in browser 
eg. comment, unused code, etc)
*/

const minify = require('@node-minify/core');
const crass = require('@node-minify/crass'); //CSS
const uglifyES = require('@node-minify/uglify-es'); //js
const htmlMinifier = require('@node-minify/html-minifier'); //HTML


function minifyMain() {
    function minifyMainJS() {
        minify({
            compressor: uglifyES, //JS parser
            input: 'website/scripts/script.js',
            output: 'deployHosting/scripts/script.js',
            callback: function (err, min) {}
        });
        minify({
            compressor: uglifyES,
            input: 'website/scripts/zenscroll.js',
            output: 'deployHosting/scripts/zenscroll.js',
            callback: function (err, min) {}
        });
    }

    function minifyMainCSS() {
        minify({
            compressor: crass, //plugin for node-minify; compresses CSS files
            input: 'website/css/main.css',
            output: 'deployHosting/css/main.css',
            callback: function (err, min) {}
        });
        minify({
            compressor: crass,
            input: 'website/css/login.css',
            output: 'deployHosting/css/login.css',
            callback: function (err, min) {}
        });
        minify({
            compressor: crass,
            input: 'website/css/questions.css',
            output: 'deployHosting/css/questions.css',
            callback: function (err, min) {}
        });
        minify({
            compressor: crass,
            input: 'website/css/manual.css',
            output: 'deployHosting/css/manual.css',
            callback: function (err, min) {}
        });
        minify({
            compressor: crass,
            input: 'website/css/matchSelect.css',
            output: 'deployHosting/css/matchSelect.css',
            callback: function (err, min) {}
        });
    }

    function minifyMainHTMl() {
        minify({
            compressor: htmlMinifier,
            input: 'website/index.html',
            output: 'deployHosting/index.html',
            options: {
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                continueOnParseError: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
            callback: function (err, min) {}
        });
        minify({
            compressor: htmlMinifier,
            input: 'website/questions.html',
            output: 'deployHosting/questions.html',
            options: {
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                continueOnParseError: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
            callback: function (err, min) {}
        });
    }
    minifyMainJS();
    minifyMainCSS();
    minifyMainHTMl();
}

function minifyAdmin() {
    function minifyAdminCSS() {
        //     minify({
        //         compressor: crass,
        //         input: 'website/admin/css/main.css',
        //         output: 'deployHosting/admin/css/main.css',
        //         callback: function(err, min) {}
        //       });
    }

    function minifyAdminHTMl() {
        minify({
            compressor: htmlMinifier,
            input: 'website/admin/index.html',
            output: 'deployHosting/admin/index.html',
            callback: function (err, min) {},
            options: {
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                continueOnParseError: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
        });
        minify({
            compressor: htmlMinifier,
            input: 'website/admin/matchSelect.html',
            output: 'deployHosting/admin/matchSelect.html',
            callback: function (err, min) {},
            options: {
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                continueOnParseError: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
        });
        minify({
            compressor: htmlMinifier,
            input: 'website/admin/manual.html',
            output: 'deployHosting/admin/manual.html',
            callback: function (err, min) {},
            options: {
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                continueOnParseError: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
        });
    }
    minifyAdminHTMl();
    minifyAdminCSS();
}

//calls minifyMain function & minifyAdmin above
minifyMain();
minifyAdmin();
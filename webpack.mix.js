const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/bootstrap.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

mix.js('resources/js/contactform/index.js', 'public/js/contactform.js')
    .sass('resources/sass/intltelinput.scss', 'public/css');

mix.js('resources/js/contactlist/index.js', 'public/js/contactlist.js');

mix.webpackConfig({
    output: {
        chunkFilename: mix.inProduction() ? "js/chunks/[chunkhash].js" : "js/chunks/[name].js",
    }
});
mix.version();

mix.react('resources/js/components/index.jsx', 'public/js/bundle.js');

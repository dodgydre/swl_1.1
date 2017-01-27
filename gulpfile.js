var elixir = require('laravel-elixir');

elixir.config.assetsPath = './';

elixir.config.css.autoprefix = {
    enabled: true,
    options: {
        cascade: true,
        browsers: ['last 2 versions', '> 1%']
    }
};

/* Task 1: Compile SASS */
elixir(function(mix) {
    mix.sass('./sass/style.scss', './style.css');
    mix.styles([
        './assets/css/selectize.css',
    ], './css/selectize.min.css');
});

/* Task 2: Combine JS files */

elixir(function(mix) {
    mix.scripts([
        './assets/js/about.docready.js',
    ], './js/about.docready.min.js');
    mix.scripts([
        './assets/js/projects.docready.js',
    ], './js/projects.docready.min.js');
    mix.scripts([
        './assets/js/contact.docready.js',
    ], './js/contact.docready.min.js');
    mix.scripts([
        './assets/js/index.docready.js',
        //'./assets/js/jquery-imagefill.js',
    ], './js/index.docready.min.js');
    mix.scripts([
        //'./assets/js/jQuery.easing.1.3.js',
        './assets/js/jQuery.touchSwipe.min.js',
        //'./assets/js/selectize.min.js',
        //'./assets/js/isotope.pkgd.3.0.1.min.js',
        './assets/js/skip-link-focus-fix.js',
        './assets/js/navigation.js',
        './assets/js/history.js',
        './assets/js/jQuery.imagesLoaded.min.js',
        //'./assets/js/jquery.mobile.custom.js',
    ], './js/plugins.min.js');
    mix.scripts([
        './assets/js/swl_ajax_get_posts.js',
    ], './js/swl_ajax_get_posts.min.js');
    mix.scripts([
        './assets/js/admin_edit.js',
    ], './js/admin_edit.min.js');
});

<?php
/**
 * Enqueue scripts and styles.
 */
function swl_scripts()
{
    wp_enqueue_style('swl-style', get_stylesheet_uri());
    wp_enqueue_script('wp-api');
    wp_enqueue_script('jquery');

    global $template;
    wp_enqueue_script(
        'jquery.easing',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js',
        array('jquery'),
        '1.3',
        true
    );
    wp_enqueue_script(
        'jquery.touchSwipe',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js',
        array('jquery'),
        '1.6.18',
        true
    );

    if (basename($template) == 'single-project.php') {
        wp_enqueue_script('plugins', get_stylesheet_directory_uri().'/js/plugins.min.js', array('jquery'), false, true);
        wp_enqueue_script(
            'projects.docready',
            get_stylesheet_directory_uri().'/js/projects.docready.min.js',
            array('jquery'),
            false,
            true
        );
    } elseif (basename($template) == 'index.php' || basename($template) == 'archive-people.php') {
        wp_enqueue_script('plugins', get_stylesheet_directory_uri().'/js/plugins.min.js', array('jquery'), false, true);
        wp_enqueue_script(
            'index.docready',
            get_stylesheet_directory_uri().'/js/index.docready.min.js',
            array('jquery'),
            false,
            true
        );
    } elseif (basename($template) == 'archive-project.php') {
        wp_enqueue_style('selectize_css', get_stylesheet_directory_uri().'/css/selectize.min.css');
        wp_enqueue_script('plugins', get_stylesheet_directory_uri().'/js/plugins.min.js', array('jquery'), false, true);

        wp_enqueue_script(
            'selectize',
            'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.4/js/standalone/selectize.min.js',
            true
        );

        wp_enqueue_script(
            'isotope',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.1/isotope.pkgd.min.js',
            array('jquery'),
            '3.0.1',
            true
        );

        wp_enqueue_script('index.docready', get_stylesheet_directory_uri().'/js/index.docready.min.js', array('jquery'), false, true);
    } elseif (basename($template) == 'practice-profile.php' || basename($template) == 'practice-jobs.php' || basename($template) == 'practice-people.php') {
        wp_enqueue_script('plugins', get_stylesheet_directory_uri().'/js/plugins.min.js', array('jquery'), false, true);
        //wp_enqueue_script( 'jquery.easing', get_stylesheet_directory_uri() . '/js/jquery.easing.1.3.js', $deps = array('jquery'), $ver = false, $in_footer = true );
        wp_enqueue_script('about.docready', get_stylesheet_directory_uri().'/js/about.docready.min.js', array('jquery'), false, true);
    } elseif (basename($template) == 'contact.php') {
        wp_enqueue_script('google.map.api', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCnExCTheTiUfwaafSgnHsCcLxvhlAdgy4', array(), false, true);
        wp_enqueue_script('contact.docready', get_stylesheet_directory_uri().'/js/contact.docready.min.js', array('jquery'), false, true);
    }
}
add_action('wp_enqueue_scripts', 'swl_scripts');

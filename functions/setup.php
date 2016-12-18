<?php
/**
 * swl functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 */
if (!function_exists('swl_setup')) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function swl_setup()
{
    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on swl, use a find and replace
     * to change 'swl' to the name of your theme in all the template files.
     */
    load_theme_textdomain('swl', get_template_directory().'/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support('title-tag');

    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    // Add featured image size
    add_image_size('featured-large', 1440, 900); // width, height, crop
    //add_image_size( '150-high-thumb', 9999, 100);
    add_image_size('project_thumb', 270, 270, false);

  // Register the new image sizes for use in Add Media modal
    add_filter('image_size_names_choose', 'swl_custom_sizes');
    function swl_custom_sizes($sizes)
    {
        return array_merge($sizes, array(
            //'large-width' => __( 'Large Width' ),
            //'large-height' => __( 'Large Height' ),
          'featured-large' => __('Featured'),
                    //'150-high-thumb' => __( '100Thumb' ),
                    'project_thumb' => __('ProjectThumb'),
        ));
    }

    // Register one nav menu
    register_nav_menus(array(
        'primary' => esc_html__('Primary', 'swl'),
    ));

    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Set up the WordPress core custom background feature.
    add_theme_support('custom-background', apply_filters('swl_custom_background_args', array(
        'default-color' => 'ffffff',
        'default-image' => '',
    )));
}
endif;
add_action('after_setup_theme', 'swl_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 * Make this large so it doesn't mess up the scaling of images on big screens.  Maybe bigger yet?
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function swl_content_width()
{
    $GLOBALS['content_width'] = apply_filters('swl_content_width', 2500);
}
add_action('after_setup_theme', 'swl_content_width', 0);

/**
 * Redirect 404 errors to homepage.
 */
function swl_redirect_404()
{
    global $wp_query;
    if ($wp_query->is_404) {
        wp_redirect(get_bloginfo('wpurl'));
        exit;
    }
}
add_action('template_redirect', 'swl_redirect_404', 1);

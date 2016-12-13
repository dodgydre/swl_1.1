<?php

if (!function_exists('swl_entry_footer')) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function swl_entry_footer()
{
    // Hide category and tag text for pages.
    if ('post' === get_post_type()) {
        /* translators: used between list items, there is a space after the comma */
        $categories_list = get_the_category_list(esc_html__(', ', '_s'));
        if ($categories_list && _s_categorized_blog()) {
            printf('<span class="cat-links">'.esc_html__('Posted in %1$s', '_s').'</span>', $categories_list); // WPCS: XSS OK.
        }
        /* translators: used between list items, there is a space after the comma */
        $tags_list = get_the_tag_list('', esc_html__(', ', '_s'));
        if ($tags_list) {
            printf('<span class="tags-links">'.esc_html__('Tagged %1$s', '_s').'</span>', $tags_list); // WPCS: XSS OK.
        }
    }

    edit_post_link(
        sprintf(
            /* translators: %s: Name of current post */
            esc_html__('Edit %s', '_s'),
            the_title('<span class="screen-reader-text">"', '"</span>', false)
        ),
        '<span class="edit-link">',
        '</span>'
    );
}
endif;

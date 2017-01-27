<?php
// Add Custom Taxonomy - Materials.
// Add it to attachments and also posts
function swl_add_material_taxonomy()
{
    $labels = array(
        'name' => 'Materials',
        'singular_name' => 'Material',
        'search_items' => 'Search Materials',
        'all_items' => 'All Materials',
        'parent_item' => 'Parent Material',
        'parent_item_colon' => 'Parent Material:',
        'edit_item' => 'Edit Material',
        'update_item' => 'Update Material',
        'add_new_item' => 'Add New Material',
        'new_item_name' => 'New Material Name',
        'menu_name' => 'Material',
    );

    $args = array(
        'labels' => $labels,
        'heirarchical' => true,
        'query_var' => true,
        'rewrite' => true,
        'show_admin_column' => true,
    );

    register_taxonomy('material', array('project'), $args);
}
add_action('init', 'swl_add_material_taxonomy');

// Add Custom Taxonomy Building Types
function swl_add_building_type_taxonomy()
{
    $labels = array(
        'name' => 'Building Types',
        'singular_name' => 'Building Type',
        'search_items' => 'Search Building Types',
        'all_items' => 'All Building Types',
        'parent_item' => 'Parent Building Type',
        'parent_item_colon' => 'Parent Building Type:',
        'edit_item' => 'Edit Building Type',
        'update_item' => 'Update Building Type',
        'add_new_item' => 'Add New Building Type',
        'new_item_name' => 'New Building Type Name',
        'menu_name' => 'Building Types',
    );

    $args = array(
        'labels' => $labels,
        'heirarchical' => true,
        'query_var' => true,
        'rewrite' => true,
        'show_admin_column' => true,
        'show_ui' => true,
    );

    register_taxonomy('building_type', array('project'), $args);
}
add_action('init', 'swl_add_building_type_taxonomy');

// Add custom post type for projects
function swl_cpt_project()
{
    $labels = array(
        'name' => _x('Projects', 'post type general name'),
        'singular_name' => _x('Project', 'post type singular name'),
        'add_new' => _x('Add New', 'project'),
        'add_new_item' => __('Add New Project'),
        'edit_item' => __('Edit Project'),
        'new_item' => __('New Project'),
        'all_items' => __('All Projects'),
        'view_item' => __('View Project'),
        'search_items' => __('Search Projects'),
        'not_found' => __('No projects found'),
        'not_found_in_trash' => __('No projects found in the Trash'),
        'parent_item_colon' => '',
        'menu_name' => 'Projects',
    );

    $args = array(
        'labels' => $labels,
        'description' => 'SWL Projects and their galleries',
        'public' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'menu_position' => 5,  /* below Posts */
        'menu_icon' => 'dashicons-admin-multisite',
        'supports' => array('title', 'editor', 'thumbnail'/*'excerpt'*/),
        'has_archive' => true,
        'taxonomies' => array('post_tag', 'material', 'building_type'),
        'query_var' => true,
        'heirarchical' => false,
        'query_var' => 'project',
        'capability_type' => 'post',
    );

    register_post_type('project', $args);
}
add_action('init', 'swl_cpt_project');

// Add custom post type for People
function swl_cpt_people()
{
    $labels = array(
        'name' => _x('People', 'post type general name'),
        'singular_name' => _x('People', 'post type singular name'),
        'add_new' => _x('Add New', 'Person Page'),
        'add_new_item' => __('Add New Person Page'),
        'edit_item' => __('Edit Person Page'),
        'new_item' => __('New Person Page'),
        'all_items' => __('All People Pages'),
        'view_item' => __('View Person Page'),
        'search_items' => __('Search People Pages'),
        'not_found' => __('No people pages found'),
        'not_found_in_trash' => __('No people pages found in the Trash'),
        'parent_item_colon' => '',
        'menu_name' => 'People',
    );

    $args = array(
        'labels' => $labels,
        'description' => 'SWL People Pages for Practice Section',
        'public' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'menu_position' => 5,  /* below Posts */
        'menu_icon' => 'dashicons-admin-multisite',
        'supports' => array('title', 'editor', 'thumbnail'),
        'has_archive' => true,
        'taxonomies' => array(),
        'query_var' => true,
        'heirarchical' => false,
        'query_var' => 'people',
        'capability_type' => 'post',
    );

    register_post_type('people', $args);
}
add_action('init', 'swl_cpt_people');

// Add custom post type for Front Page Images
function swl_cpt_fp_image()
{
    $labels = array(
        'name' => _x('Front Page Image', 'post type general name'),
        'singular_name' => _x('Front Page Image', 'post type singular name'),
        'add_new' => _x('Add New', 'fp_image'),
        'add_new_item' => __('Add New Front Page Image'),
        'edit_item' => __('Edit Front Page Image'),
        'new_item' => __('New Front Page Image'),
        'all_items' => __('All Front Page Images'),
        'view_item' => __('View Front Page Image'),
        'search_items' => __('Search Front Page Images'),
        'not_found' => __('No Front Page Images found'),
        'not_found_in_trash' => __('No Front Page Images found in the Trash'),
        'parent_item_colon' => '',
        'menu_name' => 'Front Page Images',
    );

    $args = array(
        'labels' => $labels,
        'description' => 'SWL Front Page Images',
        'public' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'menu_position' => 5,  /* below Posts */
        'menu_icon' => 'dashicons-admin-multisite',
        'supports' => array('title'),
        'has_archive' => false,
        'query_var' => true,
        'heirarchical' => false,
        'query_var' => 'fp_image',
        'capability_type' => 'post',
    );

    register_post_type('fp_image', $args);
}
add_action('init', 'swl_cpt_fp_image');

// ADD META BOXES to project, and front page images
add_filter('rwmb_meta_boxes', 'swl_projects_meta_boxes');
function swl_projects_meta_boxes($meta_boxes)
{
    // Additional details including date
    for ($i = 2000; $i < 2030; ++$i) {
        $proj_date_years[$i] = $i;
    }

    $proj_date_months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];


    // Fullsize image box for CV page
    $meta_boxes[] = array(
        'title' => __('Full size image?', 'textdomain'),
        'post_types' => 'people',
        'fields' => array(
          array(
            'name' => 'Fullsize',
            'id' => 'swl_people_fullsize',
            'type' => 'checkbox',
            'desc' => 'Check for full screen',
          ),
        ),
    );

    // Current Team Members - Name, Acronyms, CV
    $meta_boxes[] = array(
        'title' => __('Current Team Members', 'textdomain'),
        'post_types' => 'people',
        'fields' => array(
          array(
            'id' => 'swl_current_team',
            'type'=> 'group',
            'clone' => true,
            'sort_clones' => true,
            'fields' => array(
              array(
                  'name' => 'Name',
                  'id' => 'swl_team_member_name',
                  'type' => 'text',
                  'columns' => 3,
              ),
              array(
                  'name' => 'Acronyms',
                  'id' => 'swl_team_member_acronyms',
                  'type' => 'text',
                  'columns' => 3,
              ),
              array(
                  'name' => 'CV or other info Download',
                  'id' => 'swl_team_member_cv',
                  'type' => 'file_advanced',
                  'force_delete' => false,
                  'max_file_uploads' => 1,
                  'columns' => 6,
              ),
            ),
          ),
        ),
    );

    // Past Team Members - Only Name and Acronyms
    $meta_boxes[] = array(
        'title' => __('Past Team Members', 'textdomain'),
        'post_types' => 'people',
        'fields' => array(
          array(
            'id' => 'swl_past_team',
            'type'=> 'group',
            'clone' => true,
            'sort_clones' => true,
            'fields' => array(
              array(
                  'name' => 'Name',
                  'id' => 'swl_team_member_name',
                  'type' => 'text',
                  'columns' => 6,
              ),
              array(
                  'name' => 'Acronyms',
                  'id' => 'swl_team_member_acronyms',
                  'type' => 'text',
                  'columns' => 6,
              ),
            ),
          ),
        ),
    );


    // Front Page Images
    $meta_boxes[] = array(
        'title' => __('Image', 'textdomain'),
        'post_types' => 'fp_image',
        'fields' => array(
            array(
                'name' => 'Image',
                'id' => 'fp_image',
                'type' => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name' => 'Date (Month)',
                'id' => 'fp_image_month',
                'type' => 'select',
                'options' => $proj_date_months,
            ),
            array(
                'name' => 'Date (Year)',
                'id' => 'fp_image_date',
                'type' => 'select',
                'options' => $proj_date_years,
            ),
            array(
                'name' => 'Description',
                'id' => 'fp_image_description',
                'type' => 'WYSIWYG',
                'raw' => true,
                'options' => array(
                    'media_buttons' => false,
                ),
            ),
            array(
                'name' => 'Full Screen',
                'id' => 'fp_full_screen',
                'type' => 'checkbox',
                'desc' => 'Check for full screen',
            ),
            array(
                'name' => 'Ignore',
                'id' => 'fp_ignore',
                'type' => 'checkbox',
                'desc' => 'Check to remove this from the front page',
            ),
        ),
    );

    // Project Images
    $meta_boxes[] = array(
        'title' => __('Project Images', 'textdomain'),
        'post_types' => 'project',
        'fields' => array(
            array(
                'name' => 'Image',
                'id' => 'swl_image',
                'type' => 'image_advanced',
            ),
            array(
                'name' => 'Video - Example: https://vimeo.com/30276159',
                'id' => 'swl_video',
                'type' => 'oembed',
            ),
            array(
                'name' => 'Video Slideshow Position (first is 0)',
                'id' => 'swl_video_position',
                'type' => 'number',
                'min' => 0,
                'step' => 'any',
            ),
            array(
                'name' => 'Additional Info Download',
                'id' => 'swl_info_download',
                'type' => 'file',
                'force_delete' => false,
                'max_file_uploads' => 2,
            ),
        ),
    );

    $meta_boxes[] = array(
        'title' => __('Additional Details'),
        'post_types' => __('project'),
        'fields' => array(
            array(
                'name' => 'Date',
                'id' => 'proj_date',
                'type' => 'select',
                'options' => $proj_date_years,
            ),
            array(
                'name' => 'Location City',
                'id' => 'proj_city',
                'type' => 'text',
            ),
            array(
                'name' => 'Location Country',
                'id' => 'proj_country',
                'type' => 'country',
            ),
        ),
    );

    // List of colaborators
    $meta_boxes[] = array(
        'title' => __('Credits'),
        'post_types' => __('project'),
        'fields' => array(
            array(
                'name' => 'Architect',
                'id' => 'proj_architect',
                'type' => 'text',
            ),
            array(
                'name' => 'Artist',
                'id' => 'proj_artist',
                'type' => 'text',
            ),
            array(
                'name' => 'Client',
                'id' => 'proj_client',
                'type' => 'text',
            ),
            array(
                'name' => 'Fabricator',
                'id' => 'proj_fabricator',
                'type' => 'text',
            ),
            array(
                'name' => 'Additional Credits',
                'id' => 'proj_credits',
                'type' => 'text_list',
                'options' => array(
                    'Contractor' => 'Type',
                    'XYZ Co.' => 'Credit',
                ),
                'clone' => 'true',
            ),
        ),
    );

    return $meta_boxes;
}

/* Change archive-project to show all projects not just 10 */
add_action('pre_get_posts', 'swl_custom_query_vars');
function swl_custom_query_vars($query)
{
    if (is_post_type_archive('project')) {
        $query->set('posts_per_page', -1);

        return;
    }
    if (is_post_type_archive('fp_image')) {
        $query->set('posts_per_page', -1);

        return;
    }
  //return $query;
}

/* Add custom column to projects page on admin dashboard */
add_filter('manage_fp_image_posts_columns', 'swl_fp_fullscreen_column');
function swl_fp_fullscreen_column($columns)
{
    $columns['fullscreen'] = 'Full Screen';
    $columns['ignore'] = 'Ignore';

    return $columns;
}

add_action('manage_fp_image_posts_custom_column', 'swl_fp_show_column');
function swl_fp_show_column($name)
{
    global $post;
    switch ($name) {
    case 'fullscreen':
        $full = rwmb_meta('fp_full_screen');
        if ($full) {
            $full = '<input style="visibility: hidden; display: none;" type="checkbox" checked readonly="readonly" id="fullscreen-'.$post->ID.'"/>';
            $full .= '<span style="color: green;">Yes</span>';
        } else {
            $full = '<input style="visibility: hidden; display: none;" type="checkbox" readonly="readonly" id="fullscreen-'.$post->ID.'"/>';
            $full .= '<span style="color: red;">No</span>';
        }
        echo $full;
        break;
    case 'ignore':
        $ignore = rwmb_meta('fp_ignore');
        if ($ignore == 1) {
            $ignore = '<input style="visibility: hidden; display: none;" type="checkbox" checked readonly="readonly" id="ignore-'.$post->ID.'"/>';
            $ignore .= '<span style="color: green;">Yes</span>';
        } else {
            $ignore = '<input style="visibility: hidden; display: none;" type="checkbox" readonly="readonly" id="ignore-'.$post->ID.'"/>';
            $ignore .= '<span style="color: red;">No</span>';
        }
        echo $ignore;
        break;
    }
}

/* Change the title of the "Featured Image" Meta Box on Edit Project */
add_action('do_meta_boxes', 'swl_replace_featured_image_box');
function swl_replace_featured_image_box()
{
    remove_meta_box('postimagediv', 'project', 'side');
    add_meta_box('postimagediv', __('Project Archive Thumbnail'), 'post_thumbnail_meta_box', 'project', 'side', 'low');
}

/* Quick edit from wordpress page: https://codex.wordpress.org/Plugin_API/Action_Reference/quick_edit_custom_box */
add_action('quick_edit_custom_box', 'display_custom_quickedit_fpimage', 10, 2);
function display_custom_quickedit_fpimage($column_name, $post_type)
{
    if ($post_type != 'fp_image') {
        return;
    }

    ?>

    <fieldset class="inline-edit-col-right inline-edit-fpimage">
        <div class="inline-edit-col column-<?php echo $column_name;
    ?>">
            <label class="inline-edit-group">
                <?php
                switch ($column_name) {
                    case 'ignore':
                    ?><span class="title">Ignore</span><input name="fp_ignore" type="checkbox" /><?php
                    break;
                    case 'fullscreen':
                    ?><span class="title">Fullscreen</span><input name="fp_fullscreen" type="checkbox" /><?php
                    break;
                }
    ?>
            </label>
        </div>
    </fieldset>
    <?php

}

/*
 *  Save the data entered in the custom inputs
 *  This is for the Quick Edit page on the "All Front Page Images"
 *  Only works for post_type == fp_image
 */
add_action('save_post', 'save_fpimage_meta');
function save_fpimage_meta($post_id)
{
    $slug = 'fp_image';

    if (!isset($_POST['post_type']) || $slug !== $_POST['post_type']) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_REQUEST['fp_ignore'])) {
        update_post_meta($post_id, 'fp_ignore', '1');
    } else {
        update_post_meta($post_id, 'fp_ignore', '0');
    }

    if (isset($_REQUEST['fp_fullscreen'])) {
        update_post_meta($post_id, 'fp_full_screen', '1');
    } else {
        update_post_meta($post_id, 'fp_full_screen', '0');
    }
}

/* Set the existing values */
/* First load the script into the footer */
if (!function_exists('swl_qe_admin_enqueue_scripts')):
    function swl_qe_admin_enqueue_scripts($hook)
    {
        if ($hook === 'edit.php' && isset($_GET['post_type']) && $_GET['post_type'] === 'fp_image') {
            wp_enqueue_script('swl_admin_edit', get_stylesheet_directory_uri().'/js/admin_edit.min.js', $deps = array('jquery'), $ver = false, $in_footer = true);
        }
    }
endif;
add_action('admin_enqueue_scripts', 'swl_qe_admin_enqueue_scripts');

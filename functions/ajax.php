<?php
/*************
 * Ajax Scripts
****************/
function swl_ajax_enqueues()
{
    global $wp_query;
    wp_enqueue_script('ajax_get_project_imgs', get_stylesheet_directory_uri().'/js/swl_ajax_get_posts.min.js', array('jquery'), '1.0', true);
    wp_localize_script('ajax_get_project_imgs', 'ajaxgetprojectimgs', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'query_vars' => json_encode($wp_query->query),
    ));
}
add_action('wp_enqueue_scripts', 'swl_ajax_enqueues');

add_action('wp_ajax_nopriv_ajax_get_project_imgs', 'ajax_get_project_imgs');
add_action('wp_ajax_ajax_get_project_imgs', 'ajax_get_project_imgs');

function ajax_get_project_imgs()
{
    $i = 0;
    $images = get_post_meta($_POST['project_id'], $key = 'swl_image', $single = false);
    $the_project_title = get_post_field('post_title', $_POST['project_id']);
    $the_project_content = get_post_field('post_content', $_POST['project_id']);

    $proj_meta = get_post_meta($_POST['project_id']);
    $the_project_description = '';
    $hasVideo = false;

    /* retrieve video information */
    if (array_key_exists('swl_video', $proj_meta)) {
        $hasVideo = true;
        $video = $proj_meta['swl_video'][0];
        if (array_key_exists('swl_video_position', $proj_meta)) {
            $video_place = $proj_meta['swl_video_position'][0];
        } else {
            $video_place = 1;
        }
    }

    /* Retrieve all of the details for the project and add to the description */
    if (array_key_exists('proj_architect', $proj_meta)) {
        $proj_architect = $proj_meta['proj_architect'][0];
        $the_project_description .= 'Architect: '.$proj_architect.'<br />';
    }

    if (array_key_exists('proj_artist', $proj_meta)) {
        $proj_artist = $proj_meta['proj_artist'][0];
        $the_project_description .= 'Artist: '.$proj_artist.'<br />';
    }

    if (array_key_exists('proj_client', $proj_meta)) {
        $proj_client = $proj_meta['proj_client'][0];
        $the_project_description .= 'Client: '.$proj_client.'<br />';
    }

    if (array_key_exists('proj_fabricator', $proj_meta)) {
        $proj_fabricator = $proj_meta['proj_fabricator'][0];
        $the_project_description .= 'Fabricator: '.$proj_fabricator.'<br />';
    }

    if (array_key_exists('proj_credits', $proj_meta)) {
        $credits = rwmb_meta('proj_credits', '', $_POST['project_id']);
        if (is_array($credits) || is_object($credits)) {
            foreach ($credits as $credit) {
                if ($credit[0] == '' || $credit[1] == '') {
                } else {
                    $the_project_description .= ucfirst($credit[0]).': '.$credit[1].'<br />';
                }
            }
        }
    }

    if (array_key_exists('proj_date', $proj_meta)) {
        $proj_date = $proj_meta['proj_date'][0];
    }

    $the_project_description .= '<br />'.$the_project_content;

    /* Is there a PDF or similar to download? */
    if (rwmb_meta('swl_info_download', [], $_POST['project_id'])) {
        $the_project_description .= '<br />Download more details:';
        $swl_info_download_link = rwmb_meta('swl_info_download');
        if (is_array($swl_info_download_link) || is_object($swl_info_download_link)) {
            foreach ($swl_info_download_link as $file) {
                $the_project_description .= "&nbsp;&nbsp;<a href='".$file['url']."' title='".$file['name']."'>".$file['title'].'</a><br />';
            }
        }
    }

    $image_counter = 0; // for comparing against the video position

    foreach ($images as $image) {
        $img = wp_get_attachment_image_src($image, $size = 'featured-large', $icon = false);
        $img_ratio = $img[1] / $img[2];

        $imgs[$i] = '<img src="'.$img[0].'" alt="'.$the_project_title.'" class="slide" data-r="'.$img_ratio.'" data-f="100" height="'.$img[2].'px" width="'.$img[1].'px" />';

        ++$i;
        ++$image_counter;

        if ($hasVideo) {
            if ($video_place == $image_counter) {
                $imgs[$i] = "<div class='slide video' data-f='100' data-r='1.777'>".wp_oembed_get($video, array('data-f' => 100, 'data-r' => 1.777, 'class' => 'slide video')).'</div>';
                ++$i;
            }
        }
    }

    $imgs[$i] = '<span class="single-project-date inactive">'.$proj_date.'</span><span class="single-project-caption inactive">'.$the_project_title.'</span><span class="single-project-description inactive">'.$the_project_description.'</span>';

    echo json_encode($imgs);

    die();
}

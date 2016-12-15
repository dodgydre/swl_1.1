<?php
get_header();
?>
<div class="proj_img_container">

    <div id="proj_img" class="home slideshow sliding">
        <div id="image_container" class="proj active">
            <?php
                $people = new WP_Query(array(
                    'post_type' => 'people',
                    'posts_per_page' => -1,
                ));
                while ($people->have_posts()) : $people->the_post();

                    $proj_meta = get_post_meta($post->ID);

                    $tn_id = get_post_thumbnail_id($post->ID);
                    $img = wp_get_attachment_image_src($tn_id, 'featured-large');
                    $img_ratio = $img[1] / $img[2];

                    $description = apply_filters('the_content', get_the_content());

                    if (rwmb_meta('swl_cv_download')) {
                        $description .= '<br />Download more details:';
                        $swl_info_download_link = rwmb_meta('swl_cv_download');
                        foreach ($swl_info_download_link as $file) {
                            $description .= "&nbsp;&nbsp;<a href='".$file['url']."' title='".$file['name']."'>".$file['title'].'</a><br />';
                        }
                    }

                    if (rwmb_meta('swl_people_fullsize')) {
                        echo "<img src='".$img[0]."' alt='".the_title('', '', false)."' class='slide full' data-r='".$img_ratio."' data-f='100' style='display: none;' />";
                    } else {
                        echo "<img src='".$img[0]."' alt='".the_title('', '', false)."' class='slide' data-r='".$img_ratio."' data-f='100' style='display: none;' />";
                    }
                    echo "<span class='caption'>".the_title('', '', false).'</span>';
                    echo "<span class='more'>/ Read More</span>";
                    echo "<span class='description'>".$description.'</span>';
                endwhile;
                ?>


        </div> <!-- / image_container -->

        <a class="arrw left" style="width: 644px; height: 780px; top: 0px;"></a>
        <a class="arrw right" style="width: 644px; height: 780px; top: 0px;"></a>

    </div> <!-- / proj_img -->
</div> <!-- /proj_img_container -->

<!-- Start: Footer -->
<div class="footer__container">
<div class="footer__wrapper">
  <a class="expand">
    <span class="footer__caption-date"></span>
    <span class="footer__caption"></span>
    <span class="footer__more">/ Read More</span>
  </a>
</div>
</div>
<!-- End: Footer -->

<!-- Start: Footer -->
<div class="below-footer__container">
<div class="below-footer__wrapper">
  <span class="below-footer__description"></span>
</div>
</div>
<!-- End: Footer -->


<?php
get_footer();
?>

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
                $number_of_people = 0;
                while ($people->have_posts()) : $people->the_post();
                    $number_of_people ++;
                    $proj_meta = get_post_meta($post->ID);

                    $tn_id = get_post_thumbnail_id($post->ID);
                    $img = wp_get_attachment_image_src($tn_id, 'featured-large');
                    $img_ratio = $img[1] / $img[2];

                    $description = apply_filters('the_content', get_the_content());

                    $current_members = rwmb_meta('swl_current_team');
                    if ( ! empty( $current_members ) ) {
                      $description .= "<p> <strong>Current Team Members</strong> </p>";
                      $description .= "<p>";

                      foreach ( $current_members as $current_member ) {
                        $description .= $current_member['swl_team_member_name'];
                        if( ! empty($current_member['swl_team_member_acronyms'] ) ) {
                          $description .= " <em>" . $current_member['swl_team_member_acronyms'] . "</em>";
                        }

                        if( !empty($current_member['swl_team_member_cv'][0]) ) {
                          $cv_id = $current_member['swl_team_member_cv'][0];

                          $description .= "&nbsp;&nbsp;-&nbsp;&nbsp;<a href='". wp_get_attachment_url($cv_id) ."' title='".get_the_title($cv_id)."'  target='_blank'>(".get_the_title($cv_id).')</a>';
                        }
                        $description .= "<br />";
                      }
                      $description .= "</p>";
                    }

                    $past_members = rwmb_meta('swl_past_team');
                    if ( ! empty( $past_members ) ) {
                      $description .= "<p> <strong>Past Team Members</strong> </p>";
                      $description .= "<p>";

                      foreach ( $past_members as $past_member ) {
                        $description .= $past_member['swl_team_member_name'];
                        if( ! empty($past_member['swl_team_member_acronyms'] ) ) {
                          $description .= " <em>" . $past_member['swl_team_member_acronyms'] . "</em>";
                        }
                        $description .= "<br />";
                      }

                      $description .= "</p>";
                    }

                    if (rwmb_meta('swl_people_fullsize')) {
                        echo "<img src='".$img[0]."' alt='".the_title('', '', false)."' class='slide full' data-r='".$img_ratio."' data-f='100' style='display: none;' />";
                    } else {
                        echo "<img src='".$img[0]."' alt='".the_title('', '', false)."' class='slide' data-r='".$img_ratio."' data-f='100' style='display: none;' />";
                    }
                    echo "<span class='caption'>".the_title('', '', false).'</span>';
                    echo "<span class='more'>/ Read text</span>";
                    echo "<span class='description'>".$description.'</span>';
                endwhile;
                ?>


        </div> <!-- / image_container -->
        <?php if ( $number_of_people > 1 ) : ?>
          <a class="arrw left" style="width: 644px; height: 780px; top: 0px;"></a>
          <a class="arrw right" style="width: 644px; height: 780px; top: 0px;"></a>
        <?php endif; ?>


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

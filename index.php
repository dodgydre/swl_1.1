<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 */
get_header(); ?>

	<div class="proj_img_container">

		<div id="proj_img" class="home slideshow sliding" data-t="featured">
    	<div id="image_container" class="proj active">

				<?php

                $fp_images = new WP_Query(array(
                        'post_type' => 'fp_image',
                        'posts_per_page' => -1,
                ));

                while ($fp_images->have_posts()) : $fp_images->the_post();

                    $proj_meta = get_post_meta($post->ID);

                    if (array_key_exists('fp_image_date', $proj_meta)) {
                        $proj_date = $proj_meta['fp_image_date'][0];
                    }
                    ?>

					<?php
                    $ignore = rwmb_meta('fp_ignore');
                    if (!$ignore) {
                        if (array_key_exists('fp_image', $proj_meta)) {
                            $img = wp_get_attachment_image_src($proj_meta['fp_image'][0], $size = 'featured-large', $icon = false);
                            $img_ratio = $img[1] / $img[2];
                            $fullscreen = rwmb_meta('fp_full_screen');
                            if ($fullscreen) {
                                echo "<img src='".$img[0]."' alt='".get_the_title($proj_meta['fp_image'][0])."' class='slide full' data-r='".$img_ratio."' data-f='100' style='display: none;' />";
                            } else {
                                echo "<img src='".$img[0]."' alt='".get_the_title($proj_meta['fp_image'][0])."' class='slide' data-r='".$img_ratio."' data-f='100' height='".$img[2]."px' width='".$img[1]."px' style='display: none;' />";
                            }
                        }

                        ?>
						<span class="date"><?php echo $proj_date;
                        ?></span>
						<span class="caption"><?php echo the_title();
                        ?></span>
						<?php
                            if (array_key_exists('fp_image_description', $proj_meta)) {
                                echo "<span class='more'>/ Read More</span>";
                                echo "<span class='description'>".$proj_meta['fp_image_description'][0].'</span>';
                            } else {
                                echo "<span class='more'></span>";
                                echo "<span class='description'></span>";
                            }
                        ?>

					<?php

                    }
                endwhile;
                ?>

			</div> <!-- / image_container -->

			<a class="arrw left" style="width: 644px; height: 780px; top: 0px;"></a>
	    <a class="arrw right" style="width: 644px; height: 780px; top: 0px;"></a>

		</div> <!-- / proj_image -->

	</div> <!-- / proj_img_container -->

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
//get_sidebar();
get_footer();

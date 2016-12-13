<?php
/**
 * Template Name: Practice (Job Enquiries).
 */
 get_header();

 ?>

<div class="page__container" id="page__container">
  <div id="proj_img">

    <?php if (have_posts()) : ?>

    	<?php while (have_posts()) : the_post(); ?>
        <?php
          $att_id = get_post_thumbnail_id($post);

          $img = wp_get_attachment_image_src($att_id, 'featured-large');
          $img_ratio = $img[1] / $img[2];

        ?>

        <div class="jobs">
            <img src="<?php echo $img[0]; ?>" class="slide full" style="display: none" data-r="<?php echo $img_ratio; ?>">

        </div>

        <!-- Start: Footer -->
        <div class="single-footer__container expanded">
        	<div class="single-footer__wrapper">

            <a class="single-expand">
              <span class="single-footer__caption">
                <?php echo the_title(); ?>
              </span>
              <span class="single-footer__more">/ Hide Text</span>
            </a>
        	</div>
        </div>
        <!-- End: Footer -->

        <!-- Start: Below Footer -->
        <div class="single-below-footer__container">
        	<div class="single-below-footer__wrapper">
        		<div class="single-below-footer__description">
        		  <?php echo the_content(); ?>
                </div>
        	</div>
        </div>
        <!-- End: Below Footer -->

    	<?php endwhile; ?>

    		<?php // Navigation ?>

    	<?php else : ?>

    		<?php // No Posts Found ?>

    <?php endif; ?>

  </div>
</div>

 <?php
 get_footer();

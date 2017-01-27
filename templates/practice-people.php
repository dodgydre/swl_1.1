<?php
/**
 * Template Name: Practice (People).
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
        ?>

        <div class="jobs">
          <div class="slide">
            <img src="<?php echo $img[0]; ?>" class="full" style="display: block">
          </div>

        </div>

        <!-- Start: Footer -->
        <div class="single-footer__container expanded">
        	<div class="single-footer__wrapper">

            <a class="single-expand">
              <span class="single-footer__caption">
                <?php echo the_title(); ?>
              </span>
              <span class="single-footer__more">/ Hide text</span>
            </a>
        	</div>
        </div>
        <!-- End: Footer -->

        <!-- Start: Below Footer -->
        <div class="single-below-footer__container">
        	<div class="single-below-footer__wrapper">
        		<span class="single-below-footer__description">
        		  <?php echo the_content(); ?>
        		</span>
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

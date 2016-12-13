<?php
/**
 * Template Name: Contact.
 */
 get_header();

 ?>

<div class="page__container" id="page__container">
  <div class="page__wrapper">

    <?php if (have_posts()) : ?>

    	<?php while (have_posts()) : the_post(); ?>

        <div class="contact-left">
            <div id="map">

            </div>
        </div>

        <div class="contact-right">

            <?php echo the_content(); ?>

            <a href="https://www.instagram.com/structure.workshop/"><img src="<?php echo get_template_directory_uri(); ?>/images/instagram.png" alt="SWL on Instagram" width="25px" height="25px"/></a>
        </div>

    	<?php endwhile; ?>

    		<?php // Navigation ?>

    	<?php else : ?>

    		<?php // No Posts Found ?>

    <?php endif; ?>

  </div>
</div>

 <?php
 get_footer();

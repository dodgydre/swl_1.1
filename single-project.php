<?php get_header(); ?>
<!-- Start: proj_img_container -->
<div class="proj_img_container" id="proj_img_container">

<?php if (have_posts()) : ?>

	<?php
  while (have_posts()) : the_post();
    // get images from current post.  Also get title, text, etc. ?
    ?>
    <div id="proj_img" class="project slideshow sliding" data-t="projects">
    <?php
    //$nextProj = '';
    //$prevProj = '';
    //$firstProj = '';
        //$prevProjId = '';
    $activePassed = false;
        //$numProjects = 0;
        //$projectImages = array();

    $images = get_post_meta(get_the_ID(), $key = 'swl_image', $single = false);
    $the_project_title = the_title('', '', false);
        $the_project_content = get_the_content();

        $proj_meta = get_post_meta($post->ID);
        $the_project_description = '';

        /* Retrieve all of the details for the project */
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
            $credits = rwmb_meta('proj_credits');
            foreach ($credits as $credit) {
                if ($credit[0] == '' || $credit[1] == '') {
                } else {
                    $the_project_description .= ucfirst($credit[0]).': '.$credit[1].'<br />';
                }
            }
        }

        if (array_key_exists('proj_date', $proj_meta)) {
            $proj_date = $proj_meta['proj_date'][0];
        }
        $the_project_description .= '<br />'.$the_project_content;

        if (rwmb_meta('swl_info_download')) {
            $the_project_description .= '<br />Download more details:';
            $swl_info_download_link = rwmb_meta('swl_info_download');
            foreach ($swl_info_download_link as $file) {
                $the_project_description .= "&nbsp;&nbsp;<a href='".$file['url']."' title='".$file['name']."'>".$file['title'].'</a><br />';
            }
        }

    // Search for all projects
    $projects = new WP_Query(array(
        'post_type' => 'project',
        'posts_per_page' => -1,
    ));

    while ($projects->have_posts()) : $projects->the_post();

            $hasVideo = false;
      $activeFlag = '';
      $proj_id = get_the_ID();
      $proj_title = get_the_title();

      if ($proj_title == $the_project_title) {
          $activeProjId = $proj_id;
          $activeFlag = ' active';
          $activePassed = true;
      }

      echo '<div id="p_'.$post->post_name.'" class="proj'.$activeFlag.'" data-id="'.$proj_id.'" data-title="'.get_the_title().'">';

            if (array_key_exists('swl_video', $proj_meta)) {
                $hasVideo = true;
                $video = $proj_meta['swl_video'][0];
                if (array_key_exists('swl_video_position', $proj_meta)) {
                    $video_place = $proj_meta['swl_video_position'][0];
                } else {
                    $video_place = 1;
                }
            }

      // are we on the current project?
      if ($proj_title == $the_project_title) {
          $counter = 0;
          foreach ($images as $image) {
              $img = wp_get_attachment_image_src($image, $size = 'featured-large', $icon = false);
              $img_ratio = $img[1] / $img[2];

              ?>
          <img src="<?php echo $img[0];
              ?>" alt="<?php echo get_the_title($image);
              ?>" class="slide" data-r="<?php echo $img_ratio;
              ?>" data-f="100" height="<?php echo $img[2];
              ?>px" width="<?php echo $img[1];
              ?>px" style="display: none;" />
					<?php

                    ++$counter;
              if ($hasVideo) {
                  if ($video_place == $counter) {
                      echo "<div class='slide video' data-f='100' data-r='1.777'>";
                      echo wp_oembed_get($video, array('data-f' => 100, 'data-r' => 1.777, 'class' => 'slide video'));
                      echo '</div>';
                  }
              }
          }
          ?>
				<span class="date"><?php echo $proj_date;
          ?></span>
				<span class="caption"><?php echo $the_project_title;
          ?></span>
				<span class="description"><?php echo $the_project_description;
          ?></span>
			<?php

      }
      echo '</div>';

    endwhile;
    // Individual Post Styling ?>

	<?php endwhile; ?>

		<?php // Navigation ?>

    <a href="#" class="arrw left" style="width: 644px; height: 780px; top: 120px;"></a>
    <a href="#" class="arrw right" style="width: 644px; height: 780px; top: 120px;"></a>

    <a href="#" class="arrw up" data-id=""></a>
    <a href="#" class="arrw down" data-id=""></a>
  </div> <!-- / proj_image -->


	<?php else : ?>

		<?php // No Posts Found ?>

<?php endif; ?>

</div>
<!-- End: proj_img_container -->

<!-- Start: Footer -->
<div class="single-footer__container">
	<div class="single-footer__wrapper">
		<a class="single-expand">
			<span class="single-footer__caption-date"><?php echo $proj_date; ?></span>
			<span class="single-footer__caption"><?php echo $the_project_title; ?></span>
			<span class="single-footer__more">/ Read More</span>
		</a>
	</div>
</div>
<!-- End: Footer -->

<!-- Start: Below Footer -->
<div class="single-below-footer__container">
	<div class="single-below-footer__wrapper">
		<span class="single-below-footer__description"></span>
	</div>
</div>
<!-- End: Below Footer -->
<?php get_footer() ?>

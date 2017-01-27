<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */
global $template;
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<!-- TODO: Remove this most likely -->
<!--<link href="https://fonts.googleapis.com/css?family=Ropa+Sans" rel="stylesheet">-->

<!-- TODO: Check the files in the enqueuing functions.php -->
<script type="text/javascript">
// Get the site url for use in javascript later
  var siteUrl = '<?php echo get_bloginfo('url'); ?>';
</script>
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="site">
  <!-- Start Header -->
  <div class="header__container">
    <div class="header__wrapper">
      <a href="<?php echo esc_url(home_url('/')); ?>">
        <img class="logo-large-image" src="<?php echo get_template_directory_uri(); ?>/images/structure_workshop.png" alt="Structure Workshop" width="225px" height="15px" />

        <?php
          /* Only show the sub-logo when on index page with no menu showing */
          if (basename($template) == 'index.php' && ! (isset($_GET['swl']) && $_GET['swl'] == '1') ) {
            ?>
            <img class="sub_logo-large-image" src="<?php echo get_template_directory_uri(); ?>/images/eng_tech_design.png" alt="Engineering and Technical Design" width="223px" height="12px" />
            <?php
          } else if ( basename($template) == 'index.php' && (isset($_GET['swl']) && $_GET['swl'] == '1') ) {
            ?>
            <img class="sub_logo-large-image is-hidden" src="<?php echo get_template_directory_uri(); ?>/images/eng_tech_design.png" alt="Engineering and Technical Design" width="223px" height="12px" />
            <?php
          }
        ?>

      </a>

      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo-small-image">
        <img src="<?php echo get_template_directory_uri(); ?>/images/logo_small.gif" alt="Structure Workshop Engineering and Technical Design" />
      </a>

      <div class="menu-icon">
        <a class="header__icon" id="header__icon-open" href="<?php echo esc_url(home_url('/?swl=1')); ?>">
          <img src="<?php echo get_template_directory_uri(); ?>/images/menu-icon.gif" alt="menu" />
        </a>
      </div>


      <!-- TODO Check if it is 'projects' ! -->
      <div class="large-menu <?php
        if (basename($template) == 'archive-project.php'
            || basename($template) == 'single-project.php'
            || basename($template) == 'contact.php'
            || basename($template) == 'practice-profile.php'
            || basename($template) == 'practice-jobs.php'
            || basename($template) == 'archive-people.php') {
            echo 'is-active';
        } if (basename($template) == 'index.php' && isset($_GET['swl']) && $_GET['swl'] == '1') {
            echo 'is-active';
        } ?>"
      />
        <a href="<?php echo esc_url(home_url('/profile')); ?>">
          <span class="information_menu_icon">
          <?php
          if ( basename($template) == 'practice-profile.php' || basename($template) == 'practice-jobs.php' || basename($template) == 'archive-people.php' || basename($template) == 'contact.php' ) {
            ?>
              <img src="<?php echo get_template_directory_uri(); ?>/images/information_active.png" width="75px" height="15px" />
            <?php
          } else {
            ?>
              <img src="<?php echo get_template_directory_uri(); ?>/images/information.png" width="75px" height="15px" />
            <?php
          }
          ?>
          </span>
        </a>

        <a href="<?php echo esc_url(home_url('/project')); ?>">
          <span class="projects_menu_icon">
          <?php
          if ( basename($template) == 'archive-project.php' || basename($template) == 'single-project.php' ) {
            ?>
              <img src="<?php echo get_template_directory_uri(); ?>/images/projects_active.png" width="75px" height="15px" />
            <?php
          } else {
            ?>
              <img src="<?php echo get_template_directory_uri(); ?>/images/projects.png" width="75px" height="15px" />
            <?php
          }
          ?>
          </span>
        </a>
      </div>


      <?php
      /* Sub menu for Practice */
      if ( basename($template) == 'practice-profile.php'
          || basename($template) == 'practice-jobs.php'
          || basename($template) == 'archive-people.php'
          || basename($template) == 'contact.php' ) {
          ?>
        <div class="large-menu-sub is-active">

          <a href="<?php echo esc_url(home_url('/profile')); ?>">
            <span class="profile_menu_icon">
            <?php
            if ( basename($template) == 'practice-profile.php' ) {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/profile_active.png" width="75px" height="15px" />
              <?php
            } else {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/profile.png" width="75px" height="15px" />
              <?php
            }
            ?>
            </span>
          </a>
          <!-- // TODO: Change this to a page again? -->
          <a href="<?php echo esc_url(home_url('/people')); ?>">
            <span class="team_menu_icon">
            <?php
            if ( basename($template) == 'archive-people.php' ) {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/team_active.png" width="75px" height="15px" />
              <?php
            } else {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/team.png" width="75px" height="15px" />
              <?php
            }
            ?>
            </span>
          </a>

          <a href="<?php echo esc_url(home_url('/jobs')); ?>">
            <span class="jobs_menu_icon">
            <?php
            if ( basename($template) == 'practice-jobs.php' ) {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/jobs_active.png" width="120px" height="15px" />
              <?php
            } else {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/jobs.png" width="120px" height="15px" />
              <?php
            }
            ?>
            </span>
          </a>

          <a href="<?php echo esc_url(home_url('/contact')); ?>">
            <span class="contact_menu_icon">
            <?php
            if ( basename($template) == 'contact.php' ) {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/contact_active.png" width="75px" height="15px" />
              <?php
            } else {
              ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/contact.png" width="75px" height="15px" />
              <?php
            }
            ?>
            </span>
          </a>


        </div>
        <?php

      }
      /* End Sub Menu for Practice */
      ?>
    </div>


  </div>
  <!-- End Header -->


  <!-- Start: Small Screen Menu -->
  <div class="large-menu_mobile">

    <?php if(basename($template) == 'index.php') { ?>
      <ul class="large-menu-list">
        <li class="large-menu-list-item">
          <a href="<?php echo esc_url(home_url('/project')); ?>">Projects</a>
        </li>
        <li class="large-menu-list-item">
          <a href="<?php echo esc_url(home_url('/profile')); ?>">Practice</a>
        </li>
        <li class="large-menu-list-item">
          <a href="<?php echo esc_url(home_url('/contact')); ?>">Contact</a>
        </li>
      </ul>
    <?php } else if (basename($template) == 'archive-project.php') { ?>

        <div id="searchElements_mobile" style="display: inline-block; top: 10px; left: 0px; width: calc(100% - 30px); position: relative; overflow-y: visible;">
          <div class="searchbox" style="display: inline-block; width: calc(100%); float: left;">
            <input
              type="text"
              autocomplete="off"
              tabindex=""
              id="filter-search_mobile"
              placeholder="filters..."
              style="opacity: 1; position: absolute;"
            />
          </div>
        </div>

    <?php } ?>
  </div>
  <!-- End: Small Screen Menu -->

  <!-- Start: Content -->
  <div class="content">

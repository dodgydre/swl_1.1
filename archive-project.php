<?php
get_header();
?>

<div id="projthumb-wrap" class="projthumb-wrap">

<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>

    <?php // Individual Post Styling
        $proj_class_filters = '';

        /* Get all the project meta data */
        $proj_meta = get_post_meta($post->ID);

        /* Set up the arrays for the classes and filters */
        if (array_key_exists('proj_architect', $proj_meta)) {
            $filters[] = "{ class: 'credits', value: '".str_replace(' ', '_', $proj_meta['proj_architect'][0])."', name: '".ucfirst($proj_meta['proj_architect'][0])."' }";
            $proj_class_filters .= str_replace(' ', '_', $proj_meta['proj_architect'][0]).' ';
        }
        if (array_key_exists('proj_artist', $proj_meta)) {
            $filters[] = "{ class: 'credits', value: '".str_replace(' ', '_', $proj_meta['proj_artist'][0])."', name: '".ucfirst($proj_meta['proj_artist'][0])."' }";
            $proj_class_filters .= str_replace(' ', '_', $proj_meta['proj_artist'][0]).' ';
        }
        if (array_key_exists('proj_client', $proj_meta)) {
            $filters[] = "{ class: 'credits', value: '".str_replace(' ', '_', $proj_meta['proj_client'][0])."', name: '".ucfirst($proj_meta['proj_client'][0])."' }";
            $proj_class_filters .= str_replace(' ', '_', $proj_meta['proj_client'][0]).' ';
        }
        if (array_key_exists('proj_fabricator', $proj_meta)) {
            $filters[] = "{ class: 'credits', value: '".str_replace(' ', '_', $proj_meta['proj_fabricator'][0])."', name: '".ucfirst($proj_meta['proj_fabricator'][0])."' }";
            $proj_class_filters .= str_replace(' ', '_', $proj_meta['proj_fabricator'][0]).' ';
        }
        if (array_key_exists('proj_credits', $proj_meta)) {
            $values = rwmb_meta('proj_credits');
            foreach ($values as $value) {
                $filters[] = "{ class: 'credits', value: '".str_replace(' ', '_', $value[1])."', name: '".ucfirst($value[1])."'}";
                $proj_class_filters .= str_replace(' ', '_', $value[1]).' ';
            }
        }
        if (array_key_exists('proj_city', $proj_meta)) {
            $proj_city = $proj_meta['proj_city'][0];
            $proj_class_filters .= str_replace(' ', '_', $proj_meta['proj_city'][0]).' ';
            $filters[] = "{ class: 'city', value: '".str_replace(' ', '_', $proj_meta['proj_city'][0])."', name: '".$proj_meta['proj_city'][0]."' }";
        }
        if (array_key_exists('proj_country', $proj_meta)) {
            $proj_country = $proj_meta['proj_country'][0];
            $proj_class_filters .= str_replace(' ', '_', $proj_meta['proj_country'][0]).' ';
            $filters[] = "{ class: 'country', value: '".str_replace(' ', '_', $proj_meta['proj_country'][0])."', name: '".$proj_meta['proj_country'][0]."' }";
        }
        if (array_key_exists('proj_date', $proj_meta)) {
            $proj_date = $proj_meta['proj_date'][0];
            $proj_class_filters .= str_replace(' ', '_', $proj_meta['proj_date'][0]).' ';
            $filters[] = "{ class: 'year', value: '".$proj_meta['proj_date'][0]."', name: '".$proj_meta['proj_date'][0]."' }";
        }

        /* Get the Building Types */
        $proj_types = get_the_terms($post->ID, 'building_type');
        if (!empty($proj_types)) {
            foreach ($proj_types as $type) {
                $proj_class_filters .= str_replace(' ', '_', $type->name).' ';
                $filters[] = "{ class: 'type', value: '".str_replace(' ', '_', $type->name)."', name: '".ucfirst($type->name)."' }";
            }
        }

        /* Get the tags - Building / Arts */
        $proj_tags = get_the_tags();
        if (!empty($proj_tags)) {
            foreach ($proj_tags as $tag) {
                $proj_class_filters .= str_replace(' ', '_', $tag->name).' ';
                $filters[] = "{ class: 'tag', value: '".str_replace(' ', '_', $tag->name)."', name: '".ucfirst($tag->name)."' }";
            }
        }

        /* Get the materials */
        $proj_materials = get_the_terms($post->ID, 'material');
        if (!empty($proj_materials)) {
            foreach ($proj_materials as $material) {
                $proj_class_filters .= str_replace(' ', '_', $material->name).' ';
                $filters[] = "{ class: 'material', value: '".str_replace(' ', '_', $material->name)."', name: '".ucfirst($material->name)."' }";
            }
        }
    ?>

    <div class="projthumb <?php echo $proj_class_filters; ?>">
        <?php
            // Get the thumbnail image
            // Set the size to fit the thumbnail box and position properly.
            $tn_id = get_post_thumbnail_id($post->ID);
            $img = wp_get_attachment_image_src($tn_id, 'project_thumb');
            $width = $img[1];
            $height = $img[2];
            $imageRatio = $width / $height;

            if ($width == 270) {
                $top = (270 - $height) / 2;
                $details = 'width="270px" style="top: '.$top.'px;"';
                $text_details = 'style="top: '.($height + $top + 5).'px;"';
            } else {
                $left = (270 - $width) / 2;
                $details = 'height="270px" style="left: '.$left.'px;"';
                $text_details = 'style="top: 275px; left: '.$left.'px;"';
            }
        ?>
        <a href="<?php echo get_permalink($post->ID); ?>">
            <?php
                if ($img[0] != '') {
                ?>
                    <img src="<?php echo $img[0] ?>" <?php echo $details; ?> data-r="<?php echo $imageRatio; ?>"/>
                <?php
                } else {
                ?>
                    <img src="http://placehold.it/270x270" width="270px" data-r="1.0"/>
                    <?php $text_details = 'style="top: 275px"';
                 }
                ?>

                <div class="projtext" <?php echo $text_details; ?> >
                    <?php echo the_title(); ?>

    <?php

                        if (isset($proj_date)) {
                            echo ', '.$proj_date;
                        } ?>
    <br />
    <?php
                        if (isset($proj_city) && isset($proj_country)) {
                            echo $proj_city.', '.$proj_country;
                        } elseif (isset($proj_city)) {
                            echo $proj_city;
                        } elseif (isset($proj_country)) {
                            echo $proj_country;
                        }
                    ?>
    </div>
    </a>
    </div>

    <?php endwhile; ?>
    <?php // Navigation ?>
    <?php else : ?>
    <?php // No Posts Found ?>
<?php endif; ?>

</div> <!-- /. projthumb-wrap -->

    <div class="search-icon" style="display: none;">
    <img id="searchIcon" src="<?php echo get_template_directory_uri(); ?>/images/icon-search-left.png" alt="search"/>
    </div>
    <div class="search" style="display: none;">
    <div id="searchElements" style="left: -302px; width: 301px; position: relative; overflow-y: visible;">
    <div class="searchbox" style="display: inline-block; width: calc(100%); float: left;">
    <input
        type="text"
        autocomplete="off"
        tabindex=""
        id="filter-search"
        placeholder="filters..."
        style="opacity: 1; position: absolute;"
    />
    </div>
    </div>
    </div>

    <script>
    jQuery(document).ready(function() {

    var $filter = jQuery("#filter-search").selectize({
          options: [
    <?php

                            foreach ($filters as $filter) {
                                if (!empty($filter)) {
                                    echo $filter.",\r\n";
                                }
                            }

                    ?>
          ],
          optgroups: [
            { value: 'type', label: 'Type', $order: 1 },
            { value: 'material', label: 'Material', $order: 2 },
            { value: 'tag', label: 'Material', $order: 3 },
            { value: 'credits', label: 'Credits', $order: 4 },
            { value: 'city', label: 'City', $order: 5 },
            { value: 'country', label: 'Country', $order: 6 },
            { value: 'year', label: 'Year', $order: 7 },
          ],
          optgroupField: 'class',
          lockOptgroupOrder: true,
          labelField: 'name',
          searchField: ['name'],
          sortField: 'name',
          selectOnTab: true,
          render: {
            optgroup_header: function(data, escape) {
              return '<div class="optgroup-header" style="display: none;">' + escape(data.label) + '</div>';
            },
          },

          create: false,
          onChange: function(value) {
            if(value == '') {
              var filterList = "*";
            }
            else {
              var filters = value.split(',');
              var filterList = '';
              for( var i = 0; i < filters.length; i++ ) {
                filterList += '.' + filters[i];
              }
            }
            $grid.isotope({ filter: filterList });
          },
          onClear: function() {
            $grid.isotope({ filter: "*" });
          },
        });
        var $filterSearch = $filter[0].selectize;

        var $filter_mobile = jQuery("#filter-search_mobile").selectize({
              options: [
        <?php

                                foreach ($filters as $filter) {
                                    if (!empty($filter)) {
                                        echo $filter.",\r\n";
                                    }
                                }

                        ?>
              ],
              optgroups: [
                { value: 'type', label: 'Type', $order: 1 },
                { value: 'material', label: 'Material', $order: 2 },
                { value: 'tag', label: 'Material', $order: 3 },
                { value: 'credits', label: 'Credits', $order: 4 },
                { value: 'city', label: 'City', $order: 5 },
                { value: 'country', label: 'Country', $order: 6 },
                { value: 'year', label: 'Year', $order: 7 },
              ],
              optgroupField: 'class',
              lockOptgroupOrder: true,
              labelField: 'name',
              searchField: ['name'],
              sortField: 'name',
              selectOnTab: true,
              render: {
                optgroup_header: function(data, escape) {
                  return '<div class="optgroup-header" style="display: none;">' + escape(data.label) + '</div>';
                },
              },

              create: false,
              onChange: function(value) {
                if(value == '') {
                  var filterList = "*";
                }
                else {
                  var filters = value.split(',');
                  var filterList = '';
                  for( var i = 0; i < filters.length; i++ ) {
                    filterList += '.' + filters[i];
                  }
                }
                $grid.isotope({ filter: filterList });
              },
              onClear: function() {
                $grid.isotope({ filter: "*" });
              },
            });
            var $filterSearch_mobile = $filter_mobile[0].selectize;

    /* ISOTOPE GRID */
    var $grid = jQuery('.projthumb-wrap').imagesLoaded( function() {
    jQuery('.projthumb-wrap').isotope({
          	itemSelector: '.projthumb',
          layoutMode: 'fitRows',
          transitionDuration: 0,
          hiddenStyle: {
            opacity: 0,
            //transform: 'scale(0.001)',
          },
          visibleStyle: {
            opacity: 1,
            //transform: 'scale(1)',
          }
        	})
    });

    });
    </script>
    <!-- End Search Box -->
    <?php /* NOTE: End Filter search */ ?>


<?php
get_footer();
?>

<?php
/**
 * Load all of the theme specific files.
 *
 * @package: SWL
 */
require_once locate_template('/functions/cleanup.php');
require_once locate_template('/functions/setup.php');
require_once locate_template('/functions/enqueues.php');
require_once locate_template('/functions/cpt.taxonomy.php');
require_once locate_template('/functions/admin.php');
require_once locate_template('/functions/ajax.php');
require_once locate_template('/functions/class-tgm-plugin-activation.php');
require_once locate_template('/functions/required_plugins.php');
require_once locate_template('/functions/template-tags.php');

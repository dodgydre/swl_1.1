<?php

// Remove some of the menu items from the dashboard if you're not an admin
// ie. !current_user_can('create_users');
function remove_menus()
{
    global $user_ID;
    if (!current_user_can('create_users')) {
        remove_menu_page('index.php');                  //Dashboard
        //remove_menu_page( 'jetpack' );                    //Jetpack*
        remove_menu_page('edit.php');                   //Posts
        //remove_menu_page( 'upload.php' );                 //Media
        //remove_menu_page( 'edit.php?post_type=page' );    //Pages
        remove_menu_page('edit-comments.php');          //Comments
        remove_menu_page('themes.php');                 //Appearance
        remove_menu_page('plugins.php');                //Plugins
        remove_menu_page('users.php');                  //Users
        remove_menu_page('tools.php');                  //Tools
        remove_menu_page('options-general.php');        //Settings
        remove_action('media_buttons', 'media_buttons'); // Remove the Add Media Buttons
    }
    remove_menu_page('edit.php');
    remove_menu_page('edit-comments.php');          //Comments
}
add_action('admin_menu', 'remove_menus');

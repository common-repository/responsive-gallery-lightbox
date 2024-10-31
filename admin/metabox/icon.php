<?php
 
function rs_gallery_add_menu_icons_styles(){
?>
 
<style>
#adminmenu .menu-icon-rs-gallery div.wp-menu-image:before {
content: "\f161";
}
</style>
 
<?php
}
add_action( 'admin_head', 'rs_gallery_add_menu_icons_styles' );
?>
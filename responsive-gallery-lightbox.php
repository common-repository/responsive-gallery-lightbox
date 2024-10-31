<?php
/*
Plugin Name: Responsive Gallery Lightbox
Plugin URI: http://www.bolobd.com/plugins/responsive-gallery-lightbox/
Description: RS Responsive Gallery Lightbox is a lightweight, elegant, responsive, mobile-friendly jQuery plugin for displaying an image/video gallery in a fullscreen lightbox with CSS3 transition effects.
Author: Noor-E-Alam
Author URI: http://www.bolobd.com/plugins/responsive-gallery-lightbox/
Version: 1.0
*/


//Loading jQuery and CSS

function rs_responsive_gallery_scripts() {


	wp_enqueue_script('jquery');
	wp_enqueue_style('stylesheet', plugins_url( '/css/rs-responsive-gallery-lightbox.css' , __FILE__ ) );
	wp_enqueue_script('script', plugins_url( '/js/rs-responsive-gallery-lightbox.js' , __FILE__ ) );
	
}

add_action( 'wp_enqueue_scripts', 'rs_responsive_gallery_scripts' );

if(!class_exists('RS Gallery')){
// Setup Contants
defined( 'VP_GALLERY_VERSION' ) or define( 'VP_GALLERY_VERSION', '2.0' );
defined( 'VP_GALLERY_URL' )     or define( 'VP_GALLERY_URL', plugin_dir_url( __FILE__ ) );
defined( 'VP_GALLERY_DIR' )     or define( 'VP_GALLERY_DIR', plugin_dir_path( __FILE__ ) );
defined( 'VP_GALLERY_FILE' )    or define( 'VP_GALLERY_FILE', __FILE__ );

// Load Languages
add_action('plugins_loaded', 'vp_pl_load_textdomain');

function vp_pl_load_textdomain()
{
	load_plugin_textdomain( 'vp_textdomain', false, dirname( plugin_basename( __FILE__ ) . '/framework/lang/' ) ); 
}

// Require Bootstrap
require_once 'framework/bootstrap.php';
}

// Registering Custom post
add_action( 'init', 'rs_responsive_gallery_custom_post' );
function rs_responsive_gallery_custom_post() {
	register_post_type( 'rs-gallery',
		array(
			'labels' => array(
				'name' => __( 'Gallery Items' ),
				'singular_name' => __( 'Gallery Item' ),
				'add_new_item' => __( 'Add New Gallery Item' )
			),
			'public' => true,
			'supports' => array('title'),
			'has_archive' => true,
			'rewrite' => array('slug' => 'rs-gallery'),
			'menu_icon' => '',
			'menu_position' => 20,
		)
	);
	
}

// Registering Custom post's category
function rs_responsive_gallery_post_taxonomy() {
	register_taxonomy(
		'rs_cat',  
		'rs-gallery',
		array(
			'hierarchical'          => true,
			'label'                         => 'Gallery Category',
			'query_var'             => true,
			'show_admin_column'             => true,
			'rewrite'                       => array(
				'slug'                  => 'gallery-category',
				'with_front'    => true
				)
			)
	);
}
add_action( 'init', 'rs_responsive_gallery_post_taxonomy');   

//Menu icon setup
require_once 'admin/metabox/icon.php';

//Loading Metaboxes
new VP_Metabox(array
(
			'id'          => 'meta',
			'types'       => array('rs-gallery'),
			'title'       => __('Gallery Data', 'vp_textdomain'),
			'priority'    => 'high',
			'template' => VP_GALLERY_DIR . '/admin/metabox/main.php'
));
new VP_Metabox(array
(
			'id'          => 'setting',
			'types'       => array('rs-gallery'),
			'title'       => __('Gallery Settings', 'vp_textdomain'),
			'priority'    => 'high',
			'template' => VP_GALLERY_DIR . '/admin/metabox/setting.php'
));




// Shortcode Function
add_shortcode('rsgallery', 'Rs_Gallery_Shortcode');
function Rs_Gallery_Shortcode($atts){
	extract( shortcode_atts( array(
	
		'category' => '',

		
	), $atts) );
	
	
	
	    $rsquery = new WP_Query(
        array('posts_per_page' => -1, 'post_type' => 'rs-gallery', 'rs_cat' => $category)
        );
		
		
		while($rsquery->have_posts()) : $rsquery->the_post();
			$id = get_the_ID();	
			
		$width = vp_metabox('setting.settings.0.width', false);	
		$height = vp_metabox('setting.settings.0.height', false);	
		$margin_right = vp_metabox('setting.settings.0.margin_right', false);	
		$margin_bottom = vp_metabox('setting.settings.0.margin_bottom', false);	
		$speed = vp_metabox('setting.settings.0.speed', false);	
		$caption = vp_metabox('setting.settings.0.caption', false);	
		$description = vp_metabox('setting.settings.0.description', false);	
		
		
		
		$output = '<script>
    	 jQuery(document).ready(function() {
			jQuery("#lightGallery_'.$id.'").lightGallery({
				mode:"fade",
				speed: 800,
				caption:'.$caption.',
				desc:'.$description.'
				});
			});
			</script>';
		
		
		$output .='<style>.gallery_img'.$id.' {
					width: 150px;
					height: 130px;
				}
				
						.gallery_img'.$id.' {
							padding: 0;
							position: relative;
						}

						.gallery_img'.$id.' {
							box-shadow: 0 0 0 0 #000 !important;
							transform: scale(1, 1);
							transition-duration: 250ms;
							transition-timing-function: ease-out;
						}
						.gallery_img'.$id.':hover {
							opacity: 0.7;
							overflow: hidden;
							transform: scale(1.15);
							transition-duration: 750ms;
							transition-timing-function: ease-out;
						}
						.gallery li {
							display: block;
							float: left;
							margin-bottom: 22px !important;
							margin-right: -6px !important;
							max-width: 100%;
						}
					</style>';
				
				
		$galleries = vp_metabox('meta.info', false);	
	
		$i = 0;
	
		$output .= '<ul id="lightGallery_'.$id.'" class="gallery">';

	

		foreach ($galleries as $gallery) {				
							
	
		$output .= '<li data-title="'.$gallery['title'].'" data-desc="'.$gallery['description'].'" data-src="'.$gallery['url'].'"> <a href="#"> <img class="gallery_img'.$id.'" src="'.$gallery['image'].'" /> </a> </li>';
	
	
		$i++;
	}
	
	endwhile;
    $output .= '</ul>';
	wp_reset_query();
	return $output;
}



//Tinymce Button Add

add_action('admin_head', 'rs_responsive_gallery_tc_button');

function rs_responsive_gallery_tc_button() {
    global $typenow;
    // check user permissions
    if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
   	return;
    }
    // verify the post type
    if( ! in_array( $typenow, array( 'post', 'page' ) ) )
        return;
	// check if WYSIWYG is enabled
	if ( get_user_option('rich_editing') == 'true') {
		add_filter("mce_external_plugins", "rs_responsive_gallery_tc_button_add_tinymce_plugin");
		add_filter('mce_buttons', 'rs_responsive_gallery_tc_button_add_tinymce_plugin_register_my_tc_button');
	}
}

function rs_responsive_gallery_tc_button_add_tinymce_plugin($plugin_array) {
   	$plugin_array ['rs_responsive_gallery_tc_button'] = plugins_url( '/admin/tinymce/button.js', __FILE__ );
   	return $plugin_array;
}


function rs_responsive_gallery_tc_button_add_tinymce_plugin_register_my_tc_button($buttons) {
   array_push($buttons, "rs_responsive_gallery_tc_button");
   return $buttons;
}

?>
<?php
/*
Plugin Name: Selfie
Plugin URI: https://github.com/imagentleman/selfie
Description: Apply the theme's css to the wysiwyg post editor.
Author: Imagentleman
Version: 1
*/

foreach( array('post.php', 'post-new.php') as $hook ) {
	add_action( "admin_head-$hook", array('Selfie', 'inject_id') );
}

add_action( 'admin_init', array('Selfie', 'tinymce_plugin') );

Class Selfie {
	static function inject_id() {
		global $post;
		$id = $post->ID;
		if ( $post->post_status == 'auto-draft' ) {
			$args = array( 'posts_per_page' => 1, 'orderby' => 'rand' );
			$rand_posts = get_posts( $args );
			if ( count($rand_posts) == 1 ) {
				$id = $rand_posts[0]->ID;
			}
		}
?>
		<script type='text/javascript'>
		var Selfie = {
		    'id': <?php echo $id; ?>,
		    'site_url': '<?php echo get_site_url(); ?>'
		};
		</script>
<?php
	}

	static function tinymce_plugin() {
		if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
			add_filter( 'mce_external_plugins', array('Selfie', 'selfie_script') );
		}
	}

	static function selfie_script() {
		$plugin_array['selfie'] = plugins_url( 'selfie.js', __FILE__ );
     	return $plugin_array;
	}
}

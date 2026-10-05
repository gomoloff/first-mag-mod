<?php

// Preview Check
function first_mag_is_preview() {
	$theme    	  = wp_get_theme();
	$theme_name   = $theme->get( 'TextDomain' );
	$active_theme = first_mag_get_raw_option( 'stylesheet' );
	// return apply_filters( 'first_mag_is_preview', ( $active_theme != strtolower( $theme_name ) && ! is_child_theme() ) ); 
	return apply_filters( 'first_mag_is_preview', ( $active_theme != strtolower( $theme_name ) ) );
}

// Get Raw Options
function first_mag_get_raw_option( $opt_name ) {
	$alloptions = wp_cache_get( 'alloptions', 'options' );
	$alloptions = maybe_unserialize( $alloptions );
	return isset( $alloptions[ $opt_name ] ) ? maybe_unserialize( $alloptions[ $opt_name ] ) : false;
}

// Random Images
function first_mag_get_preview_img_src( $i = 0 ) {
	// prevent infinite loop
	if ( 6 == $i ) {
		return '';
	}

	$path = get_template_directory() . '/img/demo/';

	// Build or re-build the global dem img array
	if ( ! isset( $GLOBALS['first_mag_preview_images'] ) || empty( $GLOBALS['first_mag_preview_images'] ) ) {
		$imgs       = array( 'image_1.jpg', 'image_2.jpg', 'image_3.jpg', 'image_4.jpg', 'image_5.jpg', 'image_6.jpg' );
		$candidates = array();

		foreach ( $imgs as $img ) {
			$candidates[] = $img;
		}
		$GLOBALS['first_mag_preview_images'] = $candidates;
	}
	$candidates = $GLOBALS['first_mag_preview_images'];
	// get a random image name
	$rand_key = array_rand( $candidates );
	$img_name = $candidates[ $rand_key ];

	// if file does not exists, reset the global and recursively call it again
	if ( ! file_exists( $path . $img_name ) ) {
		unset( $GLOBALS['first_mag_preview_images'] );
		$i++;
		return first_mag_get_preview_img_src( $i );
	}

	// unset all sizes of the img found and update the global
	$new_candidates = $candidates;
	foreach ( $candidates as $_key => $_img ) {
		if ( substr( $_img, 0, strlen( "{$img_name}" ) ) === "{$img_name}" ) {
			unset( $new_candidates[ $_key ] );
		}
	}
	$GLOBALS['first_mag_preview_images'] = $new_candidates;
	return get_template_directory_uri() . '/img/demo/' . $img_name;
}

// Featured Images
function first_mag_preview_thumbnail( $input ) {
	if ( empty( $input ) && first_mag_is_preview() ) {
		$placeholder = first_mag_get_preview_img_src();
		return '<img src="' . esc_url( $placeholder ) . '" class="attachment wp-post-image">';
	}
	return $input;
}
add_filter( 'post_thumbnail_html', 'first_mag_preview_thumbnail' );

// Widgets
function first_mag_preview_right_sidebar() {
	the_widget('WP_Widget_Search', 'title=' . esc_html__('Search', 'first-mag'), 'before_title=<h3 class="widget-title"><div class="title-text">&after_title=</div><div class="widget-line"></div></h3>&before_widget=<div class="widget widget_search">&after_widget=</div>');
	the_widget('WP_Widget_Recent_Posts', 'title=' . esc_html__('Recent Posts', 'first-mag'), 'before_title=<h3 class="widget-title"><div class="title-text">&after_title=</div><div class="widget-line"></div></h3>&before_widget=<div class="widget widget_recent_entries">&after_widget=</div>');
	the_widget('WP_Widget_Archives', 'title=' . esc_html__('Archives', 'first-mag'), 'before_title=<h3 class="widget-title"><div class="title-text">&after_title=</div><div class="widget-line"></div></h3>&before_widget=<div class="widget widget_archive">&after_widget=</div>');
	the_widget('WP_Widget_Categories', 'title=' . esc_html__('Categories', 'first-mag'), 'before_title=<h3 class="widget-title"><div class="title-text">&after_title=</div><div class="widget-line"></div></h3>&before_widget=<div class="widget widget_categories">&after_widget=</div>');
}
function first_mag_preview_top_sidebar() {
	the_widget('WP_Widget_Text', 'text=<img src="'. get_template_directory_uri() . '/img/demo/banner-728x90.jpg" class="attachment wp-post-image" >', 'before_title=<h3 class="widget-title">&after_title=</h3>&before_widget=<div class="widget text-center widget_text">&after_widget=</div>');
}
// Main Menu
function first_mag_preview_navigation(){
    $pages = get_pages();  
	$i = 0;
	foreach ( $pages as $page ) {
		if(++$i > 6) break;
		$menu_name = esc_html($page->post_title);
		$menu_link = get_page_link( $page->ID );

		if ( get_the_ID() == $page->ID ) {
			$current_class = "current_page_item current-menu-item";
		} else {
			$current_class = '';
		}

		$menu_class = "page-item-" . $page->ID;
		echo "<li class='page_item ". esc_attr($menu_class) ." $current_class'><a href='". esc_url($menu_link) ."'>". esc_html($menu_name) ."</a></li>";
	}
}

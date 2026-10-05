<?php
/**
 * First Mag - 2026 Light Cyber & Space IT WordPress Theme
 * Autonomous Zero-CDN architecture, modern hook system, and widgetized layout.
 *
 * @package First_Mag
 */

// Include customizer and plugin activation modules if present
if ( file_exists( trailingslashit( get_template_directory() ) . 'lib/plugin-activation.php' ) ) {
	include_once( trailingslashit( get_template_directory() ) . 'lib/plugin-activation.php' );
}
if ( file_exists( trailingslashit( get_template_directory() ) . 'lib/theme-config.php' ) ) {
	include_once( trailingslashit( get_template_directory() ) . 'lib/theme-config.php' );
}
if ( file_exists( trailingslashit( get_template_directory() ) . 'lib/include-kirki.php' ) ) {
	include_once( trailingslashit( get_template_directory() ) . 'lib/include-kirki.php' );
}
if ( file_exists( trailingslashit( get_template_directory() ) . 'lib/customize-pro/class-customize.php' ) ) {
	require_once( trailingslashit( get_template_directory() ) . 'lib/customize-pro/class-customize.php' );
}

add_action( 'after_setup_theme', 'first_mag_setup' );

if ( ! function_exists( 'first_mag_setup' ) ) :

	function first_mag_setup() {
		// Translation support
		load_theme_textdomain( 'first-mag', get_template_directory() . '/languages' );

		// Title tag support
		add_theme_support( 'title-tag' );

		// Register Navigation Menus
		register_nav_menus(
			array(
				'main_menu' => __( 'Main Menu', 'first-mag' ),
			)
		);

		// Post Thumbnails & Image Dimensions
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 300, 300, true );
		add_image_size( 'first-mag-home', 394, 221, true );
		add_image_size( 'first-mag-home-small', 131, 98, true );
		add_image_size( 'first-mag-slider', 818, 430, true );
		add_image_size( 'first-mag-single', 1170, 400, true );

		// RSS Feed Links
		add_theme_support( 'automatic-feed-links' );

		// HTML5 markup support
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);
	}

endif;

/**
 * Enqueue Local Stylesheets (Zero-CDN Self-Contained)
 */
function first_mag_theme_stylesheets() {
	// Modern Flexbox Grid Layer
	wp_enqueue_style( 'bootstrap-css', get_template_directory_uri() . '/css/bootstrap.css', array(), '2.0.0', 'all' );

	// Core 2026 Light Space Theme Stylesheet
	wp_enqueue_style( 'first-mag-stylesheet', get_stylesheet_uri(), array( 'bootstrap-css' ), '2.0.0', 'all' );

	// Local Font Awesome Icons
	if ( file_exists( get_template_directory() . '/css/font-awesome.min.css' ) ) {
		wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/css/font-awesome.min.css', array(), '4.7.0' );
	}

	// FlexSlider CSS
	if ( file_exists( get_template_directory() . '/css/flexslider.css' ) ) {
		wp_enqueue_style( 'flexslider', get_template_directory_uri() . '/css/flexslider.css', array(), '2.0.0' );
	}
}
add_action( 'wp_enqueue_scripts', 'first_mag_theme_stylesheets' );

/**
 * Enqueue Local Scripts (Space Canvas, Bootstrap, Theme Scripts)
 */
function first_mag_theme_js() {
	// High-performance light cosmos canvas script (<3KB, no dependencies)
	wp_enqueue_script( 'space-canvas-js', get_template_directory_uri() . '/js/space-canvas.js', array(), '2.0.0', true );

	// Bootstrap UI script
	wp_enqueue_script( 'bootstrap-js', get_template_directory_uri() . '/js/bootstrap.min.js', array( 'jquery' ), '3.4.1', true );

	// FlexSlider script
	if ( file_exists( get_template_directory() . '/js/jquery.flexslider-min.js' ) ) {
		wp_enqueue_script( 'flexslider-js', get_template_directory_uri() . '/js/jquery.flexslider-min.js', array( 'jquery' ), '2.0.0', true );
	}

	// Custom theme interactions
	wp_enqueue_script( 'first-mag-theme-js', get_template_directory_uri() . '/js/customscript.js', array( 'jquery', 'space-canvas-js' ), '2.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'first_mag_theme_js' );

/**
 * Bootstrap Navwalker
 */
if ( file_exists( get_template_directory() . '/lib/wp_bootstrap_navwalker.php' ) ) {
	require_once( get_template_directory() . '/lib/wp_bootstrap_navwalker.php' );
}

/**
 * Register Sidebars (Preserving all hooks & IDs)
 */
function first_mag_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Front Page: Content Section', 'first-mag' ),
			'id'            => 'first-mag-front-page',
			'description'   => __( 'Content Section on Homepage', 'first-mag' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title"><span class="title-text">',
			'after_title'   => '</span></h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Right Sidebar', 'first-mag' ),
			'id'            => 'first-mag-right-sidebar',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title"><span class="title-text">',
			'after_title'   => '</span></h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Left Sidebar', 'first-mag' ),
			'id'            => 'first-mag-left-sidebar',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title"><span class="title-text">',
			'after_title'   => '</span></h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Header Section', 'first-mag' ),
			'id'            => 'first-mag-header-top-section',
			'description'   => __( 'Widgets in header section just above the main navigation menu.', 'first-mag' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Top Ad Section', 'first-mag' ),
			'id'            => 'first-mag-top-ad-section',
			'description'   => __( 'Shows widgets just below the main navigation menu. Fullwidth section.', 'first-mag' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);

	if ( class_exists( 'first_mag_featured_posts_widget' ) ) {
		register_widget( 'first_mag_featured_posts_widget' );
	}
	if ( class_exists( 'first_mag_featured_posts_widget_second' ) ) {
		register_widget( 'first_mag_featured_posts_widget_second' );
	}
	if ( class_exists( 'first_mag_fullwidth_posts_widget' ) ) {
		register_widget( 'first_mag_fullwidth_posts_widget' );
	}
}
add_action( 'widgets_init', 'first_mag_widgets_init' );

/**
 * Register Widgets File
 */
if ( file_exists( trailingslashit( get_template_directory() ) . 'lib/widgets.php' ) ) {
	require_once( trailingslashit( get_template_directory() ) . 'lib/widgets.php' );
}

/**
 * Register hook and action to set Main content area col-md- width based on sidebar declarations
 */
add_action( 'first_mag_main_content_width_hook', 'first_mag_main_content_width_columns' );

function first_mag_main_content_width_columns() {
	$columns = 12;

	if ( get_theme_mod( 'rigth-sidebar-check', 1 ) != 0 ) {
		$columns = $columns - absint( get_theme_mod( 'right-sidebar-size', 3 ) );
	}

	if ( get_theme_mod( 'left-sidebar-check', 0 ) != 0 ) {
		$columns = $columns - absint( get_theme_mod( 'left-sidebar-size', 3 ) );
	}

	echo esc_attr( $columns );
}

function first_mag_main_content_width() {
	do_action( 'first_mag_main_content_width_hook' );
}

/**
 * Set Content Width
 */
function first_mag_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'first_mag_content_width', 820 );
}
add_action( 'after_setup_theme', 'first_mag_content_width', 0 );

/**
 * Breadcrumbs
 */
if ( ! function_exists( 'first_mag_breadcrumb' ) ) :

	function first_mag_breadcrumb() {
		global $post, $wp_query;
		$home      = esc_html__( 'Главная', 'first-mag' );
		$delimiter = ' <span class="crumb-separator">&raquo;</span> ';
		$homeLink  = home_url();

		if ( is_home() || is_front_page() ) {
			// No breadcrumbs on frontpage
			return;
		}

		echo '<nav id="breadcrumbs" aria-label="' . esc_attr__( 'Хлебные крошки', 'first-mag' ) . '">';
		echo '<div class="breadcrumbs-inner text-left">';
		echo '<span><a href="' . esc_url( $homeLink ) . '"><i class="fa fa-home"></i> <span>' . esc_html( $home ) . '</span></a></span>' . $delimiter . ' ';

		if ( 'page' === get_option( 'show_on_front' ) && get_option( 'page_for_posts' ) ) {
			echo '<span><a href="' . esc_url( get_permalink( get_option( 'page_for_posts' ) ) ) . '"><span>' . esc_html__( 'Блог', 'first-mag' ) . '</span></a></span>' . $delimiter . ' ';
		}

		if ( is_category() ) {
			$thisCat = get_category( get_query_var( 'cat' ), false );
			if ( $thisCat && $thisCat->parent != 0 ) {
				$category_link = get_category_link( $thisCat->parent );
				echo '<span><a href="' . esc_url( $category_link ) . '"><span>' . esc_html( get_cat_name( $thisCat->parent ) ) . '</span></a></span>' . $delimiter . ' ';
			}

			$category_id   = get_cat_ID( single_cat_title( '', false ) );
			$category_link = get_category_link( $category_id );
			echo '<span class="current-crumb"><span>' . esc_html( single_cat_title( '', false ) ) . '</span></span>';
		} elseif ( is_single() && ! is_attachment() ) {
			if ( get_post_type() !== 'post' ) {
				$post_type = get_post_type_object( get_post_type() );
				$link      = get_post_type_archive_link( get_post_type() );
				if ( $link ) {
					printf( '<span><a href="%s">%s</a></span>', esc_url( $link ), esc_html( $post_type->labels->name ) );
					echo ' ' . $delimiter . ' ';
				}
				echo '<span class="current-crumb">' . esc_html( get_the_title() ) . '</span>';
			} else {
				$categories = get_the_category();
				if ( $categories ) {
					$cat = $categories[0];
					echo '<span><a href="' . esc_url( get_category_link( $cat->term_id ) ) . '"><span>' . esc_html( $cat->name ) . '</span></a></span>' . $delimiter . ' ';
				}
				echo '<span class="current-crumb">' . esc_html( get_the_title() ) . '</span>';
			}
		} elseif ( is_page() && ! $post->post_parent ) {
			echo '<span class="current-crumb"><span>' . esc_html( get_the_title() ) . '</span></span>';
		} elseif ( is_page() && $post->post_parent ) {
			$parent_id   = $post->post_parent;
			$breadcrumbs = array();
			while ( $parent_id ) {
				$page          = get_post( $parent_id );
				$breadcrumbs[] = '<span><a href="' . esc_url( get_permalink( $page->ID ) ) . '"><span>' . esc_html( get_the_title( $page->ID ) ) . '</span></a></span>';
				$parent_id     = $page->post_parent;
			}
			$breadcrumbs = array_reverse( $breadcrumbs );
			foreach ( $breadcrumbs as $crumb ) {
				echo $crumb . ' ' . $delimiter . ' ';
			}
			echo '<span class="current-crumb"><span>' . esc_html( get_the_title() ) . '</span></span>';
		} elseif ( is_tag() ) {
			echo '<span class="current-crumb"><span>' . esc_html( single_tag_title( '', false ) ) . '</span></span>';
		} elseif ( is_author() ) {
			global $author;
			$userdata = get_userdata( $author );
			echo '<span class="current-crumb"><span>' . esc_html( $userdata ? $userdata->display_name : '' ) . '</span></span>';
		} elseif ( is_search() ) {
			echo '<span class="current-crumb">' . esc_html__( 'Результаты поиска для', 'first-mag' ) . ' "' . esc_html( get_search_query() ) . '"</span>';
		} elseif ( is_404() ) {
			echo '<span class="current-crumb">' . esc_html__( 'Ошибка 404', 'first-mag' ) . '</span>';
		}

		echo '</div></nav>';
	}

endif;

/**
 * Theme Info page
 */
if ( is_admin() && file_exists( trailingslashit( get_template_directory() ) . 'lib/theme-info.php' ) ) {
	require_once( trailingslashit( get_template_directory() ) . 'lib/theme-info.php' );
}

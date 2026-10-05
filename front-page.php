<?php
/**
 * Modern Front Page Template
 * Semantic HTML5, Flexbox Grid, and Space Portal Layout
 * Preserves Shortcodes Ultimate [su_posts] and all sidebar hooks
 *
 * @package First_Mag
 */

get_header();

get_template_part( 'template-part', 'head' );

get_template_part( 'template-part', 'topnav' );

// Featured Carousel/Slider Section
if ( get_theme_mod( 'responsive-magazine-featured-categories', '' ) != '' && get_theme_mod( 'responsive-magazine-get-featured', '0' ) == '1' ) :
	get_template_part( 'template-part', 'slider' );
endif;
?>

<!-- start content container front-page.php -->
<div class="row rsrc-content">

	<?php get_sidebar( 'left' ); ?>

	<main id="primary" class="col-md-<?php first_mag_main_content_width(); ?> rsrc-main" role="main">
		
		<?php if ( is_active_sidebar( 'first-mag-front-page' ) ) : ?>
			<div class="front-page-widgets">
				<?php dynamic_sidebar( 'first-mag-front-page' ); ?>
			</div>
		<?php endif; ?>

		<div class="front-page-content">
			<?php
			if ( is_search() ) :
				if ( function_exists( 'first_mag_breadcrumb' ) && get_theme_mod( 'breadcrumbs-check', 1 ) != 0 ) {
					first_mag_breadcrumb();
				}
				$total_results = $wp_query->found_posts;
				echo '<h2 class="text-center search-results-title">' . sprintf( esc_html__( '%1$s Результаты поиска для "%2$s"', 'first-mag' ), esc_html( $total_results ), esc_html( get_search_query() ) ) . '</h2>';

				if ( $total_results == 0 ) :
					get_search_form( true );
				endif;
			endif;
			?>

			<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'content', get_post_format() ); ?>
				<?php endwhile; ?>
				<div class="footer-pagination">
					<?php the_posts_pagination(); ?>
				</div>
			<?php else : ?>
				<?php get_template_part( 'content', 'none' ); ?>
			<?php endif; ?>
		</div>

		<!-- Shortcodes Ultimate module section -->
		<div class="row su-custom-posts-row">
			<div class="col-md-12">
				<?php echo do_shortcode( '[su_posts template="templates/teaser-loop_mod.php" posts_per_page="4" post_type="page" taxonomy="post_tag" tax_operator="NOT IN" order="desc"]' ); ?>
			</div>
		</div>
	</main>

	<?php get_sidebar( 'right' ); ?>

</div>
<!-- end content container -->

<?php get_footer(); ?>

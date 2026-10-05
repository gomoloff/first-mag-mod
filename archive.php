<?php
/**
 * Modern Archive Template
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
get_header();

get_template_part( 'template-part', 'head' );

get_template_part( 'template-part', 'topnav' );
?>

<div class="row rsrc-content">
	<?php get_sidebar( 'left' ); ?>

	<main id="primary" class="col-md-<?php first_mag_main_content_width(); ?> rsrc-main" role="main">
		<?php if ( function_exists( 'first_mag_breadcrumb' ) && get_theme_mod( 'breadcrumbs-check', 1 ) != 0 ) : ?>
			<?php first_mag_breadcrumb(); ?>
		<?php endif; ?>

		<div class="archive-header text-center">
			<h1 class="page-title">
				<?php the_archive_title(); ?>
			</h1>
			<?php the_archive_description( '<div class="taxonomy-description">', '</div>' ); ?>
		</div>

		<?php if ( have_posts() ) : ?>
			<div class="front-page-content row">
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'content', get_post_format() ); ?>
				<?php endwhile; ?>
			</div>

			<div class="footer-pagination">
				<?php the_posts_pagination(); ?>
			</div>
		<?php else : ?>
			<?php get_template_part( 'content', 'none' ); ?>
		<?php endif; ?>
	</main>

	<?php get_sidebar( 'right' ); ?>
</div>

<?php get_footer(); ?>

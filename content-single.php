<?php
/**
 * Modern Single Article Layout
 * 2026 Light Cyber Space Edition
 * Strict reading width constraint (780-840px) inside .entry-content
 *
 * @package First_Mag
 */
?>
<div class="row rsrc-content">
	<?php get_sidebar( 'left' ); ?>

	<main id="primary" class="col-md-<?php first_mag_main_content_width(); ?> rsrc-main" role="main">
		<?php if ( function_exists( 'first_mag_breadcrumb' ) && get_theme_mod( 'breadcrumbs-check', 1 ) != 0 ) : ?>
			<?php first_mag_breadcrumb(); ?>
		<?php endif; ?>

		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( 'rsrc-post-content' ); ?>>
				
				<?php if ( has_post_thumbnail() ) : ?>
					<div class="single-thumbnail">
						<?php the_post_thumbnail( 'first-mag-single' ); ?>
					</div>
				<?php endif; ?>

				<header class="single-entry-header text-center">
					<h1 class="entry-title page-header">
						<?php the_title(); ?>
					</h1>
					<?php get_template_part( 'template-part', 'postmeta' ); ?>
				</header>

				<!-- Strictly Constrained Reading Width for Maximum Eye Comfort -->
				<div class="entry-content">
					<?php the_content(); ?>
				</div>

				<?php
				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Страницы:', 'first-mag' ),
						'after'  => '</div>',
					)
				);
				?>

				<?php get_template_part( 'template-part', 'posttags' ); ?>

				<?php if ( get_theme_mod( 'post-nav-check', 1 ) == 1 ) : ?>
					<nav class="post-navigation" aria-label="<?php esc_attr_e( 'Навигация по записям', 'first-mag' ); ?>">
						<div class="post-previous">
							<?php previous_post_link( '%link', '<span class="meta-nav">' . esc_html__( 'Предыдущий материал', 'first-mag' ) . '</span> <span class="nav-title">%title</span>' ); ?>
						</div>
						<div class="post-next text-right">
							<?php next_post_link( '%link', '<span class="meta-nav">' . esc_html__( 'Следующий материал', 'first-mag' ) . '</span> <span class="nav-title">%title</span>' ); ?>
						</div>
					</nav>
				<?php endif; ?>

				<?php if ( get_theme_mod( 'author-check', 1 ) == 1 ) : ?>
					<?php get_template_part( 'template-part', 'postauthor' ); ?>
				<?php endif; ?>

				<?php if ( get_theme_mod( 'related-posts-check', 1 ) == 1 ) : ?>
					<?php get_template_part( 'template-part', 'related' ); ?>
				<?php endif; ?>

				<?php comments_template(); ?>
			</article>
		<?php endwhile; else : ?>
			<?php get_template_part( 'content', 'none' ); ?>
		<?php endif; ?>
	</main>

	<?php get_sidebar( 'right' ); ?>
</div>

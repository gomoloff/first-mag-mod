<?php
/**
 * Modern Magazine Article Card
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'rsrc-archive col-md-6 col-sm-6' ); ?>>
	<div class="card-inner">
		<?php if ( has_post_thumbnail() ) : ?>
			<div class="featured-thumbnail">
				<a href="<?php the_permalink(); ?>" rel="bookmark" aria-hidden="true" tabindex="-1">
					<?php the_post_thumbnail( 'first-mag-home' ); ?>
					<?php if ( function_exists( 'wp_review_show_total' ) ) wp_review_show_total(); ?>
				</a>
			</div>
		<?php endif; ?>

		<div class="home-header">
			<header>
				<h2 class="page-header">
					<a href="<?php the_permalink(); ?>" rel="bookmark">
						<?php the_title(); ?>
					</a>
				</h2>
				<?php get_template_part( 'template-part', 'postmeta' ); ?>
			</header>

			<div class="entry-summary">
				<?php
				$content = get_the_content();
				echo esc_html( wp_trim_words( strip_shortcodes( $content ), 20, '...' ) );
				?>
			</div>
		</div>
	</div>
</article>

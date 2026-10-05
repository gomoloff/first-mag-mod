<?php
/**
 * Modern Hero Slider / Showcase Template Part
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
$slider_category = get_theme_mod( 'featured-categories' );
$slider_args     = array(
	'posts_per_page'      => 5,
	'post_type'           => 'post',
	'ignore_sticky_posts' => 1,
);
if ( ! empty( $slider_category ) ) {
	$slider_args['category__in'] = $slider_category;
}

$slider_query = new WP_Query( $slider_args );

if ( $slider_query->have_posts() ) :
	?>
	<section id="slider" class="flexslider slider-loading" aria-label="<?php esc_attr_e( 'Главные космические новости', 'first-mag' ); ?>">
		<ul class="slides">
			<?php
			while ( $slider_query->have_posts() ) :
				$slider_query->the_post();
				?>
				<li>
					<div class="flex-img">
						<a href="<?php the_permalink(); ?>" tabindex="-1">
							<?php if ( has_post_thumbnail() ) : ?>
								<div class="featured-thumbnail">
									<?php the_post_thumbnail( 'first-mag-slider' ); ?>
								</div>
							<?php else : ?>
								<div class="featured-thumbnail">
									<img src="<?php echo esc_url( get_template_directory_uri() . '/img/noprew-slider.jpg' ); ?>" alt="<?php the_title_attribute(); ?>">
								</div>
							<?php endif; ?>
						</a>
					</div>
					<div class="flex-caption">
						<div class="flex-title home-header">
							<header>
								<h2 class="page-header">
									<a href="<?php the_permalink(); ?>" rel="bookmark">
										<?php the_title(); ?>
									</a>
								</h2>
							</header>
							<div class="entry-summary hidden-xs">
								<?php echo esc_html( wp_trim_words( strip_shortcodes( get_the_content() ), 18, '...' ) ); ?>
							</div>
						</div>
					</div>
				</li>
			<?php endwhile; ?>
		</ul>
	</section>
	<?php
	wp_reset_postdata();
endif;

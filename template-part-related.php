<?php
/**
 * Modern Related Posts Template Part
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
$tags = wp_get_post_tags( $post->ID );
if ( $tags ) {
	$tag_ids = array();
	foreach ( $tags as $individual_tag ) {
		$tag_ids[] = $individual_tag->term_id;
	}
	$args = array(
		'tag__in'             => $tag_ids,
		'post__not_in'        => array( $post->ID ),
		'posts_per_page'      => 2,
		'ignore_sticky_posts' => 1,
	);
	$related_query = new WP_Query( $args );
	if ( $related_query->have_posts() ) {
		?>
		<section class="related-posts" aria-label="<?php esc_attr_e( 'Похожие материалы', 'first-mag' ); ?>">
			<div class="related-posts-title">
				<h3><?php esc_html_e( 'Связанные материалы и исследования', 'first-mag' ); ?></h3>
			</div>
			<ul class="row">
				<?php
				while ( $related_query->have_posts() ) {
					$related_query->the_post();
					?>
					<li class="rpost col-sm-6 col-xs-12">
						<div class="card-inner">
							<?php if ( has_post_thumbnail() ) : ?>
								<div class="featured-thumbnail">
									<a href="<?php the_permalink(); ?>" rel="bookmark" tabindex="-1">
										<?php the_post_thumbnail( 'first-mag-home' ); ?>
									</a>
								</div>
							<?php endif; ?>
							<div class="home-header">
								<h4 class="page-header">
									<a href="<?php the_permalink(); ?>" rel="bookmark">
										<?php the_title(); ?>
									</a>
								</h4>
								<div class="entry-summary">
									<?php echo esc_html( wp_trim_words( strip_shortcodes( get_the_content() ), 14, '...' ) ); ?>
								</div>
							</div>
						</div>
					</li>
					<?php
				}
				?>
			</ul>
		</section>
		<?php
	}
	wp_reset_postdata();
}

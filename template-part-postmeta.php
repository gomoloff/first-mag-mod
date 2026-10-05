<?php
/**
 * Modern Post Metadata Template Part
 * Zero-Pill Architecture: Unboxed text with subtle typographic separators
 *
 * @package First_Mag
 */
?>
<div class="post-meta">
	<span class="meta-date">
		<i class="fa fa-clock-o" aria-hidden="true"></i>
		<time class="posted-on published" datetime="<?php the_time( 'Y-m-d' ); ?>"><?php the_time( get_option( 'date_format' ) ); ?></time>
	</span>

	<span class="meta-author">
		<i class="fa fa-user-o" aria-hidden="true"></i>
		<span class="author-link"><?php the_author_posts_link(); ?></span>
	</span>

	<?php if ( comments_open() || get_comments_number() ) : ?>
		<span class="meta-comments">
			<i class="fa fa-comment-o" aria-hidden="true"></i>
			<span class="comments-count">
				<?php comments_popup_link( esc_html__( '0', 'first-mag' ), esc_html__( '1', 'first-mag' ), esc_html__( '%', 'first-mag' ), 'comments-link', esc_html__( 'Закрыто', 'first-mag' ) ); ?>
			</span>
		</span>
	<?php endif; ?>

	<?php
	$categories = get_the_category();
	if ( $categories ) :
		?>
		<span class="meta-cat">
			<i class="fa fa-folder-o" aria-hidden="true"></i>
			<?php
			$cat_links = array();
			foreach ( $categories as $cat ) {
				$cat_links[] = '<a href="' . esc_url( get_category_link( $cat->term_id ) ) . '">' . esc_html( $cat->name ) . '</a>';
			}
			echo implode( ', ', $cat_links );
			?>
		</span>
	<?php endif; ?>

	<?php edit_post_link( esc_html__( 'Правка', 'first-mag' ), '<span class="meta-edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> ', '</span>' ); ?>
</div>

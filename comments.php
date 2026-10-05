<?php
/**
 * Modern Comments Template
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
if ( post_password_required() ) {
	return;
}
?>
<section id="comments" class="rsrc-comments" aria-label="<?php esc_attr_e( 'Комментарии и обсуждение', 'first-mag' ); ?>">
	<?php if ( have_comments() ) : ?>
		<h4 class="comments-title">
			<?php
			$comments_number = get_comments_number();
			if ( '1' === $comments_number ) {
				esc_html_e( '1 комментарий к записи', 'first-mag' );
			} else {
				printf(
					/* translators: 1: number of comments */
					esc_html( _nx( '%1$s комментарий', '%1$s комментариев', $comments_number, 'comments title', 'first-mag' ) ),
					number_format_i18n( $comments_number )
				);
			}
			?>
		</h4>

		<ol class="commentlist list-unstyled">
			<?php
			wp_list_comments(
				array(
					'style'       => 'ol',
					'short_ping'  => true,
					'avatar_size' => 48,
				)
			);
			?>
		</ol>

		<?php paginate_comments_links(); ?>
	<?php endif; ?>

	<?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
		<p class="no-comments"><?php esc_html_e( 'Обсуждение этой записи закрыто.', 'first-mag' ); ?></p>
	<?php endif; ?>

	<?php if ( comments_open() ) : ?>
		<div class="well comment-respond-box">
			<?php comment_form(); ?>
		</div>
	<?php endif; ?>
</section>

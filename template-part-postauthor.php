<?php
/**
 * Modern Post Author Card
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
?>
<section class="postauthor-container" aria-label="<?php esc_attr_e( 'Об авторе', 'first-mag' ); ?>">
	<div class="postauthor-title">
		<h4><?php esc_html_e( 'Автор публикации', 'first-mag' ); ?></h4>
	</div>
	<div class="postauthor-content">
		<?php echo get_avatar( get_the_author_meta( 'ID' ), 72, '', esc_attr( get_the_author() ), array( 'class' => 'img-circle' ) ); ?>
		<div class="author-details">
			<h5 class="vcard fn">
				<?php the_author_posts_link(); ?>
			</h5>
			<p>
				<?php
				$author_bio = get_the_author_meta( 'description' );
				echo $author_bio ? esc_html( $author_bio ) : esc_html__( 'Инженер, космический обозреватель и автор аналитических материалов на First Mag.', 'first-mag' );
				?>
			</p>
		</div>
	</div>
</section>

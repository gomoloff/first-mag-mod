<?php
/**
 * Modern Post Tags Template Part
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
if ( has_tag() ) :
	?>
	<div class="post-tags" aria-label="<?php esc_attr_e( 'Теги записи', 'first-mag' ); ?>">
		<i class="fa fa-tags" aria-hidden="true"></i>
		<span><?php the_tags( '', ' ', '' ); ?></span>
	</div>
<?php endif; ?>

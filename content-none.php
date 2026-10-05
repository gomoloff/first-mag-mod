<?php
/**
 * Modern Content None Template Part
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
?>
<div class="error-template text-center" style="padding: 48px 20px;">
	<h2 class="page-header"><?php esc_html_e( 'Сигналов не обнаружено', 'first-mag' ); ?></h2>
	
	<?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>
		<p><?php printf( wp_kses( __( 'Готовы опубликовать первую космическую статью? <a href="%1$s">Начать здесь</a>.', 'first-mag' ), array( 'a' => array( 'href' => array() ) ) ), esc_url( admin_url( 'post-new.php' ) ) ); ?></p>
	<?php elseif ( is_search() ) : ?>
		<p style="color: var(--text-muted); max-width: 540px; margin: 0 auto 20px;"><?php esc_html_e( 'По вашему поисковому запросу ничего не найдено в архивах миссий. Попробуйте скорректировать запрос:', 'first-mag' ); ?></p>
		<div style="max-width: 480px; margin: 0 auto;">
			<?php get_search_form(); ?>
		</div>
	<?php else : ?>
		<p style="color: var(--text-muted); max-width: 540px; margin: 0 auto 20px;"><?php esc_html_e( 'Запрошенный контент перемещён или ещё не опубликован.', 'first-mag' ); ?></p>
		<div style="max-width: 480px; margin: 0 auto;">
			<?php get_search_form(); ?>
		</div>
	<?php endif; ?>
</div>

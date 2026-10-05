<?php
/**
 * Modern 404 Error Page Template
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
		<div class="rsrc-post-content text-center py-5">
			<div class="error-404-glitch mb-4">
				<h1 style="font-size: 5rem; font-weight: 900; letter-spacing: -0.05em; color: var(--accent-primary); margin: 0;">404</h1>
				<p class="site-desc" style="margin-top: 0; font-size: 1rem;"><?php esc_html_e( 'КООРДИНАТЫ НЕ НАЙДЕНЫ // ORBIT DISCONNECTED', 'first-mag' ); ?></p>
			</div>
			
			<h2 class="page-header" style="max-width: 600px; margin-left: auto; margin-right: auto;">
				<?php esc_html_e( 'Запрашиваемый космический модуль или страница не найдены в базе данных.', 'first-mag' ); ?>
			</h2>

			<div style="max-width: 500px; margin: 24px auto;">
				<?php get_search_form(); ?>
			</div>

			<div style="margin-top: 32px;">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
					<i class="fa fa-home" aria-hidden="true" style="margin-right: 8px;"></i>
					<?php esc_html_e( 'Вернуться на главную станцию', 'first-mag' ); ?>
				</a>
			</div>
		</div>
	</main>

	<?php get_sidebar( 'right' ); ?>
</div>

<?php get_footer(); ?>

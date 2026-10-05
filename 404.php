<?php get_header(); ?>

<?php get_template_part( 'template-part', 'head' ); ?>

<?php get_template_part( 'template-part', 'topnav' ); ?>

<!-- start content container -->
<div class="row rsrc-content">

	<?php //left sidebar ?>
	<?php get_sidebar( 'left' ); ?>

	<div class="col-md-<?php first_mag_main_content_width(); ?> rsrc-main">
		<div class="rsrc-post-content mb-4">
            <h2><?php esc_html_e( 'Извините, но такой страницы не найдено!', 'first-mag' ); ?></h2>
			<div class="text-center">
				<video width="840" controls autoplay muted loop playsinline>
					<source src="http://php-web.info/wp-content/uploads/2026/03/404.mp4" type="video/mp4">
					Ваш браузер не поддерживает видео.
				</video>
			</div>

		</div>
        <div class="text-center mt-4">
            <a href="<?php echo home_url(); ?>" class="btn btn-block btn-primary">Вернуться на главную</a>
        </div>
	</div>

	<?php //get the right sidebar ?>
	<?php get_sidebar( 'right' ); ?>

</div>
<!-- end content container -->

<?php get_footer(); ?>
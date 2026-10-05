<?php
/**
 * Modern Navigation Bar Template Part
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */
?>
<div class="row rsrc-top-menu">
	<nav id="site-navigation" class="navbar" role="navigation" aria-label="<?php esc_attr_e( 'Главное меню', 'first-mag' ); ?>">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-1-collapse" aria-expanded="false" aria-label="<?php esc_attr_e( 'Переключить меню', 'first-mag' ); ?>">
				<span class="sr-only"><?php esc_html_e( 'Меню', 'first-mag' ); ?></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>

			<?php if ( get_theme_mod( 'get-home-icon', 1 ) == 1 ) : ?>
				<div class="<?php echo is_front_page() ? 'home-icon front_page_on' : 'home-icon'; ?>">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">
						<i class="fa fa-home" aria-hidden="true"></i>
						<span class="sr-only"><?php esc_html_e( 'Главная', 'first-mag' ); ?></span>
					</a>
				</div>
			<?php endif; ?>
		</div>

		<?php
		if ( has_nav_menu( 'main_menu' ) ) {
			wp_nav_menu(
				array(
					'theme_location' => 'main_menu',
					'depth'          => 4,
					'container'      => 'div',
					'container_class'=> 'collapse navbar-collapse navbar-1-collapse',
					'menu_class'     => 'nav navbar-nav',
					'fallback_cb'    => class_exists( 'wp_bootstrap_navwalker' ) ? 'wp_bootstrap_navwalker::fallback' : 'wp_page_menu',
					'walker'         => class_exists( 'wp_bootstrap_navwalker' ) ? new wp_bootstrap_navwalker() : '',
				)
			);
		} else {
			?>
			<div class="collapse navbar-collapse navbar-1-collapse">
				<ul class="nav navbar-nav">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'СТАТЬИ', 'first-mag' ); ?></a></li>
					<li><a href="#contacts"><?php esc_html_e( 'КОНТАКТЫ', 'first-mag' ); ?></a></li>
					<li><a href="#gallery"><?php esc_html_e( 'ГАЛЕРЕЯ', 'first-mag' ); ?></a></li>
					<li><a href="#art"><?php esc_html_e( 'ИСКУССТВО', 'first-mag' ); ?></a></li>
					<li><a href="#profile"><?php esc_html_e( 'МОЙ ПРОФИЛЬ', 'first-mag' ); ?></a></li>
				</ul>
			</div>
			<?php
		}
		?>
	</nav>
</div>

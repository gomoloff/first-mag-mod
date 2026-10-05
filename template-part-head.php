<?php
/**
 * Clean Modern Header Template Part
 * Layout: Site Title & Description | QR-Code | Header Widget / Search
 *
 * @package First_Mag
 */
?>
<div class="container rsrc-container" role="main">
	<?php
	$heading_tag = ( is_front_page() || is_home() || is_404() ) ? 'h1' : 'h2';
	$desc_tag    = ( is_front_page() || is_home() || is_404() ) ? 'h2' : 'h3';
	?> 
	<header id="site-header" class="row rsrc-header" role="banner">
		<!-- Left: Site Title & Tagline -->
		<div class="rsrc-header-text col-md-4 col-sm-6 col-xs-12">
			<?php if ( get_theme_mod( 'header-logo', '' ) !== '' ) : ?>
				<div class="rsrc-header-img">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
						<img src="<?php echo esc_url( get_theme_mod( 'header-logo' ) ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" />
					</a>
				</div>
			<?php else : ?>
				<<?php echo esc_attr( $heading_tag ); ?> class="site-title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<?php bloginfo( 'name' ); ?>
					</a>
				</<?php echo esc_attr( $heading_tag ); ?>>
				<<?php echo esc_attr( $desc_tag ); ?> class="site-desc">
					<?php bloginfo( 'description' ); ?>
				</<?php echo esc_attr( $desc_tag ); ?>>
			<?php endif; ?>
		</div>

		<!-- Center: Header QR Code -->
		<div class="col-md-4 col-sm-6 hidden-xs text-left" style="overflow: hidden; padding-top: 10px; display: flex; align-items: center;">
			<div class="header-qrcode-wrap">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/img/qr-code.svg' ); ?>" width="90" height="90" alt="QR-код" style="border: 1px solid var(--border-tech); border-radius: var(--radius-sm); padding: 4px; background: #ffffff;">
			</div>
		</div>

		<!-- Right: Header Search / Top Section Widget -->
		<div class="header-ad col-md-4 col-xs-12">
			<?php if ( is_active_sidebar( 'first-mag-header-top-section' ) ) : ?>
				<div id="header-ad-section" class="clearfix">
					<?php dynamic_sidebar( 'first-mag-header-top-section' ); ?>
				</div>
			<?php else : ?>
				<div class="header-search-box">
					<div class="header-search-title"><?php esc_html_e( 'ПОИСКАТЬ', 'first-mag' ); ?></div>
					<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="header-search-form">
						<input type="text" name="s" class="form-control" placeholder="<?php esc_attr_e( 'Поиск...', 'first-mag' ); ?>">
						<button type="submit" class="btn btn-primary"><?php esc_html_e( 'Поиск', 'first-mag' ); ?></button>
					</form>
				</div>
			<?php endif; ?>
		</div>
	</header>

	<!-- Optional Top Ad Section Below Header -->
	<?php if ( is_active_sidebar( 'first-mag-top-ad-section' ) ) : ?>
		<div id="top-ad-banner" class="top-ad-section">
			<?php dynamic_sidebar( 'first-mag-top-ad-section' ); ?>
		</div>
	<?php endif; ?>

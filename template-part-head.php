<?php
/**
 * Modern Clean Flexbox Header Template Part
 * Refactored for 2026 Light Cyber & Space Aesthetic
 *
 * @package First_Mag
 */
?>
<div class="container rsrc-container" role="main">
	<?php
	$heading_tag = ( is_front_page() || is_home() || is_404() ) ? 'h1' : 'h2';
	$desc_tag    = ( is_front_page() || is_home() || is_404() ) ? 'h2' : 'h3';
	?> 
	<header id="site-header" class="rsrc-header" role="banner">
		<!-- Brand & Title Block -->
		<div class="rsrc-header-text">
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

		<!-- Live Telemetry Status Ribbon -->
		<div class="header-telemetry hidden-xs">
			<span class="telemetry-pulse" aria-hidden="true"></span>
			<span>CYBER // ORBITAL NETWORK</span>
		</div>

		<!-- Header Widget / Search / Ad Area -->
		<div class="header-ad">
			<?php if ( is_active_sidebar( 'first-mag-header-top-section' ) ) : ?>
				<div id="header-ad-section" class="clearfix">
					<?php dynamic_sidebar( 'first-mag-header-top-section' ); ?>
				</div>
			<?php endif; ?>
		</div>
	</header>

	<!-- Optional Fullwidth Top Ad Section Below Header -->
	<?php if ( is_active_sidebar( 'first-mag-top-ad-section' ) ) : ?>
		<div id="top-ad-banner" class="top-ad-section">
			<?php dynamic_sidebar( 'first-mag-top-ad-section' ); ?>
		</div>
	<?php endif; ?>

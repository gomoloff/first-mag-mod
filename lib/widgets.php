<?php
/**
 * First Mag Custom Widgets
 * 2026 Light Cyber Space Edition
 *
 * @package First_Mag
 */

/**
 * Featured Posts Category Widget 1 (1 Large + 4 Small posts)
 */
class first_mag_featured_posts_widget extends WP_Widget {

	function __construct() {
		$widget_ops  = array(
			'classname'   => 'widget_featured_posts first-mag-widget row',
			'description' => __( 'Display latest posts or posts of specific category. Only for Front Page: Content Section!', 'first-mag' ),
		);
		$control_ops = array( 'width' => 200, 'height' => 250 );
		parent::__construct( false, __( 'First Mag: Category Widget 1', 'first-mag' ), $widget_ops );
	}

	function form( $instance ) {
		$first_mag_defaults = array(
			'title'    => '',
			'text'     => '',
			'number'   => 5,
			'meta'     => 'off',
			'type'     => 'latest',
			'category' => '',
		);
		$instance           = wp_parse_args( (array) $instance, $first_mag_defaults );
		$title              = esc_attr( $instance['title'] );
		$text               = esc_textarea( $instance['text'] );
		$number             = absint( $instance['number'] );
		$type               = esc_attr( $instance['type'] );
		$category           = absint( $instance['category'] );
		$meta               = esc_attr( $instance['meta'] );
		?>
		<p><?php esc_html_e( 'Widget Layout: 1 Primary Feature + Grid Stream', 'first-mag' ); ?></p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Title:', 'first-mag' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'text' ) ); ?>"><?php esc_html_e( 'Description:', 'first-mag' ); ?></label>
			<textarea class="widefat" rows="4" cols="20" id="<?php echo esc_attr( $this->get_field_id( 'text' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'text' ) ); ?>"><?php echo esc_textarea( $text ); ?></textarea>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"><?php esc_html_e( 'Number of posts to display:', 'first-mag' ); ?></label>
			<input id="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'number' ) ); ?>" type="number" value="<?php echo esc_attr( $number ); ?>" size="3" min="1" max="12" />
		</p>
		<p>
			<label><?php esc_html_e( 'Post meta:', 'first-mag' ); ?></label><br />
			<label><input type="radio" <?php checked( $meta, 'on' ); ?> name="<?php echo esc_attr( $this->get_field_name( 'meta' ) ); ?>" value="on" /> <?php esc_html_e( 'Enable', 'first-mag' ); ?></label> &nbsp;
			<label><input type="radio" <?php checked( $meta, 'off' ); ?> name="<?php echo esc_attr( $this->get_field_name( 'meta' ) ); ?>" value="off" /> <?php esc_html_e( 'Disable', 'first-mag' ); ?></label>
		</p>
		<p>
			<label><input type="radio" <?php checked( $type, 'latest' ); ?> name="<?php echo esc_attr( $this->get_field_name( 'type' ) ); ?>" value="latest" /> <?php esc_html_e( 'Show latest Posts', 'first-mag' ); ?></label><br />
			<label><input type="radio" <?php checked( $type, 'category' ); ?> name="<?php echo esc_attr( $this->get_field_name( 'type' ) ); ?>" value="category" /> <?php esc_html_e( 'Show posts from a category:', 'first-mag' ); ?></label>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'category' ) ); ?>"><?php esc_html_e( 'Select category:', 'first-mag' ); ?></label>
			<?php wp_dropdown_categories( array( 'show_option_none' => ' ', 'name' => $this->get_field_name( 'category' ), 'selected' => $category ) ); ?>
		</p>
		<?php
	}

	function update( $new_instance, $old_instance ) {
		$instance             = $old_instance;
		$instance['title']    = sanitize_text_field( $new_instance['title'] );
		$instance['text']     = wp_strip_all_tags( $new_instance['text'] );
		$instance['number']   = absint( $new_instance['number'] );
		$instance['type']     = sanitize_key( $new_instance['type'] );
		$instance['category'] = absint( $new_instance['category'] );
		$instance['meta']     = sanitize_key( $new_instance['meta'] );
		return $instance;
	}

	function widget( $args, $instance ) {
		echo $args['before_widget'];

		$title    = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$text     = ! empty( $instance['text'] ) ? $instance['text'] : '';
		$number   = ! empty( $instance['number'] ) ? absint( $instance['number'] ) : 5;
		$type     = ! empty( $instance['type'] ) ? $instance['type'] : 'latest';
		$category = ! empty( $instance['category'] ) ? absint( $instance['category'] ) : '';
		$meta     = ! empty( $instance['meta'] ) ? $instance['meta'] : 'off';

		$cat_link = ( $category && 'latest' !== $type ) ? get_category_link( $category ) : get_permalink( get_option( 'page_for_posts' ) );

		$query_args = array(
			'posts_per_page'      => $number,
			'post_type'           => 'post',
			'ignore_sticky_posts' => 1,
		);
		if ( 'category' === $type && $category ) {
			$query_args['category__in'] = $category;
		}

		$get_posts = new WP_Query( $query_args );

		if ( ! empty( $title ) ) {
			echo $args['before_title'] . esc_html( $title ) . $args['after_title'];
		}
		if ( ! empty( $text ) ) {
			echo '<p class="col-md-12 widget-description">' . esc_html( $text ) . '</p>';
		}

		$i = 1;
		while ( $get_posts->have_posts() ) :
			$get_posts->the_post();

			if ( 1 === $i ) {
				echo '<div class="first-post col-md-6 col-sm-12">';
				$thumb = 'first-mag-home';
			} elseif ( 2 === $i ) {
				echo '<div class="small-post col-md-6 col-sm-12">';
				$thumb = 'first-mag-home-small';
			} else {
				$thumb = 'first-mag-home-small';
			}
			?>
			<article <?php post_class( 1 === $i ? 'primary-featured-card' : 'secondary-stream-card' ); ?>>
				<div class="card-inner">
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="featured-thumbnail">
							<a href="<?php the_permalink(); ?>" rel="bookmark" tabindex="-1">
								<?php the_post_thumbnail( $thumb ); ?>
							</a>
						</div>
					<?php endif; ?>
					<div class="home-header">
						<header>
							<h3 class="page-header">
								<a href="<?php the_permalink(); ?>" rel="bookmark">
									<?php the_title(); ?>
								</a>
							</h3>
							<?php if ( 'on' === $meta ) : ?>
								<?php get_template_part( 'template-part', 'postmeta' ); ?>
							<?php endif; ?>
						</header>
						<?php if ( 1 === $i ) : ?>
							<div class="entry-summary">
								<?php echo esc_html( wp_trim_words( strip_shortcodes( get_the_content() ), 24, '...' ) ); ?>
							</div>
						<?php endif; ?>
					</div>
				</div>
			</article>
			<?php
			if ( 1 === $i ) {
				echo '</div>'; // Close first-post
			}
			$i++;
		endwhile;

		if ( $i > 2 ) {
			echo '</div>'; // Close small-post
		}
		wp_reset_postdata();

		if ( 'category' === $type && $category ) {
			$cat_obj = get_category( $category );
			?>
			<div class="widget-footer col-md-12 text-center" style="margin-top: 18px;">
				<a class="btn btn-outline-primary outline" href="<?php echo esc_url( $cat_link ); ?>">
					<?php printf( esc_html__( 'Все материалы раздела (%s)', 'first-mag' ), esc_html( $cat_obj ? $cat_obj->category_count : '' ) ); ?>
				</a>
			</div>
			<?php
		}

		echo $args['after_widget'];
	}
}

/**
 * Featured Posts Category Widget 2 (Equal Grid Stream)
 */
class first_mag_featured_posts_widget_second extends WP_Widget {

	function __construct() {
		$widget_ops = array(
			'classname'   => 'widget_featured_posts_second first-mag-widget row',
			'description' => __( 'Display latest posts or posts of specific category. Only for Front Page: Content Section!', 'first-mag' ),
		);
		parent::__construct( false, __( 'First Mag: Category Widget 2', 'first-mag' ), $widget_ops );
	}

	function form( $instance ) {
		$defaults = array(
			'title'    => '',
			'text'     => '',
			'number'   => 4,
			'meta'     => 'off',
			'type'     => 'latest',
			'category' => '',
		);
		$instance = wp_parse_args( (array) $instance, $defaults );
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Title:', 'first-mag' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'category' ) ); ?>"><?php esc_html_e( 'Category:', 'first-mag' ); ?></label>
			<?php wp_dropdown_categories( array( 'show_option_none' => ' ', 'name' => $this->get_field_name( 'category' ), 'selected' => $instance['category'] ) ); ?>
		</p>
		<?php
	}

	function update( $new_instance, $old_instance ) {
		$instance             = $old_instance;
		$instance['title']    = sanitize_text_field( $new_instance['title'] );
		$instance['text']     = wp_strip_all_tags( $new_instance['text'] );
		$instance['number']   = absint( $new_instance['number'] );
		$instance['type']     = sanitize_key( $new_instance['type'] );
		$instance['category'] = absint( $new_instance['category'] );
		$instance['meta']     = sanitize_key( $new_instance['meta'] );
		return $instance;
	}

	function widget( $args, $instance ) {
		echo $args['before_widget'];
		$title    = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$number   = ! empty( $instance['number'] ) ? absint( $instance['number'] ) : 4;
		$category = ! empty( $instance['category'] ) ? absint( $instance['category'] ) : '';

		if ( ! empty( $title ) ) {
			echo $args['before_title'] . esc_html( $title ) . $args['after_title'];
		}

		$query_args = array(
			'posts_per_page'      => $number,
			'post_type'           => 'post',
			'ignore_sticky_posts' => 1,
		);
		if ( $category ) {
			$query_args['category__in'] = $category;
		}

		$get_posts = new WP_Query( $query_args );
		echo '<div class="row w-100">';
		while ( $get_posts->have_posts() ) :
			$get_posts->the_post();
			?>
			<div class="col-md-6 col-sm-6 col-xs-12 mb-3">
				<article <?php post_class( 'card-inner' ); ?>>
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="featured-thumbnail">
							<a href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail( 'first-mag-home' ); ?>
							</a>
						</div>
					<?php endif; ?>
					<div class="home-header">
						<h3 class="page-header">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</h3>
						<?php get_template_part( 'template-part', 'postmeta' ); ?>
					</div>
				</article>
			</div>
			<?php
		endwhile;
		echo '</div>';
		wp_reset_postdata();

		echo $args['after_widget'];
	}
}

/**
 * Featured FullWidth Post Widget
 */
class first_mag_fullwidth_posts_widget extends WP_Widget {

	function __construct() {
		$widget_ops = array(
			'classname'   => 'widget_fullwidth_posts first-mag-widget row',
			'description' => __( 'Display full-width featured post stream. Only for Front Page: Content Section!', 'first-mag' ),
		);
		parent::__construct( false, __( 'First Mag: FullWidth post widget', 'first-mag' ), $widget_ops );
	}

	function form( $instance ) {
		$defaults = array(
			'title'    => '',
			'text'     => '',
			'number'   => 3,
			'meta'     => 'on',
			'category' => '',
		);
		$instance = wp_parse_args( (array) $instance, $defaults );
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Title:', 'first-mag' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'category' ) ); ?>"><?php esc_html_e( 'Category:', 'first-mag' ); ?></label>
			<?php wp_dropdown_categories( array( 'show_option_none' => ' ', 'name' => $this->get_field_name( 'category' ), 'selected' => $instance['category'] ) ); ?>
		</p>
		<?php
	}

	function update( $new_instance, $old_instance ) {
		$instance             = $old_instance;
		$instance['title']    = sanitize_text_field( $new_instance['title'] );
		$instance['number']   = absint( $new_instance['number'] );
		$instance['category'] = absint( $new_instance['category'] );
		return $instance;
	}

	function widget( $args, $instance ) {
		echo $args['before_widget'];
		$title    = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$number   = ! empty( $instance['number'] ) ? absint( $instance['number'] ) : 3;
		$category = ! empty( $instance['category'] ) ? absint( $instance['category'] ) : '';

		if ( ! empty( $title ) ) {
			echo $args['before_title'] . esc_html( $title ) . $args['after_title'];
		}

		$query_args = array(
			'posts_per_page'      => $number,
			'post_type'           => 'post',
			'ignore_sticky_posts' => 1,
		);
		if ( $category ) {
			$query_args['category__in'] = $category;
		}

		$get_posts = new WP_Query( $query_args );
		while ( $get_posts->have_posts() ) :
			$get_posts->the_post();
			?>
			<div class="col-md-12 mb-4">
				<article <?php post_class( 'card-inner' ); ?>>
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="featured-thumbnail">
							<a href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail( 'first-mag-slider' ); ?>
							</a>
						</div>
					<?php endif; ?>
					<div class="home-header">
						<h3 class="page-header">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</h3>
						<?php get_template_part( 'template-part', 'postmeta' ); ?>
						<div class="entry-summary">
							<?php echo esc_html( wp_trim_words( strip_shortcodes( get_the_content() ), 30, '...' ) ); ?>
						</div>
					</div>
				</article>
			</div>
			<?php
		endwhile;
		wp_reset_postdata();

		echo $args['after_widget'];
	}
}

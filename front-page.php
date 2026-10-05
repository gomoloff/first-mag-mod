<?php get_header(); ?>

<?php get_template_part('template-part', 'head'); ?>

<?php get_template_part('template-part', 'topnav'); ?>

<?php //carousel section ?>
<?php if ( get_theme_mod( 'responsive-magazine-featured-categories', '' ) != '' && get_theme_mod( 'responsive-magazine-get-featured', '0' ) == '1' ) : ?>
  <?php get_template_part('template-part', 'slider'); ?>
<?php endif; ?>
<!-- start content container front-page.php responsive -->
<div class="row rsrc-content">

    <?php //left sidebar ?>
    <?php get_sidebar( 'left' ); ?>

    <div id="frontpage" class="col-md-<?php first_mag_main_content_width(); ?> rsrc-main">       
        <div class="front-page-content">
            <?php

                //if this was a search we display a page header with the results count. If there were no results we display the search form.
                if (is_search()) :
                    if ( function_exists( 'first_mag_breadcrumb' ) && get_theme_mod( 'breadcrumbs-check', 1 ) != 0 ) { first_mag_breadcrumb(); } 
                     $total_results = $wp_query->found_posts;
    
                     echo "<h2 class='text-center'>" . sprintf( __('%s Результаты поиска для "%s"', 'responsive-magazine'),  $total_results, get_search_query() ) . "</h2>";
    
                     if ($total_results == 0) :
                         get_search_form(true);
                     endif;
    
                endif;
            ?>
         
            <?php // theloop  
                if ( have_posts() ) : while ( have_posts() ) : the_post();?>

                   <?php
              				get_template_part( 'content', get_post_format() ); 
              			?>

                <?php endwhile; ?>
                  <div class="footer-pagination"><?php the_posts_pagination(); ?></div>
                <?php else: ?>

                    <?php get_404_template(); ?>

            <?php endif; ?>        	
		</div>  
        <div class="row">			
			<div class="col-md-12">				
				<?php echo do_shortcode('[su_posts template="templates/teaser-loop_mod.php" posts_per_page="4" post_type="page" taxonomy="post_tag" tax_operator="NOT IN" order="desc"]'); ?>				
			</div>
		   <!--?php dynamic_sidebar( 'custom' ); ?-->
	    </div>		
   </div>
   
   <?php //get the right sidebar ?>
   <?php get_sidebar( 'right' ); ?>

</div>
<!-- end content container -->

<?php get_footer(); ?>


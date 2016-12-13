<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */
?>

	</div><!-- #content -->

<?php /*
    <footer id="colophon" class="site-footer" role="contentinfo">
        <div class="site-info">
            <a href="<?php echo esc_url( __( 'https://wordpress.org/', 'swl' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'swl' ), 'WordPress' ); ?></a>
            <span class="sep"> | </span>
            <?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'swl' ), 'swl', '<a href="http://underscores.me/" rel="designer">AEG</a>' ); ?>
        </div><!-- .site-info -->
    </footer><!-- #colophon -->

*/?>
<div class="footer_copyright">
    &copy;&nbsp;Copyright 2004-<?php echo date('Y') ?>
</div>

</div><!-- #site -->

<?php wp_footer(); ?>

</body>
</html>

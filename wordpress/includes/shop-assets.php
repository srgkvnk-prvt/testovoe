<?php
/**
 * Shop assets.
 *
 * File: includes/shop-assets.php (require it from functions.php)
 * Adjust the style handle / path to your theme. WooCommerce default CSS is disabled:
 * the shop is fully styled by css/shop.css.
 */

defined('ABSPATH') || exit;

add_filter('woocommerce_enqueue_styles', '__return_empty_array');

add_action('wp_enqueue_scripts', function () {
    if (!function_exists('is_woocommerce')) {
        return;
    }

    if (is_woocommerce() || is_cart() || is_checkout() || is_account_page()) {
        $path = get_theme_file_path('assets/css/shop.css');

        wp_enqueue_style(
            'isg-shop',
            get_theme_file_uri('assets/css/shop.css'),
            ['isg-style'], // handle of css/style.css
            file_exists($path) ? filemtime($path) : null
        );
    }
});

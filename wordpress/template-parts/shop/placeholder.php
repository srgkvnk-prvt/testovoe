<?php
/**
 * Component: image placeholder (used when a product or category has no image).
 *
 * File: template-parts/shop/placeholder.php
 * Lives inside an element with the classes "placeholder squares".
 */

defined('ABSPATH') || exit;
?>
<span class="placeholder__body">
    <svg class="placeholder__icon" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6">
        <rect x="6" y="9" width="36" height="30" rx="4"/>
        <circle cx="17" cy="20" r="3.5"/>
        <path d="m6 34 11-10 8 7 6-5 11 9"/>
    </svg>
    <span class="placeholder__label"><?php esc_html_e('No image', 'isg'); ?></span>
</span>

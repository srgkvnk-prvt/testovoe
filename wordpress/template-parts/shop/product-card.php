<?php
/**
 * Component: product card in a loop.
 *
 * File: template-parts/shop/product-card.php
 *
 * Called from woocommerce/content-product.php with ['product' => $product].
 * BEM block: card (modifier card--product). Styles: css/style.css + css/shop.css.
 */

defined('ABSPATH') || exit;

$product = $args['product'] ?? null;

if (!$product instanceof WC_Product) {
    return;
}

$permalink = $product->get_permalink();
$title     = $product->get_name();
$has_price = '' !== $product->get_price();
$can_buy   = $has_price && $product->is_purchasable() && $product->is_in_stock();
$use_ajax  = $can_buy && $product->supports('ajax_add_to_cart');

// First real category (skip the default "Uncategorized").
$category_name = '';
$terms         = get_the_terms($product->get_id(), 'product_cat');

if ($terms && !is_wp_error($terms)) {
    foreach ($terms as $term) {
        if ((int) $term->term_id !== (int) get_option('default_product_cat')) {
            $category_name = $term->name;
            break;
        }
    }
}

// Button: add to cart when possible, otherwise a link to the product page.
$button_classes = 'btn btn--primary btn--sm card__action';
$button_classes .= $can_buy ? ' add_to_cart_button' : '';
$button_classes .= $use_ajax ? ' ajax_add_to_cart' : '';

if ($can_buy) {
    $button_url   = $product->add_to_cart_url();
    $button_text  = $product->add_to_cart_text();
    $button_label = $product->add_to_cart_description();
} else {
    $button_url   = $permalink;
    $button_text  = $has_price ? __('Read more', 'isg') : __('Request', 'isg');
    $button_label = $title;
}
?>
<li <?php wc_product_class('card card--product reveal', $product); ?>>

    <a class="card__media placeholder squares" href="<?php echo esc_url($permalink); ?>" data-squares="3" data-cell="28" aria-label="<?php echo esc_attr($title); ?>">

        <?php if ($product->get_image_id()) : ?>
            <?php echo $product->get_image('woocommerce_thumbnail', ['class' => 'card__img', 'loading' => 'lazy']); // WooCommerce output, already escaped. ?>
        <?php else : ?>
            <?php get_template_part('template-parts/shop/placeholder'); ?>
        <?php endif; ?>

        <?php if (!$product->is_in_stock()) : ?>
            <span class="card__badge card__badge--muted"><?php esc_html_e('Out of stock', 'isg'); ?></span>
        <?php elseif ($product->is_on_sale()) : ?>
            <span class="card__badge"><?php esc_html_e('Sale', 'isg'); ?></span>
        <?php endif; ?>

    </a>

    <div class="card__body">

        <?php if ($category_name) : ?>
            <span class="card__category"><?php echo esc_html($category_name); ?></span>
        <?php endif; ?>

        <h3 class="card__title">
            <a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a>
        </h3>

        <div class="card__footer">

            <?php if ($has_price) : ?>
                <span class="card__price"><?php echo wp_kses_post($product->get_price_html()); ?></span>
            <?php else : ?>
                <span class="card__price card__price--request"><?php esc_html_e('Price on request', 'isg'); ?></span>
            <?php endif; ?>

            <a class="<?php echo esc_attr($button_classes); ?>"
               href="<?php echo esc_url($button_url); ?>"
               data-product_id="<?php echo esc_attr($product->get_id()); ?>"
               data-product_sku="<?php echo esc_attr($product->get_sku()); ?>"
               data-quantity="1"
               aria-label="<?php echo esc_attr(wp_strip_all_tags($button_label)); ?>"
               rel="nofollow">
                <span class="btn__label"><?php echo esc_html($button_text); ?></span>
            </a>

        </div>
    </div>

</li>

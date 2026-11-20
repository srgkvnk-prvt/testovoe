<?php
/**
 * Component: category cards.
 *
 * File: template-parts/shop/category-cards.php
 *
 * Top-level product categories on /shop/, subcategories inside a category.
 * Outputs nothing when there is nothing to show (archive-product.php relies on that).
 * Polylang filters get_terms() by the current language automatically.
 */

defined('ABSPATH') || exit;

if (is_search() || is_product_tag()) {
    return;
}

$parent_id = is_product_category() ? get_queried_object_id() : 0;

$categories = get_terms([
    'taxonomy'   => 'product_cat',
    'parent'     => $parent_id,
    'hide_empty' => true,
    'exclude'    => [(int) get_option('default_product_cat')], // "Uncategorized"
    'orderby'    => 'menu_order',
]);

if (is_wp_error($categories) || empty($categories)) {
    return;
}
?>
<ul class="category-grid">
    <?php foreach ($categories as $category) : ?>
        <?php
        $thumbnail_id = (int) get_term_meta($category->term_id, 'thumbnail_id', true);
        $count        = (int) $category->count;
        ?>
        <li class="category-card reveal">
            <a class="category-card__link" href="<?php echo esc_url(get_term_link($category)); ?>">

                <span class="category-card__media placeholder squares" data-squares="3" data-cell="28">
                    <?php
                    if ($thumbnail_id) {
                        echo wp_get_attachment_image($thumbnail_id, 'woocommerce_thumbnail', false, [
                            'class'   => 'category-card__img',
                            'alt'     => '',
                            'loading' => 'lazy',
                        ]);
                    } else {
                        get_template_part('template-parts/shop/placeholder');
                    }
                    ?>
                </span>

                <span class="category-card__body">
                    <span>
                        <span class="category-card__title"><?php echo esc_html($category->name); ?></span>
                        <span class="category-card__count">
                            <?php
                            /* translators: %s: number of products */
                            echo esc_html(sprintf(_n('%s product', '%s products', $count, 'isg'), number_format_i18n($count)));
                            ?>
                        </span>
                    </span>
                    <span class="category-card__arrow" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h11M9 4l4 4-4 4"/></svg>
                    </span>
                </span>

            </a>
        </li>
    <?php endforeach; ?>
</ul>

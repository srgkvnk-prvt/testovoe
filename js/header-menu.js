document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header.tmpl');
    const menu = document.querySelector('.header-menu');
    const overlay = document.querySelector('.header-menu-overlay');
    const hamburger = document.querySelector('.hamburger');

    if (!menu || !overlay) return;

    const menuItems = menu.querySelectorAll('.menu-level-1 > li');
    const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;

    let activeItem = null;
    let showTimers = [];

    function clearShowTimers() {
        showTimers.forEach(id => clearTimeout(id));
        showTimers = [];
    }

    // Открытие подменю (десктоп)
    function openSubmenu(item) {
        if (isMobile()) return;

        const subBlock = item.querySelector(':scope > .sub-block');

        if (!item.classList.contains('has-submenu') || !subBlock) {
            closeSubmenu();
            return;
        }

        if (activeItem === item) return;

        if (activeItem) {
            activeItem.classList.remove('is-active');
        }

        activeItem = item;
        activeItem.classList.add('is-active');

        const height = subBlock.offsetHeight;
        overlay.style.height = `${height}px`;
        overlay.classList.add('is-active');

        hideMenuBlocks(subBlock);
        showMenuBlocks(subBlock);
    }

    // Закрытие подменю (десктоп)
    function closeSubmenu() {
        if (!activeItem) return;

        clearShowTimers();
        activeItem.classList.remove('is-active');
        activeItem = null;

        overlay.style.height = '0px';
        overlay.classList.remove('is-active');
    }

    // Каскадное появление колонок
    function showMenuBlocks(subBlock) {
        clearShowTimers();
        const blocks = subBlock.querySelectorAll('.header-menu-show-block');

        blocks.forEach((block, index) => {
            block.classList.remove('is-visible');
            const timerId = setTimeout(() => {
                if (activeItem && activeItem.contains(subBlock)) {
                    block.classList.add('is-visible');
                }
            }, 180 + index * 90);
            showTimers.push(timerId);
        });
    }

    function hideMenuBlocks(subBlock) {
        subBlock.querySelectorAll('.header-menu-show-block').forEach(block => {
            block.classList.remove('is-visible');
        });
    }

    // Десктопный hover
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            openSubmenu(item);
        });

        // Мобильный аккордеон
        const topLink = item.querySelector(':scope > a');
        if (topLink && item.classList.contains('has-submenu')) {
            topLink.addEventListener('click', (e) => {
                if (!isMobile()) return;
                e.preventDefault();
                item.classList.toggle('is-mobile-open');
            });
        }
    });

    // Уход курсора со всей шапки закрывает подменю
    (header || menu).addEventListener('mouseleave', () => {
        if (!isMobile()) closeSubmenu();
    });

    // Мобильный гамбургер
    function setMobileMenu(open) {
        if (!hamburger) return;
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('open-header-menu', open);
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const nextState = !document.body.classList.contains('open-header-menu');
            setMobileMenu(nextState);
        });
    }

    // Закрытие мобильного меню при переходе по конечной ссылке
    menu.addEventListener('click', (e) => {
        if (!isMobile()) return;
        const link = e.target.closest('a');
        if (!link) return;
        const parentLi = link.parentElement;
        if (parentLi && parentLi.classList.contains('menu-item') && parentLi.classList.contains('has-submenu') && parentLi.parentElement.classList.contains('menu-level-1')) {
            return;
        }
        setMobileMenu(false);
    });

    // Поиск в шапке
    const searchBox = document.querySelector('.search');
    const searchToggle = document.querySelector('.search__toggle');
    if (searchBox && searchToggle) {
        const searchInput = searchBox.querySelector('input');
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = searchBox.classList.toggle('is-open');
            if (isOpen && searchInput) searchInput.focus();
        });
    }

    // Языковой селектор (клик для тач-устройств)
    const langBox = document.querySelector('.header-languages');
    const langBtn = document.querySelector('.header-languages-current');
    if (langBox && langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langBox.classList.toggle('is-open');
        });
    }

    // Закрытие по клику вне и по Escape
    document.addEventListener('click', (e) => {
        if (searchBox && !searchBox.contains(e.target)) searchBox.classList.remove('is-open');
        if (langBox && !langBox.contains(e.target)) langBox.classList.remove('is-open');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSubmenu();
            setMobileMenu(false);
            if (searchBox) searchBox.classList.remove('is-open');
            if (langBox) langBox.classList.remove('is-open');
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobile()) {
            setMobileMenu(false);
        } else {
            closeSubmenu();
        }
    });
});
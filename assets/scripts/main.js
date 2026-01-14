// Скрипт для управления анимацией иконок
$(document).ready(function () {
  // При загрузке страницы настраиваем иконку для открытого элемента
  $(".collapse.show")
    .prev(".card-header")
    .find(".accordion-icon")
    .css("transform", "rotate(180deg)");

  // Обработчик события открытия аккордеона
  $("#faqAccordion").on("show.bs.collapse", function (e) {
    // Поворачиваем иконку открывающегося элемента
    $(e.target).prev(".card-header").find(".accordion-icon").css({
      transform: "rotate(90deg)",
      color: "#0056b3",
    });
  });

  // Обработчик события закрытия аккордеона
  $("#faqAccordion").on("hide.bs.collapse", function (e) {
    // Возвращаем иконку закрывающегося элемента в исходное положение
    $(e.target).prev(".card-header").find(".accordion-icon").css({
      transform: "rotate(0deg)",
      color: "#666",
    });
  });

  // Закрытие других элементов при открытии одного (опционально)
  $("#faqAccordion .collapse").on("show.bs.collapse", function () {
    $("#faqAccordion .collapse.show").not(this).collapse("hide");
  });
});


// Курс валюты
$(function() {

    const RATE = 70; // курс рубля к доллару

    // Сохраняем исходные цены в data-rub
    $('#prices .border').each(function() {
        $(this).find('.old-price, .new-price').each(function() {
            const rub = parseInt($(this).text().replace(/\D/g, ''), 10);
            $(this).data('rub', rub);
        });
    });

    // Переключение валюты
    $('.currency-code').on('click', function() {
        const $btn = $(this);
        const code = $btn.data('code');
        const $card = $btn.closest('.border'); // карточка, в которой кликнули

        // Активная кнопка
        $card.find('.currency-code').removeClass('active');
        $btn.addClass('active');

        // Пересчет цен
        $card.find('.old-price, .new-price').each(function() {
            const rub = $(this).data('rub');

            if (code === 'USD') {
                const usd = Math.round(rub / RATE);
                $(this).text('$' + usd);
            } else {
                $(this).text(rub.toLocaleString('ru-RU') + ' ₽');
            }
        });
    });

});

    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('d-none');
    });
$(document).ready(function () {

    //==== OWL ====
    $(".owl-carousel").owlCarousel({
        loop: true,
        items: 1,
        transitionStyle: 'fade',
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: true,
        autoPlayTimeout: 1000,
        mouseDrag: true,
        navigation: true,
        navigationText: '',
        singleItem: true,
    });

    //====HEADER MENU====
    $('.js-toggle').click(function () {
        $(this).toggleClass('header__toggle--opened');
        $('.header__menu').toggleClass('header__menu--opened');
    })

    $('.menu__link').click(function () {
        $('.header__menu').removeClass('header__menu--opened');
        $('.header__toggle').removeClass('header__toggle--opened')
    })

    //==== HEADER CHANGING THEME ====
    $(document).on('scroll', function () {
        let header = $('.header');
        let scrolled = $(this).scrollTop();
        let height = $('.main-page').outerHeight();
        if (scrolled >= height) {
            header.addClass('scrolled');
            header.removeClass('lightning');
        } else {
            if (header.hasClass('scrolled')) {
                header.addClass('lightning');
            }
            header.removeClass('scrolled');
        }
    })

    //==== UP BUTTON ====

    $(document).on('scroll', function () {
        if ($(this).scrollTop() > 350) {
            $('.button-up-wrapper').fadeIn();
        } else {
            $('.button-up-wrapper').fadeOut();
        }
    })

    $('.js-button-up').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 400);
    })

    //====ACCORDION====

    $('.js-ac-title[data-ac-opened]').each(function (i, el) {
        accordionToggle($(el));
    });

    $('.js-ac-title').click(function () {
        accordionToggle($(this));
    })

    $(window).on('resize', function () {
        let resizeTimeout;
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function () {
                resizeTimeout = null;
                $('.js-ac-content').each(function (i, el) {
                    if ($(el).height() !== 0) {
                        let targetHeight = $(el).find('.js-ac-height').outerHeight();
                        $(el).height(targetHeight);
                    }
                })
            }, 500);
        }
    });

    //==== MODAL FORM ====

    $('.js-modal-open').click(function () {
        $('.header__wrapper')
            .attr('style', `transition:0s;transform:translateX(-${($(window).outerWidth() -
                $(window).width()) / 2}px)`);
        $('.button-up-wrapper')
            .attr('style', `transition:0s;transform:translateX(-${($(window).outerWidth() -
                $(window).width()) / 2}px)`);

        $('.modal-form').fadeIn();
        $('body').attr('style', `overflow:hidden;padding-right: ${($(window).outerWidth() -
            $(window).width())}px`);
    });

    $('.js-modal-close').click(function () {
        $('.modal-form')
            .attr('style', `transition:0s;transform:translateX(-${($(window).outerWidth() -
                $(window).width())}px)`);
        $('.modal-form').fadeOut(300, function () {
            $('.modal-form').removeAttr('style');
        });
        $('.header__wrapper').removeAttr('style');
        $('.button-up-wrapper').removeAttr('style');
        $('body').removeAttr('style');
    });

    //==== FORM VALIDATION ====

    $('.js-form').validate();

    $('.js-mask-phone').inputmask('+7 (999) 999 99-99 ');

    $.validator.addMethod('js-mask-phone', function (value, element) {
        return this.optional(element) || $(element).inputmask('unmaskedvalue').length === 10;
    }, 'Введите корректный номер.');

    $.extend($.validator.messages, {
        email: "Введите корректный адрес."
    });

    $('.js-modal-form').validate();

    $.validator.addMethod('js-modal-password', function (value, element) {
        return this.optional(element) || value.length > 6;
    }, 'Длина пароля должна быть не менее 6 символов');

    //==== Yandex MAPS ===
    ymaps.ready(init);

    function init() {
        var map = document.querySelector('#map');

        var center = map.dataset.mapcenter.split(',');
        center = [+center[0], +center[1]];

        var mark = map.dataset.placemark.split(',');
        mark = [+mark[0], +mark[1]];

        var myMap = new ymaps.Map("map", {
            center: center,
            zoom: 15,
            //behaviors: ['drag', 'scroll'],
            controls: []
        });

        var placemarkContent = ymaps.templateLayoutFactory.createClass(
            '<div class="placemark-content">$[properties.iconContent]</div>'
        );

        var placemark = new ymaps.Placemark(mark, {
            iconContent: 'улица Ильинка, 4'
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'img/pin.svg',
            iconImageSize: [40, 50],
            iconImageOffset: [-40, -50],
            iconContentOffset: [10, 50],
            iconContentLayout: placemarkContent
        });

        myMap.geoObjects.add(placemark);

        ymapsTouchScroll(myMap, {
            //options
        });
    }
    //==== FUNCTIONS ====
    function accordionToggle(toggler) {
        let targetHeight = toggler.parent().find('.js-ac-height').outerHeight();
        let content = toggler.parent().find('.js-ac-content');
        let icon = toggler.find('.accordion__icon');
        if (content.height() > 0) {
            content.height(0);
            icon.removeClass('accordion__icon--opened');
        } else {
            content.height(targetHeight);
            icon.addClass('accordion__icon--opened');
        }
    }
    //=============================
});
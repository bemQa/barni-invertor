$(document).ready(function () {
	$('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu-links').removeClass('active'); 
           $('.burger').removeClass('active');
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    if($('.select').length > 1) {
        $('select').each(function() {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else {
        $('select').not('.select-search').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    }

    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.tab-trigger').click(function(){
        $('.tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-item').removeClass('active');
        $('.tab-item.' + tab).addClass('active');
    });

    figuresNumber();

    if (window.innerWidth < 1000) {
        if ($('.main-figures').length) {
            $('.main-figures').slick({
                dots: true,
                arrows: false,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                variableWidth: true
            });
        }

        if ($('.lk-tastes.mobile-visible').length) {
            $('.lk-tastes.mobile-visible').slick({
                dots: false,
                arrows: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1
            });
        }
    }

    $('.tooltip-trigger').click(function(e) {
        e.preventDefault();
        $(this).next().addClass('active');
    });

    $('.close-tooltip').click(function(e) {
        e.preventDefault();
        $(this).parent().removeClass('active');
    });

    function figuresNumber() {
        $('.btn-number').click(function(e) {
            var type = $(this).attr('data-type');
            var field = $(this).attr('data-field');
            var input = $(this).parent().find('input[name ='+field+']');
            var min = input.attr('min');
            var max = input.attr('max');
            min = parseInt(min);
            max = parseInt(max);
            var currentVal;
            var value = input.val();
            if (type == 'minus') {
                if (value > min) {
                    currentVal = parseInt(value) - 1;
                    input.val(currentVal).change();
                }
            }
            if (type == 'plus') {
                if (value < max) {
                    currentVal = parseInt(value) + 1;
                    input.val(currentVal).change();
                }
            }
        });
        $('.input-number').change(function() {
            var min = $(this).attr('min');
            var max = $(this).attr('max');
            var val = $(this).val();
            var name = $(this).parent().find('.input-number').attr('name');
            if (val == min) {
                $(this).parent().find(".btn-number[data-type='minus'][data-field='" + name + "']").attr('disabled', 'true');
            } else $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
            if (val == max) {
                $(this).parent().find(".btn-number[data-type='plus'][data-field='" + name + "']").attr('disabled', 'true');
            } else $(this).parent().find(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
        });
    }

    if($('.constructor-page').length) {
        $('.taste-slider').not('.filling-slider').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
            responsive: [
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]

        }); 

        if($('#dough').val() != '') {
            let dough = $('#dough').val();
            let dough_color = $('#dough').attr('data-dough-color');

            $('.taste-element[data-dough="'+ dough +'"]').addClass('choice');
            $('.dough').addClass('choice dough'+dough_color);

            $('.constructor-slide1 .next-constructor-slide .btn').removeClass('disabled');

            $('.constructor-slide3').attr('data-dough-color', dough_color);
            $('.constructor-slide3 .taste-element').attr('data-dough-color', dough_color);
            $('.constructor-slide3 .filling').removeClass().addClass('filling filling'+ dough_color);
        }

        $('.constructor-slide1 .taste-element').click(function(e) {
            let dough = $(this).data('dough');
            let dough_color = $(this).data('dough-color');

            $('#dough').val(dough);
            $('#dough').attr('data-dough-color', dough_color);

            $('.constructor-slide1 .taste-element').removeClass('choice');
            $(this).addClass('choice');
            
            $('.dough').removeClass('choice');
            $('.dough').addClass('choice');

            // анимация добавления вкуса в тесто
            if(getCookie('hint2') == '1') {
                $('.constructor-animation').fadeIn().addClass('animate');
                $('.dough-animation').fadeIn().addClass('dough-taste'+dough);
                setTimeout(function(){
                    $('.constructor-animation').fadeOut();
                    setTimeout(function(){
                        $('.constructor-animation').removeClass('animate');
                        $('.dough-animation').removeClass().addClass('dough-animation');
                    },500);
                    $('.dough').removeClass('choice dough1 dough2 dough3');
                    $('.dough').addClass('choice dough'+dough_color);
                }, 7500);
            } else {
                $('.close-hint2').click(function(){
                    setCookie('hint2', '1', {'max-age': 31536000});
                    $('.constructor-hints').fadeOut();
                    $('.hint2').remove();

                    setTimeout(function(){
                        $('.constructor-animation').fadeIn().addClass('animate');
                        $('.dough-animation').fadeIn().addClass('dough-taste'+dough);
                        setTimeout(function(){
                            $('.constructor-animation').fadeOut();
                            setTimeout(function(){
                                $('.constructor-animation').removeClass('animate');
                                $('.dough-animation').removeClass().addClass('dough-animation');
                            },500);
                            $('.dough').removeClass('choice dough1 dough2 dough3');
                            $('.dough').addClass('choice dough'+dough_color);
                        }, 7500);
                    }, 500);
                });
            }

            $('.constructor-slide1 .next-constructor-slide .btn').removeClass('disabled');

            $('.constructor-slide3').attr('data-dough-color', dough_color);
            $('.constructor-slide3 .taste-element').attr('data-dough-color', dough_color);
            $('.constructor-slide3 .filling').removeClass().addClass('filling filling'+ dough_color);

            if(getCookie('hint2') != '1') {
                $('.constructor-hints').fadeIn();
                setTimeout(function(){
                    $('.hint2').fadeIn();
                }, 2000);
            }
            else {
                $('.hint2').remove();
            }
        });

        $('.remove-dough').click(function(e) {
            $('#dough').val('');
            $('#dough').attr('data-dough-color', '');

            $('.constructor-slide1 .taste-element').removeClass('choice');
            $('.dough').removeClass('choice dough1 dough2 dough3');

            $('.constructor-slide1 .next-constructor-slide .btn').addClass('disabled');

            $('.constructor-slide3').attr('data-dough-color', '');
            $('.constructor-slide3 .taste-element').attr('data-dough-color', '');
        });

        $('.constructor-slide-btn').click(function(e) {
            let slide = $(this).data('slide');

            let dough = $('#dough').val();
            let dough_color = $('#dough').attr('data-dough-color');
            let filling = $('#filling').val();

            if(slide != '') {
                $(this).closest('.constructor-slide').hide();
                $('.constructor-result-slide').hide();
                $(slide).show();

                if(slide == '.constructor-result-slide') {
                    $('.constructor-slides').hide();
                    $('.taste-result').html('<img src="img/constructor/taste/'+ String(dough_color)+String(filling) +'.png" alt="Вкус">');
                } else {
                    $('.constructor-slides').show();
                    $('.constructor-result-slide').hide();
                }
            }
        });

        $('.filling-group').click(function(e) {
            let slide = $(this).data('slide');

            if(slide != '') {
                $(this).closest('.constructor-slide').hide();
                $(slide).show();
            }
        });

        $('.filling-group').one('click', function(e) {
            let slide = $(this).data('slide');
            if(slide != '') {
                $(slide + ' .filling-slider').slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerMode: true,
                    responsive: [
                        {
                          breakpoint: 1000,
                          settings: {
                            slidesToShow: 1
                          }
                        }
                    ]
                });  
            }
        });

        if($('#filling').val() != '') {
            let filling = $('#filling').val();
            let dough_color = $('.taste-element[data-filling="'+ filling +'"]').data('dough-color');

            $('.taste-element[data-filling="'+ filling +'"]').addClass('choice');
            $('.filling').removeClass().addClass('filling filling'+String(dough_color)+' choice filling'+String(dough_color)+String(filling));

            $('.constructor-slide3 .next-constructor-slide .btn').removeClass('disabled');

            $('.constructor-slide3 .page-subtitle').html('Здорово придумано :) Эта начинка идеально подходит <br class="desktop-visible">к бисквиту Барни!');
        }

        $('.constructor-slide3 .taste-element').click(function(e) {
            let filling = $(this).data('filling');
            let dough_color = $(this).data('dough-color');

            $('#filling').val(filling);

            $('.constructor-slide3 .taste-element').removeClass('choice');
            $(this).addClass('choice');
            
            $('.filling').removeClass().addClass('filling filling'+String(dough_color)+' choice filling'+String(dough_color)+String(filling));

            $('.constructor-slide3 .next-constructor-slide .btn').removeClass('disabled');

            $('.constructor-slide3 .page-subtitle').html('Здорово придумано :) Эта начинка идеально подходит <br class="desktop-visible">к бисквиту Барни!');

            $('.taste-result').html('<img src="img/constructor/taste/'+ String(dough_color)+String(filling) +'.png" alt="Вкус">');
        });

        $('.remove-filling').click(function(e) {
            let dough_color = $('#dough').attr('data-dough-color');
            console.log(dough_color)

            $('#filling').val('');

            $('.constructor-slide3 .taste-element').removeClass('choice');
            $('.filling').removeClass().addClass('filling filling'+dough_color);

            $('.constructor-slide3 .next-constructor-slide .btn').addClass('disabled');

            $('.constructor-slide3 .page-subtitle').html('Теперь добавим начинку! <br>Выберите один из вариантов и перетащите к бисквитному медвежонку:');

            $('.taste-result').empty();
        });
    }

    scrollWaypointInit($('.animateMe'));

    // set cookie
    if(getCookie('hint1') != '1') {
        setTimeout(function(){
            $('.constructor-hints').fadeIn(600);
            setTimeout(function(){
                $('.hint1').fadeIn();
            }, 1000);
        }, 400);
    }
    else {
        $('.hint1').remove();
    }

    $('.close-hint1').click(function(){
        setCookie('hint1', '1', {'max-age': 31536000});
        $('.constructor-hints').fadeOut();
        $('.hint1').remove();
    });

    if(getCookie('hint2') == '1') {
        $('.hint2').remove();
    }

});

( function() {

    var youtube = document.querySelectorAll( ".youtube" );
    
    for (var i = 0; i < youtube.length; i++) {
        
        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/maxresdefault.jpg";
        
        var image = new Image();
            image.src = source;
            image.addEventListener( "load", function() {
                youtube[ i ].appendChild( image );
            }( i ) );
    
            youtube[i].addEventListener( "click", function() {

                var iframe = document.createElement( "iframe" );

                    iframe.setAttribute( "frameborder", "0" );
                    iframe.setAttribute( "allowfullscreen", "" );
                    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1&enablejsapi=1" );

                    this.innerHTML = "";
                    this.appendChild( iframe );
            } );    
    };
    
} )();

function scrollWaypointInit(items, trigger) {
    items.each(function() {
        var element = $(this),
            osAnimationClass = element.data("animation"),
            osAnimationDelay = element.attr('data-animation-delay');

        element.css({
            '-webkit-animation-delay': osAnimationDelay,
            '-moz-animation-delay': osAnimationDelay,
            'animation-delay': osAnimationDelay
        });

        var trigger = (trigger) ? trigger : element;

        trigger.waypoint(function() {
            element.addClass('animated').addClass(osAnimationClass);
        }, {
            // triggerOnce: true,
            offset: '80%'
        });
    });
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
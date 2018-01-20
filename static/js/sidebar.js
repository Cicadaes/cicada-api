(function ($) {
    var $container = $('.sidevar-container');

    $container.on('click', function () {
        $container.find('.collapse .list-group').children().removeClass('active');
        $(this).addClass('active');
    });
})(jQuery);
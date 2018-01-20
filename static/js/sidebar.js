(function ($) {
    var $container = $('.sidebar-container');

    var url = window.location;
    $(window).on('load', function () {
        var element = $container.find('div.list-group > a').filter(function () {
            return this.href == url || url.href.indexOf(this.href) == 0;
        }).addClass('active').closest('.collapse').prev().trigger('click');
    });
})(jQuery);
(function ($) {
    // var $container = $('.sidebar-container');

    // var url = window.location;
    // $(window).on('load', function () {
    //     var element = $container.find('div.list-group > a').filter(function () {
    //         return this.href == url || url.href.indexOf(this.href) == 0;
    //     }).addClass('active').closest('.collapse').prev().trigger('click');
    // });
    // $(document).pjax('[data-pjax] a, a[data-pjax]', '#main-pjax');
    // 点击左侧菜单栏无刷新页面
    $(document).ready(function () {
        if($.support.pjax) {
            $(document).pjax('a[data-pjax]', '#main-pjax', {maxCacheLength:0,push:false, replace:true,fragment: '#main-pjax', timeout: 8000});
            $('.sidebar-container a[data-pjax]').on('click', function () {
                $('.sidebar-container a[data-pjax]').each(function () {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
            });
            $(document).on('pjax:send', function () {
                $('#loading').addClass('boxLoading');
            });
            $(document).on('pjax:complete', function () {
                setTimeout(function () {
                    $('#loading').removeClass('boxLoading');
                }, 250);
            });
        }

        if (localStorage['api-token']) {
            var decode = JSON.parse(window.atob(localStorage['api-token'].split('.')[1]));
            $('#token-username').text(decode.username);
        }
        $('#token-logout').on('click', function () {
            $.ajax({
                url: '/logout',
                type: 'GET',
                success: function (res) {
                    if (res.code === 0) {
                        localStorage.removeItem('api-token');
                        location.href = '/login';
                    }
                }
            })
            localStorage.removeItem('api-token');
        })
    });
})(jQuery);
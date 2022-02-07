//全局
$(function() {

    //顶部吸顶
    $(".navs").sticky({ topSpacing: 0, zIndex: 100 });

    //页面滚动动画
    new WOW().init();

    //通用选项卡
    $('[data-tab]').children().click(function() {
        if ($(this).attr('disabled')) return;
        $(this).addClass('active').siblings().removeClass('active');
        var $cons = $('[tab-content="' + $(this).parent().attr('data-tab') + '"]').children();
        // console.log($cons);
        $cons.eq($(this).index()).show().siblings().hide();
    })
})
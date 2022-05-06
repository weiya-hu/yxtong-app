//首页脚本

//首页顶部轮播
var indexTopSwiperTimer;
var indexTopSwiper = new Swiper('#index-top-swiper', {
    touchRatio: false,
    autoplay: {
        delay: 5000,
    },

    pagination: {
        el: '.index-top-swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.index-top-swiper-button-next',
        prevEl: '.index-top-swiper-button-prev'
    },
    on: {
        transitionStart: function() {
            $.each($('#index-top-swiper').find('video'), function() {
                $(this)[0].pause(); //切换时全部视频暂停
            })
        },
        transitionEnd: function() {
            var $this = $(this.slides[this.activeIndex]);
            if ($this.hasClass('swiper-video')) {
                //this.autoplay.stop(); //含视频时停止切换
                try {
                    var v = $this.find('video')[0];
                    //v.currentTime = 0; //从头播放
                    //v.play(); //自动播放
                } catch (e) {}
            } else {
                this.autoplay.start();
            }
        }
    }
});
//播放开始执行的函数
$.each($('#index-top-swiper').find('video'), function(i, o) {
    o.addEventListener('play', function() {
        indexTopSwiper.autoplay.stop()
    });
})
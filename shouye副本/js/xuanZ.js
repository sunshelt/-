/*font-size*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';//其中“10”根据你设置的html的font-size属性值做适当的变化
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



/*顶部触摸弹出*/
jQuery(document).ready(function($) {
    $(document).scroll(function() {
        $('.popup-layer').hide();
        $('.btn-headermenu').removeClass('btn-active');
    })
    $('.btn-headermenu,.popup-layer').click(function(event) {
        event.stopPropagation();
    })
    $('.btn-headermenu').each(function(){
        $(this).click(function(){
            $(this).toggleClass('btn-active');
            $(this).next().toggle();
            $(this).next().next().toggle();
            $(this).parent().siblings().find('.popup-layer,.btn-headermenu').hide();
        })
    })
})
/*置顶*/
$(function(){
    $(window).scroll(function(){
        //var scrolltop=$(this).scrollTop();
        //var scrollheight=$(document).height();
        // var windowheight=$(this).height();
        //alert($(this).scrollTop());
        if($(this).scrollTop()>300){
            $('#top').fadeIn();
        }else{
            $('#top').fadeOut();
        }
    });

    $('#top').click(function(){
        $('body,html').animate({scrollTop:0},500);
    })
})
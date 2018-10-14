
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
/*轮播*/

window.my = {};

my.transitionEnd = function(dom,callback){

    if(!dom || typeof dom != 'object'){

        return false;
    }
    dom.addEventListener('transitionEnd', function(){
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd', function(){
        callback && callback();
    });
}


my.tap = function(dom,callback){
    if(!dom || typeof dom != 'object'){

        return false;
    }

    var isMove = false;
    var time = 0;

    dom.addEventListener('touchstart',function(){

        time = Date.now();
    });
    dom.addEventListener('touchmove',function(){
        isMove = true;
    });
    window.addEventListener('touchend',function(e){

        if(!isMove && (Date.now()-time)<150 ){
            callback && callback(e);
        }


        isMove = false;
        time = 0;
    });

}

function one(){


    var imageCount = 5; //页面中用来轮播的图片有5张不同的
    //轮播图大盒子
    var banner = document.querySelector('.banner');
    //图片的宽度
    var width = banner.offsetWidth;
    //图片盒子
    var imageBox = banner.querySelector('ul:first-child');
    //点盒子
    var pointBox = banner.querySelector('ul:last-child');
    //所有的点
    var points = pointBox.querySelectorAll('li');

    //公用方法
    //加过渡
    var addTransition = function(){
        imageBox.style.transition = "all 0.3s";
        imageBox.style.webkitTransition = "all 0.3s";/*做兼容*/
    };
    //清除过渡
    var removeTransition = function(){
        imageBox.style.transition = "none";
        imageBox.style.webkitTransition = "none";
    }
    //定位
    var setTranslateX = function(translateX){
        imageBox.style.transform = "translateX("+translateX+"px)";
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
    }


    var index = 1;
    var timer = setInterval(function(){
        index++ ;

        addTransition();
        setTranslateX(-index * width);
    },3000);


    my.transitionEnd(imageBox, function(){

        if(index > imageCount ){
            index = 1;
        }else if(index <= 0){
            index = imageCount;
        }
        removeTransition();
        setTranslateX(-index * width);
        setPoint();
    });


    var setPoint = function(){

        for(var i = 0 ; i < points.length ; i++){
            points[i].className = " ";
        }
        //给图片对应的点加上样式
        points[index-1].className = "now";
    }


    var startX = 0; //记录起始  刚刚触摸的点的位置 x的坐标
    var moveX = 0;  //滑动的时候x的位置
    var distanceX = 0;  //滑动的距离
    var isMove = false; //是否滑动过

    imageBox.addEventListener('touchstart', function(e){
        clearInterval(timer);   //清除定时器
        startX = e.touches[0].clientX;  //记录起始X
    });

    imageBox.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;   //滑动时候的X
        distanceX = moveX - startX; //计算移动的距离

        removeTransition(); //清除过渡
        setTranslateX(-index * width + distanceX);  //实时的定位
        isMove = true;  //证明滑动过
    });


    imageBox.addEventListener('touchend', function(e){

        if(isMove && Math.abs(distanceX) > width/3){

            if(distanceX > 0){
                index --;
            }
            else{
                index ++;
            }
        }
        addTransition();
        setTranslateX(-index * width);

        if(index > imageCount ){
            index = 1;
        }else if(index <= 0){
            index = imageCount;
        }
        setPoint();


        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        clearInterval(timer);
        timer= setInterval(function(){
            index++ ;
            addTransition();
            setTranslateX(-index * width);
        },3000);
    });
};



/*
* 字体大小调节
* */
/*触摸选择*/
jQuery(document).ready(function($) {
    //$(document).on("touchend", function () {
    //  $(".popup-layer").hide();
    //  $('.btn-headermenu').removeClass('btn-active');
    //});
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
});
// 1. 获取元素
var focus = document.querySelector(".focus");
var ul = focus.children[0];
var ol = focus.children[1];
var w = focus.offsetWidth();
// 2. 利用定时器自动轮播图图片
var index = 0;
var timer = setInterval(function() {
    index++;
    ul.style.transition = "all .4s";
    move(ul, -index * w);
}, 2000);
// 等着我们过渡完成之后，再去判断 监听过渡完成的事件 transitionend 
ul.addEventListener('transitionend', function() {
    // 无缝滚动
    if (inddex >= 3) {
        index = 0;
        ul.style.transition = "none";
        move(ul, -index * w);
    } else if (index < 0) {
        index = 2;
        ul.style.transition = "none";
        move(ul, -index * w);
    }
    // 3. 小圆点跟随变化
    ol.querySelector('.current').classList.remove("current");
    ol.chiledren[index].classList.add('current');
});
// 4. 手指滑动轮播图 
var startX = 0;
var moveX = 0;
var flag = false;
// 触摸元素 touchstart： 获取手指初始坐标
ul.addEventListener('touchstart', function(e) {
    startX = e.targetTouches[0].pageX;
    // 手指触摸的时候就停止定时器
    clearInterval(timer);
});
// 移动手指 touchmove： 计算手指的滑动距离， 并且移动盒子
ul.addEventListener('touchmove', function(e) {
    moveX = e.targetTouches[0].pageX - startX;
    ul.style.transition = 'none';
    move(ul, -index * w + moveX);
    flag = true;
    e.preventDefault();
});
// 手指离开 根据移动距离去判断是回弹还是播放上一张下一张
ul.addEventListener('touchend', function() {
    if (flag) {
        if (Math.abs(moveX) > 50) {
            if (Math > 0) {
                index--;
            } else {
                index++;
            }
            ul.style.transition = 'all .3s';
            move(ul, -index * w);
        } else {
            ul.style.transition = 'all .1s';
            move(ul, -index * w);
        }
    }
    // 手指离开的时候就重新开启定时器
    // 要用定时器，先清定时器
    clearInterval(timer);
    timer = setInterval(function() {
        index++;
        ul.style.transition = 'all .3s';
        move(ul, -index * w);
    }, 2000)
});

function move(obj, translatex) {
    obj.style.transform = "translateX('+translatex+'px)";
}
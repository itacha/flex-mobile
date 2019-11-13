window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    var index = 0;
    var timer = setInterval(function() {
        index++;
        ul.style.transition = 'all .3s';
        move(ul, -index * w)
    }, 2000);
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            move(ul, -index * w);
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            move(ul, -index * w);
        }
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX;
        ul.style.transition = 'none';
        move(ul, moveX - startX);
        flag = true;
        e.preventDefault();
    })
    ul.addEventListener('touchend', function() {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
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
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            ul.style.transition = 'all .3s';
            move(ul, -index * w);
        }, 2000)
    })

    function move(obj, translatex) {
        obj.style.transform = 'translate(' + translatex + 'px)';
    }

    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})
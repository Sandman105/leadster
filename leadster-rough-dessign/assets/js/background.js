$(document).ready(function () {
    var $v01 = $('.vertical0'),
    $v02 = $('.vertical1'),
    $v03 = $('.vertical2'),
    $v04 = $('.vertical3'),
    $v05 = $('.vertical4'),
    $v06 = $('.vertical5'),
    $v07 = $('.vertical6'),
    $v08 = $('.vertical7'),
    $v09 = $('.vertical8'),
    $v10 = $('.vertical9'),
    $login = $('.modal'),
    speed = 60,
    tl = new TimelineLite({ onComplete: restart });
  
    tl.fromTo($v01, speed * 0.70, { y: -250 }, { y: -750 }, 'async').
    fromTo($v02, speed * 0.75, { y: -950 }, { y: -1250 }, 'async').
    fromTo($v03, speed * 0.95, { y: -1000 }, { y: -1850 }, 'async').
    fromTo($v04, speed * 0.75, { y: -1250 }, { y: -1750 }, 'async').
    fromTo($v05, speed * 0.85, { y: -1100 }, { y: -2000 }, 'async').
    fromTo($v06, speed * 0.65, { y: -900 }, { y: -1950 }, 'async').
    fromTo($v07, speed * 0.70, { y: -1300 }, { y: -2100 }, 'async').
    fromTo($v08, speed * 0.95, { y: -850 }, { y: -1460 }, 'async').
    fromTo($v09, speed * 0.55, { y: -1000 }, { y: -1750 }, 'async').
    fromTo($v10, speed * 0.80, { y: -1200 }, { y: -1600 }, 'async').
    fromTo($login, 1, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: Elastic.easeInOut }, 'async');
  
    tl.play();
  
    function restart() {
      tl.stop();
      tl.restart();
    }
  });
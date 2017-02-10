/****** Класс №1 Menu ******/

function Menu(sSelector) { 

  var m = this; 

// Свойства

  m.menu = $(sSelector); // UL
  m.menuLink = m.menu.find('li a');

// Методы

  m.toggleSubmenu = function() {
   $(this).next('ul').stop().slideToggle();
  }

// События

  m.menuLink.click(m.toggleSubmenu);
}


/****** Класс №2 Backtop ******/

function Backtop(sSelector) {

  var t = this; 

// Свойства
  t.backtop = $(sSelector);

// Методы

  t.backtopScroll = function() {
    if ($(window).scrollTop() > 20) {
      $(t.backtop).fadeIn();
    } 
    else {
      $(t.backtop).fadeOut();
    }
  }
 t.backtopClick = function() {
    $("body,html").animate({scrollTop:0},800);
  }
  t.backtopHover = function() {
    $(this).animate({backgroundColor:"#363636",opacity:1},500);
  }
  t.backtopUnhover = function() {
    $(this).animate({backgroundColor:"#000",opacity:0.4},500);
  }

// События

  $(window).scroll(t.backtopScroll);
  t.backtop.click(t.backtopClick); 
  t.backtop.mouseenter(t.backtopHover);
  t.backtop.mouseleave(t.backtopUnhover);
}
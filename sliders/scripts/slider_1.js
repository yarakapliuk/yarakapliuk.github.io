function Slider(sSelector) {

	var s = this;

/*****Properties*****/

	s.slider       = $(sSelector);
	s.pictureImg   = s.slider.find('.b-picture__image');
	s.navPoint     = s.slider.find('.b-navigate__point');
	s.scrollNext   = s.slider.find('.b-controls__next');
	s.scrollPrev   = s.slider.find('.b-controls__prev');
	s.max 		   = s.navPoint.length;
	s.current      = 0;

/*****Methods*****/

	s.changeAttrs = function() {
		var counter = s.current + 1; // вопрос - почему не работает с ++s.current
		s.pictureImg.attr('src','../images/gallery/' + s.current + '.jpg').attr('alt','Image ' + counter).attr('title','Image ' + counter); 
	}
	s.changeBtns = function() {
		s.navPoint.removeClass('b-navigate__point_selected').eq(s.current).addClass('b-navigate__point_selected');
		s.changeAttrs();
	}
	s.changeImage = function() {
		s.current = $(this).index();
		s.changeAttrs();
		s.changeBtns();
	}
	s.showImage = function(iShift) {
		s.current += iShift;
		if(s.current >= s.max) {
			s.current = 0;
		}
		else if(s.current < 0) {
			s.current = s.max - 1;
		}
		s.changeBtns();
	}
	s.showNext = function() {
		s.showImage(1);
	}
	s.showPrevious = function() {
		s.showImage(-1);
	}
	s.autochange = function() {
		var schedule = setInterval(s.showNext, 3000);
	}

/*****Events*****/
	
	s.autochange();
	s.changeBtns();
	s.scrollNext.click(s.showNext);
	s.scrollPrev.click(s.showPrevious);
	s.navPoint.click(s.changeImage);
}
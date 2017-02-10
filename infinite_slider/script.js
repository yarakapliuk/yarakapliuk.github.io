window.addEventListener('load',function() {
	var slider = document.querySelector('#slider'),
		slideContainer = document.querySelector('#slider .slide-container'),
		slides = document.getElementsByClassName('slide'),
		controlNext = document.querySelector('.controls .controls-next'),
		controlPrev = document.querySelector('.controls .controls-prev'),
		flag = true;

	slideContainer.style.width = slider.clientWidth * (slides.length+1) + "px";

	function animateSlides(classname) {
		if (flag == true) {
			slideContainer.classList.add(classname);
			flag = false;

			function changeSlides() {
				slideContainer.classList.remove(classname);

				if(classname == 'transitionDecreasePadding') {
					slideContainer.appendChild(slides[0]);
				}
				else if (classname == 'transitionIncreasePadding') {
					slideContainer.insertBefore(slides[3],slides[0]);
				}
				
				flag = true;
				slideContainer.removeEventListener('transitionend',changeSlides,false);
			}
			slideContainer.addEventListener('transitionend',changeSlides,false);
		}
	}
	
	function moveSlide (direction) {
		if(direction == 'next') {
			animateSlides('transitionDecreasePadding');
		}
		else if(direction == 'prev') {
			animateSlides('transitionIncreasePadding');
		} 
	}

	controlNext.addEventListener('click',function() {
		moveSlide('next');
	});
	controlPrev.addEventListener('click',function() {
		moveSlide('prev');
	});
});

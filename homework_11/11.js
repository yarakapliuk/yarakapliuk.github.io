window.onload = function() {

    /***** Page switching *****/
    
    var buttons = document.querySelectorAll("button"),
    currentPage;
    
    if(!window.localStorage["currentPage"]) {
        currentPage = "gallery";
    }
    else {
        currentPage = localStorage.getItem("currentPage");
    }
    
    document.querySelector("." + currentPage).classList.add("active");

    function showCurrentPage() {
        document.querySelector(".active").classList.remove("active");
        document.querySelector("." + this.id).classList.add("active");
        
        currentPage = this.id;
        window.localStorage.setItem("currentPage", currentPage);
    }
    
    for(var i=0; i<buttons.length; i++) {
        buttons[i].addEventListener("click", showCurrentPage);
    }

    /***** Gallery logic *****/

    var imagesData = `[
    "images/0.jpg",
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    ]`;

    function createGallery(n) {
        var images = [];
        try {
            images= JSON.parse(imagesData);
        }
        catch (e) {
            console.dir(e);
        }

        
        var galleryContainer = document.querySelector(".gallery-container");

        for(var i=0; i<n; i++) {
            var img = document.createElement("img");
            img.src = images[i];
            img.classList.add("gallery-image");
            img.dataset.filtered = i;
            galleryContainer.appendChild(img);
        }

        function rotateSlides() {

            var galleryImages = document.querySelectorAll(".gallery-image"),
            prev = document.querySelector(".left"),
            next = document.querySelector(".right"),
            indexRight = galleryImages.length-1,
            indexLeft = 0;

            function changeSlides(currentBtn,oppositeBtn,step,limit) {
                
                var currentIndex = 0;

                if(step == 1) {
                    currentIndex = indexRight;
                }
                else if (step == -1) {
                    currentIndex = indexLeft;
                }

                indexRight += step;
                indexLeft += step;
                currentIndex += step;
                
                for(var i=0; i<galleryImages.length; i++) {
                    galleryImages[i].src = images[+galleryImages[i].dataset.filtered + step];
                    galleryImages[i].dataset.filtered = +galleryImages[i].dataset.filtered + step;
                    oppositeBtn.classList.remove("btn-inactive");
                }

                if (currentIndex == limit) {
                    currentBtn.classList.add("btn-inactive");
                }
            }

            function rotate(direction, event) {
                if(direction == "right") {

                    var step = 1,
                    limit = images.length-1;

                    if (indexRight < limit) {
                        changeSlides(next,prev,step,limit);
                    }
                }
                
                else if(direction == "left") {

                    var step = -1,
                    limit = 0;

                    if(indexLeft > limit) {
                        changeSlides(prev,next,step,limit);
                    }  
                }
            }
            next.addEventListener("click",rotate.bind(null,"right"));
            prev.addEventListener("click",rotate.bind(null,"left"));
        }
        rotateSlides();
    }
    createGallery(3); 
}
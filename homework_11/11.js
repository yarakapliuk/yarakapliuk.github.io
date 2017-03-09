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
        "images/8.jpg"
    ]`;
    var images = JSON.parse(imagesData);

    function createGallery(n) {
        var galleryContainer = document.querySelector(".gallery-container");

        for(var i=0; i<n; i++) {
            var img = document.createElement("img");
            img.src = images[i];
            img.classList.add("gallery-image");
            img.dataset.filtered = i;
            galleryContainer.appendChild(img);
        }
    }

    function rotateSlides() {

        var galleryImages = document.querySelectorAll(".gallery-image"),
            prev = document.querySelector(".left"),
            next = document.querySelector(".right"),
            indexRight = galleryImages.length-1,
            indexLeft = 0;

        function rotateRight() {

            if (indexRight < images.length-1) {

                indexRight += 1;
                indexLeft += 1;

                for(var i=0; i<galleryImages.length; i++) {
                    galleryImages[i].src = images[+galleryImages[i].dataset.filtered + 1];
                    galleryImages[i].dataset.filtered = +galleryImages[i].dataset.filtered + 1;
                    prev.classList.remove("btn-inactive");
                }

                if (indexRight == images.length-1) {
                    this.classList.add("btn-inactive");
                }
            }

        }

        function rotateLeft() {

            if (indexLeft > 0) {

                indexRight -= 1;
                indexLeft -= 1;

                for(var i=0; i<galleryImages.length; i++) {
                    galleryImages[i].src = images[+galleryImages[i].dataset.filtered - 1];
                    galleryImages[i].dataset.filtered = +galleryImages[i].dataset.filtered - 1;
                    next.classList.remove("btn-inactive");
                }

                if (indexLeft == 0) {
                    this.classList.add("btn-inactive");
                }
            }
        }

        next.addEventListener("click",rotateRight);
        prev.addEventListener("click",rotateLeft);
    }

    createGallery(3);
    rotateSlides();
    
}
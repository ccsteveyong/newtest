const API = "https://script.google.com/macros/s/AKfycbyS2-C9UbYSoFpTJmDoBpjnKwdqRynm3mx-cDcKxKSKR8Y6MaODCtMNjtzAmlyTvLY1/exec";


fetch(API)

.then(response => response.json())

.then(data => {

    console.log("API Loaded:", data);


    const bgWrapper = document.querySelector(".swiper-wrapper.is-slider-bg");
    const titleWrapper = document.querySelector(".swiper-wrapper.is-slider-titles");
    const thumbWrapper = document.querySelector(".swiper-wrapper.is-slider-thumbs");


    // Remove Webflow CMS placeholder
    bgWrapper.innerHTML = "";
    titleWrapper.innerHTML = "";
    thumbWrapper.innerHTML = "";


    data.forEach(item => {


        // BACKGROUND IMAGE

        bgWrapper.insertAdjacentHTML(
            "beforeend",
            `
            <div class="swiper-slide is-slider-bg">
                <img 
                src="${item.image}" 
                class="slider-bg_img">
            </div>
            `
        );



        // TITLE

        titleWrapper.insertAdjacentHTML(
            "beforeend",
            `
            <div class="swiper-slide is-slider-titles">

                <div class="year">
                    ${item.year}
                </div>

                <p class="slider-titles_heading">
                    ${item.title}
                </p>

            </div>
            `
        );



        // THUMBNAIL

        thumbWrapper.insertAdjacentHTML(
            "beforeend",
            `
            <div class="swiper-slide is-slider-thumbs">

                <div class="slider-thumbs_height">

                    <img 
                    src="${item.image}" 
                    class="slider-thumbs_img">

                </div>

            </div>
            `
        );


    });



    // Update total number

    $(".swiper-number-total")
    .text(numberWithZero(data.length));



    /*
    IMPORTANT:
    Re-run the original Webflow swiper
    AFTER API data exists
    */


    initSlider();



})

.catch(error => {

    console.error("API ERROR:", error);

});





function numberWithZero(num) {

    return num < 10 ? "0" + num : num;

}





function initSlider(){


$(".slider-gallery_component").each(function () {


    let totalSlides = $(this)
    .find(".swiper-slide.is-slider-thumbs")
    .length;


    $(".swiper-number-total")
    .text(numberWithZero(totalSlides));



    const bgSwiper = new Swiper(
        $(this).find(".swiper.is-slider-bg")[0],
        {

        slidesPerView:1,

        speed:400,

        effect:"fade",

        allowTouchMove:false

        }
    );




    const thumbsSwiper = new Swiper(
        $(this).find(".swiper.is-slider-thumbs")[0],
        {

        slidesPerView:1,

        speed:600,

        loop:true,

        loopedSlides:totalSlides,

        slideToClickedSlide:true

        }
    );





    const textSwiper = new Swiper(
        $(this).find(".swiper.is-slider-titles")[0],
        {

        slidesPerView:"auto",

        speed:600,

        loop:true,

        loopedSlides:totalSlides,

        slideToClickedSlide:true,


        mousewheel:true,

        keyboard:true,


        centeredSlides:true,


        slideActiveClass:"is-active",

        slideDuplicateActiveClass:"is-active",



        thumbs:{
            swiper:bgSwiper
        },


        navigation:{

            nextEl:$(this).find(".swiper-next")[0],

            prevEl:$(this).find(".swiper-prev")[0]

        }


        }
    );




    // CONNECT SLIDERS

    textSwiper.controller.control = thumbsSwiper;

    thumbsSwiper.controller.control = textSwiper;




    // COUNTER

    textSwiper.on(
        "slideChange",
        function(e){

            $(".swiper-number-current")
            .text(
                numberWithZero(e.realIndex + 1)
            );

        }
    );



});


}

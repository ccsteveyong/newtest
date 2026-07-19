const API = "https://script.google.com/macros/s/AKfycbyS2-C9UbYSoFpTJmDoBpjnKwdqRynm3mx-cDcKxKSKR8Y6MaODCtMNjtzAmlyTvLY1/exec";


function numberWithZero(num){
    return num < 10 ? "0"+num : num;
}


fetch(API)

.then(response => response.json())

.then(data => {


console.log("API Loaded:", data);



const bgWrapper =
document.querySelector(".swiper-wrapper.is-slider-bg");


const titleWrapper =
document.querySelector(".swiper-wrapper.is-slider-titles");


// Remove Webflow placeholders

bgWrapper.innerHTML="";
titleWrapper.innerHTML="";



data.forEach(item=>{


// IMAGE SLIDE

bgWrapper.insertAdjacentHTML(
"beforeend",

`
<div class="swiper-slide">

<img 
src="${item.image}"
class="slider-bg_img">

</div>
`

);




// TITLE SLIDE

titleWrapper.insertAdjacentHTML(
"beforeend",

`
<div class="swiper-slide">

<div class="year">
${item.year}
</div>


<p class="slider-titles_heading">
${item.title}
</p>

</div>
`

);


});





// IMAGE SLIDER

const bgSwiper = new Swiper(
".swiper.is-slider-bg",
{

slidesPerView:1,

speed:400,

effect:"fade",

allowTouchMove:false,


}
);






// TITLE SLIDER

const textSwiper = new Swiper(
".swiper.is-slider-titles",
{

slidesPerView:"auto",

speed:600,


loop:true,

loopedSlides:data.length,


centeredSlides:true,


slideActiveClass:"is-active",

slideDuplicateActiveClass:"is-active",



slideToClickedSlide:true,


mousewheel:true,


keyboard:{
enabled:true,
onlyInViewport:true
},



navigation:{

nextEl:".swiper-next",

prevEl:".swiper-prev"

}


}

);





// CONNECT IMAGE + TEXT

textSwiper.controller.control = bgSwiper;

bgSwiper.controller.control = textSwiper;





// UPDATE COUNTER

textSwiper.on("slideChange", function(e){

document.querySelector(".swiper-number-current").textContent =
numberWithZero(e.realIndex + 1);

});



document.querySelector(".swiper-number-total").textContent =
numberWithZero(data.length);



});

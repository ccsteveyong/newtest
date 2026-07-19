const API = "https://script.google.com/macros/s/AKfycbyS2-C9UbYSoFpTJmDoBpjnKwdqRynm3mx-cDcKxKSKR8Y6MaODCtMNjtzAmlyTvLY1/exec";


fetch(API)

.then(response => response.json())

.then(data => {


const bgWrapper =
document.querySelector(".swiper-wrapper.is-slider-bg");


const titleWrapper =
document.querySelector(".swiper-wrapper.is-slider-titles");


bgWrapper.innerHTML="";
titleWrapper.innerHTML="";



data.forEach(item=>{


bgWrapper.insertAdjacentHTML("beforeend",`

<div class="swiper-slide">

<img src="${item.image}" class="slider-bg_img">

</div>

`);



titleWrapper.insertAdjacentHTML("beforeend",`

<div class="swiper-slide">

<div class="year">
${item.year}
</div>

<p class="slider-titles_heading">
${item.title}
</p>

</div>

`);

});



const bgSwiper = new Swiper(".swiper.is-slider-bg",{

slidesPerView:1,

speed:400,

effect:"fade",

allowTouchMove:false

});



const textSwiper = new Swiper(".swiper.is-slider-titles",{

slidesPerView:"auto",

speed:600,

centeredSlides:true,

navigation:{
nextEl:".swiper-next",
prevEl:".swiper-prev"
},

slideActiveClass:"is-active"

});



textSwiper.controller.control = bgSwiper;
bgSwiper.controller.control = textSwiper;


});

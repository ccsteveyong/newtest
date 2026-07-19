const API = "https://script.google.com/macros/s/AKfycbyS2-C9UbYSoFpTJmDoBpjnKwdqRynm3mx-cDcKxKSKR8Y6MaODCtMNjtzAmlyTvLY1/exec";


function numberWithZero(num){
    return num < 10 ? "0"+num : num;
}


fetch(API)

.then(response => response.json())

.then(data => {


console.log(data);



const bgWrapper =
document.querySelector(".swiper-wrapper.is-slider-bg");


const titleWrapper =
document.querySelector(".swiper-wrapper.is-slider-titles");


// Remove Webflow placeholder

bgWrapper.innerHTML="";
titleWrapper.innerHTML="";



data.forEach(item=>{


// IMAGE

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




// TEXT

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


});



// INIT SWIPER AFTER DATA EXISTS


const bgSwiper = new Swiper(
".swiper.is-slider-bg",
{
slidesPerView:1,
speed:400,
effect:"fade",
allowTouchMove:false
}
);



const textSwiper = new Swiper(
".swiper.is-slider-titles",
{

slidesPerView:"auto",

speed:600,

loop:true,

loopedSlides:data.length,

centeredSlides:true,

navigation:{

nextEl:".swiper-next",

prevEl:".swiper-prev"

},

slideActiveClass:"is-active"

}

);



textSwiper.controller.control = bgSwiper;



});

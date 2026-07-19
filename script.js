const API = "https://script.google.com/macros/s/AKfycbyS2-C9UbYSoFpTJmDoBpjnKwdqRynm3mx-cDcKxKSKR8Y6MaODCtMNjtzAmlyTvLY1/exec";


function numberWithZero(num){
    return num < 10 ? "0" + num : num;
}



fetch(API)

.then(response => response.json())

.then(data => {


console.log("API:", data);



const bgWrapper = document.querySelector(".swiper-wrapper.is-slider-bg");

const titleWrapper = document.querySelector(".swiper-wrapper.is-slider-titles");

const thumbWrapper = document.querySelector(".swiper-wrapper.is-slider-thumbs");



// remove Webflow dummy slides

bgWrapper.innerHTML = "";

titleWrapper.innerHTML = "";

thumbWrapper.innerHTML = "";




// CREATE SLIDES

data.forEach(item => {



bgWrapper.insertAdjacentHTML(
"beforeend",

`
<div class="swiper-slide is-slider-bg">

<img src="${item.image}" class="slider-bg_img">

</div>
`

);




titleWrapper.insertAdjacentHTML(
"beforeend",

`
<div class="swiper-slide is-slider-titles">

<div class="year">
${item.year}
</div>

<div class="content">
${
Array.isArray(item.content)
?
item.content.map(text => `<div>${text}</div>`).join("")
:
item.content || ""
}
</div>

<p class="slider-titles_heading">
${item.title}
</p>


</div>
`

);





// thumbnails use same image

thumbWrapper.insertAdjacentHTML(
"beforeend",

`
<div class="swiper-slide is-slider-thumbs">

<div class="slider-thumbs_height">

<img src="${item.image}" class="slider-thumbs_img">

</div>

</div>
`

);



});





initSlider(data.length);



});






function initSlider(total){



$(".swiper-number-total")
.text(numberWithZero(total));




const component = $(".slider-gallery_component");



const bgSwiper = new Swiper(
component.find(".swiper.is-slider-bg")[0],
{

slidesPerView:1,

speed:400,

effect:"fade",

allowTouchMove:false

}

);





const thumbsSwiper = new Swiper(
component.find(".swiper.is-slider-thumbs")[0],
{

slidesPerView:1,

speed:600,

loop:true,

loopedSlides:total,

slideToClickedSlide:true

}

);






const textSwiper = new Swiper(
component.find(".swiper.is-slider-titles")[0],
{

slidesPerView:"auto",

speed:600,

loop:true,

loopedSlides:total,

slideToClickedSlide:true,


mousewheel:true,

keyboard:true,


centeredSlides:true,


slideActiveClass:"is-active",

slideDuplicateActiveClass:"is-active",



navigation:{


nextEl:".swiper-next",

prevEl:".swiper-prev"


},


thumbs:{

swiper:bgSwiper

}


}

);






// CONNECT

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


});



}

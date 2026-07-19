const API = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS0CJyg0GCJHzOcI28Mc70EDiUea3kWU9QtzeaJAZT_vJ1ZVZejSWJTQt_zqW7jANs2rVvwdONlVeUCAgD236xWz6tzbKJkfYDfYkxVwmG7KMCdJuEKUJPNPcS8MJqcR8p5GyH2nb6eXiChLK3ryl59ByPuKhgnBnlyeAp5ZGKyaafrUOMtqtx7Tuq6_Crf5u5QRQHaiaPUDNqSBqU9ozvjeAqmI134sWj-ZdvqtD0Oz8LQZMNaagFxZqGk3MSUiwY4tNcjNT-NkWCJUNOcD7_QSC48TA&lib=M4Bv-ARtfVX03mmcIP3dWBKV8G9BMDobo";

function numberWithZero(num) {
    return num < 10 ? "0" + num : num;
}


fetch("API")
.then(response => response.json())
.then(data => {


const bgWrapper =
document.querySelector(".is-slider-bg.swiper-wrapper");


const titleWrapper =
document.querySelector(".is-slider-titles.swiper-wrapper");


const thumbWrapper =
document.querySelector(".is-slider-thumbs.swiper-wrapper");



data.forEach(item => {


/*
BACKGROUND IMAGE
*/

bgWrapper.innerHTML += `

<div class="swiper-slide is-slider-bg">

<img 
src="${item.image}" 
class="slider-bg_img">

</div>

`;



/*
TITLE CONTENT
*/

let contentHTML = "";

item.content.forEach(text=>{

contentHTML += `
<li>${text}</li>
`;

});


titleWrapper.innerHTML += `

<div class="swiper-slide is-slider-titles">

<div class="slider-titles_heading">

${item.title}

</div>


<div id="year">

${item.year}

</div>


<ul id="content-list">

${contentHTML}

</ul>


</div>

`;



/*
THUMBNAILS
*/


thumbWrapper.innerHTML += `

<div class="swiper-slide is-slider-thumbs">

<div class="slider-thumbs_height">

<img 
src="${item.thumbnail}"
class="slider-thumbs_img">

</div>

</div>

`;



});



let totalSlides = numberWithZero(data.length);

$(".swiper-number-total")
.text(totalSlides);



/*
SWIPER INITIALIZATION
*/


const bgSwiper = new Swiper(".swiper.is-slider-bg",{

slidesPerView:1,

speed:400,

effect:"fade",

allowTouchMove:false

});



const thumbsSwiper = new Swiper(".swiper.is-slider-thumbs",{


slidesPerView:1,

speed:600,

loop:true,

loopedSlides:data.length,

slideToClickedSlide:true


});




const textSwiper = new Swiper(".swiper.is-slider-titles",{


slidesPerView:"auto",

speed:600,

loop:true,

loopedSlides:data.length,


centeredSlides:true,

mousewheel:true,

keyboard:true,


slideActiveClass:"is-active",

slideDuplicateActiveClass:"is-active",



navigation:{

nextEl:".swiper-next",

prevEl:".swiper-prev"

}


});



/*
CONNECT SLIDERS
*/


textSwiper.controller.control =
thumbsSwiper;


thumbsSwiper.controller.control =
textSwiper;


textSwiper.controller.control =
bgSwiper;



textSwiper.on("slideChange",function(e){


let current =
numberWithZero(e.realIndex+1);


$(".swiper-number-current")
.text(current);


});



});

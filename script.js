const API = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS0CJyg0GCJHzOcI28Mc70EDiUea3kWU9QtzeaJAZT_vJ1ZVZejSWJTQt_zqW7jANs2rVvwdONlVeUCAgD236xWz6tzbKJkfYDfYkxVwmG7KMCdJuEKUJPNPcS8MJqcR8p5GyH2nb6eXiChLK3ryl59ByPuKhgnBnlyeAp5ZGKyaafrUOMtqtx7Tuq6_Crf5u5QRQHaiaPUDNqSBqU9ozvjeAqmI134sWj-ZdvqtD0Oz8LQZMNaagFxZqGk3MSUiwY4tNcjNT-NkWCJUNOcD7_QSC48TA&lib=M4Bv-ARtfVX03mmcIP3dWBKV8G9BMDobo";

function numberWithZero(num) {
    return num < 10 ? "0" + num : num;
}


document.addEventListener("DOMContentLoaded", () => {


fetch("data.json")
.then(response => response.json())
.then(data => {


console.log("JSON Loaded:", data);



const bgWrapper = document.querySelector(".swiper-wrapper.is-slider-bg");
const titleWrapper = document.querySelector(".swiper-wrapper.is-slider-titles");
const thumbWrapper = document.querySelector(".swiper-wrapper.is-slider-thumbs");



data.forEach(item => {



/* BACKGROUND */

bgWrapper.insertAdjacentHTML("beforeend",`

<div class="swiper-slide is-slider-bg">

<img 
src="${item.image}" 
class="slider-bg_img">

</div>

`);





/* TITLE */

let content = "";

item.content.forEach(text => {

content += `<li>${text}</li>`;

});


titleWrapper.insertAdjacentHTML("beforeend",`

<div class="swiper-slide is-slider-titles">


<div class="slider-titles_heading">

${item.title}

</div>


<div id="year">

${item.year}

</div>


<ul id="content-list">

${content}

</ul>


</div>

`);





/* THUMB */


thumbWrapper.insertAdjacentHTML("beforeend",`

<div class="swiper-slide is-slider-thumbs">

<div class="slider-thumbs_height">

<img 
src="${item.thumbnail}"
class="slider-thumbs_img">

</div>

</div>

`);

});




/*
UPDATE COUNTER
*/

$(".swiper-number-total")
.text(numberWithZero(data.length));





/*
INITIALIZE SWIPER AFTER DATA EXISTS
*/


const bgSwiper = new Swiper(".swiper.is-slider-bg", {


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

slideToClickedSlide:true,


mousewheel:true,

keyboard:true,


centeredSlides:true,


slideActiveClass:"is-active",

slideDuplicateActiveClass:"is-active",


navigation:{


nextEl:".swiper-next",

prevEl:".swiper-prev"


}


});




/*
CONNECT
*/


textSwiper.controller.control = thumbsSwiper;

thumbsSwiper.controller.control = textSwiper;

textSwiper.controller.control = bgSwiper;





textSwiper.on("slideChange", function(e){


$(".swiper-number-current")
.text(
numberWithZero(e.realIndex + 1)
);


});



})
.catch(error=>{

console.error("JSON ERROR:",error);

});


});

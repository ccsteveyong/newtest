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



// Remove Webflow placeholder slides

bgWrapper.innerHTML = "";

titleWrapper.innerHTML = "";

thumbWrapper.innerHTML = "";




// CREATE SLIDES

data.forEach(item => {



// =====================
// BACKGROUND IMAGE
// =====================

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





// =====================
// DYNAMIC CONTENT
// Detect content1, content2, content3...
// =====================


let contentHTML = "";


Object.keys(item)

.filter(key => key.startsWith("content"))

.forEach(key => {


    if(item[key] && item[key].trim() !== ""){


        contentHTML += `

        <div class="content-item">
            ${item[key]}
        </div>

        `;


    }


});






// =====================
// TITLE SLIDE
// =====================


titleWrapper.insertAdjacentHTML(
"beforeend",

`
<div class="swiper-slide is-slider-titles">


<div class="year">

${item.year || ""}

</div>



<div id="content">

${contentHTML}

</div>




<p class="slider-titles_heading">

${item.title || ""}

</p>



</div>
`

);






// =====================
// THUMBNAIL
// =====================


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






initSlider(data.length);





})

.catch(error => {

console.error("API ERROR:", error);

});









function initSlider(total){



// UPDATE TOTAL NUMBER

$(".swiper-number-total")
.text(numberWithZero(total));





const component = $(".slider-gallery_component");






// =====================
// BACKGROUND SWIPER
// =====================


const bgSwiper = new Swiper(

component.find(".swiper.is-slider-bg")[0],

{

slidesPerView:1,

speed:400,

effect:"fade",

allowTouchMove:false


}

);







// =====================
// THUMB SWIPER
// =====================


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







// =====================
// TITLE SWIPER
// =====================


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


nextEl: component.find(".swiper-next")[0],

prevEl: component.find(".swiper-prev")[0]


},





thumbs:{


swiper:bgSwiper


}



}

);








// =====================
// CONNECT SLIDERS
// =====================


textSwiper.controller.control = thumbsSwiper;

thumbsSwiper.controller.control = textSwiper;









// =====================
// UPDATE COUNTER
// =====================


textSwiper.on(

"slideChange",

function(e){


$(".swiper-number-current")

.text(

numberWithZero(e.realIndex + 1)

);


}

);



}

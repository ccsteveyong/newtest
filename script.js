const API = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS0CJyg0GCJHzOcI28Mc70EDiUea3kWU9QtzeaJAZT_vJ1ZVZejSWJTQt_zqW7jANs2rVvwdONlVeUCAgD236xWz6tzbKJkfYDfYkxVwmG7KMCdJuEKUJPNPcS8MJqcR8p5GyH2nb6eXiChLK3ryl59ByPuKhgnBnlyeAp5ZGKyaafrUOMtqtx7Tuq6_Crf5u5QRQHaiaPUDNqSBqU9ozvjeAqmI134sWj-ZdvqtD0Oz8LQZMNaagFxZqGk3MSUiwY4tNcjNT-NkWCJUNOcD7_QSC48TA&lib=M4Bv-ARtfVX03mmcIP3dWBKV8G9BMDobo";

fetch(API)
.then(res => res.json())
.then(data => {

    const item = data[0];

    document.getElementById("year").textContent = item.year;

    document.getElementById("title").textContent = item.title;

    document.getElementById("image").src = item.image;

    const list = document.getElementById("content-list");

    item.contents.forEach(content => {

        list.innerHTML += `<li>${content}</li>`;

    });

});

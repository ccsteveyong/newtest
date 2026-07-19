const API = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS0CJyg0GCJHzOcI28Mc70EDiUea3kWU9QtzeaJAZT_vJ1ZVZejSWJTQt_zqW7jANs2rVvwdONlVeUCAgD236xWz6tzbKJkfYDfYkxVwmG7KMCdJuEKUJPNPcS8MJqcR8p5GyH2nb6eXiChLK3ryl59ByPuKhgnBnlyeAp5ZGKyaafrUOMtqtx7Tuq6_Crf5u5QRQHaiaPUDNqSBqU9ozvjeAqmI134sWj-ZdvqtD0Oz8LQZMNaagFxZqGk3MSUiwY4tNcjNT-NkWCJUNOcD7_QSC48TA&lib=M4Bv-ARtfVX03mmcIP3dWBKV8G9BMDobo";

fetch(API)

.then(res => res.json())

.then(data => {

    const timeline = document.getElementById("timeline");

    data.forEach(item => {

        const div = document.createElement("div");

        div.className = "timeline-item";

        div.innerHTML = `
        
            <img class="timeline-image" src="${item.image}" alt="${item.title}">

            <div class="year">${item.year}</div>

            <div class="title">${item.title}</div>

            <ul>

            ${
                item.contents
                ?
                item.contents
                    .map(text => `<li>${text}</li>`)
                    .join("")
                :
                ""
            }

            </ul>

        `;

        timeline.appendChild(div);

    });

});

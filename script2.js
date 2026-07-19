const API = "https://script.google.com/macros/s/AKfycbyS2-C9UbYSoFpTJmDoBpjnKwdqRynm3mx-cDcKxKSKR8Y6MaODCtMNjtzAmlyTvLY1/exec";


fetch(API)

.then(response => response.json())

.then(data => {

    console.log("API Loaded:", data);


    data.forEach(item => {

        console.log({
            image: item.image,
            title: item.title,
            year: item.year
        });


    });


})

.catch(error => {

    console.error("API Error:", error);

});

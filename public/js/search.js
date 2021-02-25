
let id = getUrlId()["id"];
let bulletinBoard = document.getElementById('bulletin-board');
let searchButton = document.getElementById('search-button');
let searchArea = document.getElementById('search-area');
let searchResult = document.getElementById('search-result');


function getUrlId() {
    let id = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        id[key] = value;
    });
    return id;
};

let ad = document.getElementsByClassName('bulletin')

let newAdID = function () {
    for (var i = 0; i < ad.length; i++) {
        ad[i].id = i
        ad[i].addEventListener("click", function () {
            document.location.href = `http://localhost:3000/search/single-ad?id=${this.id}`
        });
    };
};


searchButton.addEventListener('click', function () {
    bulletinBoard.innerHTML = "";
    let searchingValue = searchArea.value;
    searchData(searchingValue);
});

let numberOfElement = 0

let searchData = function (search) {


    fetch(`http://localhost:3000/api/search/${search}`)
        .then(result => {
            numberOfElement = 0
            return result.json()
        })
        .then(data => {
            data.forEach(element => {
                numberOfElement++
                bulletinBoard.innerHTML = bulletinBoard.innerHTML + `<div class="bulletin"><div class="bulletin-name"> ${element.productName} </div><div class="bulletin-description"> ${element.description} </div></div>`;
                newAdID()
            });
            searchResult.innerHTML = `<span>"${decodeURI(search)}": ${numberOfElement} search results</span>`

            if (localStorage.getItem('theme') == 'black') {
                blackTheme()
            } else {
                whiteTheme()
            }
        })
}
searchData(id)


let blackTheme = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/dusk/64/000000/search--v1.png"/>`
    document.body.classList.add('black-body');
    document.querySelector('#go-back a').classList.add('go-back-night')
    document.querySelector('#search-area').classList.add('black-input');
    document.querySelector('#search-button').classList.add('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.add('black-input')
    });

};

let whiteTheme = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/pastel-glyph/64/000000/search--v1.png"/>`
    document.body.classList.remove('black-body');
    document.querySelector('#go-back a').classList.remove('go-back-night')
    document.querySelector('#search-area').classList.remove('black-input');
    document.querySelector('#search-button').classList.remove('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.remove('black-input')
    });
};


if (localStorage.getItem('theme') == 'black') {
    blackTheme()
} else {
    whiteTheme()
}
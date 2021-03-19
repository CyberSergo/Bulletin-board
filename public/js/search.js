
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
        ad[i].addEventListener("click", function () {
            console.log(this.productName)
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
                console.log(element)
                numberOfElement++
                bulletinBoard.innerHTML = bulletinBoard.innerHTML + `<div class="bulletin" id=${element.id}><div class="bulletin-name"> ${element.productName} </div><div class="bulletin-description"> ${element.description} </div></div>`;
                newAdID()
            });
            searchResult.innerHTML = `<span>"${decodeURI(search)}": ${numberOfElement} search results</span>`

            if (localStorage.getItem('theme') == 'black') {
                document.querySelectorAll('.bulletin').forEach(div => {
                    div.classList.add('black-input')
                });
            } else {
                document.querySelectorAll('.bulletin').forEach(div => {
                    div.classList.remove('black-input')
                });
            }
        })
}
searchData(id)

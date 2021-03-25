// let form = document.getElementById('form');
let bulletinBoard = document.getElementById('bulletin-board');
let page = document.querySelectorAll('#pages div');
let ad = document.getElementsByClassName('bulletin');
let pagesBlock = document.getElementById('pages');
let searchButton = document.getElementById('search-button');
let searchInput = document.getElementById('search-area');
let siteMode = document.getElementById('site-mode');
let userMenu = document.getElementById('user-menu')
let tags = document.getElementsByClassName('tag')

let serverPath = "http://localhost:3000";
const xhttp = new XMLHttpRequest;
let numberOfPages = serverPath + "/api/number-of-pages/";
let filter = 'unfilter'

let newAdID = function () {
    for (var i = 0; i < ad.length; i++) {
        ad[i].addEventListener("click", function () {
            document.location.href = `${serverPath}/single-ad?id=${this.id}`
        });
    };
};

userMenu.addEventListener('click', event => {
    window.location = `${serverPath}/user/add-bulletin`
})

let LoadSixAds = function (number) {
    if (number == undefined) {
        number = 1
    }
    bulletinBoard.innerHTML = ""
    fetch(serverPath + `/api/page/${number}/${filter}`)
        .then(result => {
            return result.json()
        })
        .then(data => {
            data.forEach(element => {
                bulletinBoard.innerHTML = bulletinBoard.innerHTML + `<div class="bulletin" id=${element.id}><div class="bulletin-name"> ${element.productName} </div><div class="bulletin-description"> ${element.description} </div><div class="bulletin-category"> ${element.category} </div></div>`;

            });
            newAdID()
            if (localStorage.getItem('theme') == 'black') {
                document.querySelectorAll('.bulletin').forEach(div => {
                    div.classList.add('black-input');
                });
            } else {
                document.querySelectorAll('.bulletin').forEach(div => {
                    div.classList.remove('black-input')
                });
            }
        })
}   
LoadSixAds();

let allPages = function () {
    pagesBlock.innerHTML = ""
    fetch(numberOfPages)
        .then(result => {
            return result.json()
        })
        .then(data => {
            for (let i = 1; i <= data; i++) {
                let div = document.createElement('div');
                div.className = "number-of-page"
                div.innerHTML = i;
                pagesBlock.appendChild(div)
            }
            let page = document.querySelectorAll('#pages div')
            page.forEach(element => {

                element.addEventListener('click', function () {
                    let active = document.querySelector('#pages div.on-focus')
                    if (active) {
                        active.classList.remove('on-focus')
                    }


                    this.classList.add('on-focus')
                    let number = element.innerHTML
                    fetch(`${serverPath}/api/page/${number}/${filter}`)
                        .then(LoadSixAds(number))
                })
            })
        })
}
allPages()

searchButton.addEventListener('click', function () {
    document.location.href = `${serverPath}/search?id=${searchInput.value}`
});

function filterNew() {
    filter = 'filterNew';
    LoadSixAds()
};

function filterUsed() {
    filter = 'filterUsed';
    LoadSixAds()
};

function unfilter() {
    window.location = serverPath
}


for (let i = 0; i < tags.length; i++) {
    const element = tags[i];
    element.addEventListener('click', function() {
       window.location = `http://localhost:3000/search?id=${this.innerHTML.replace('#', '')}`  
    }); 
};
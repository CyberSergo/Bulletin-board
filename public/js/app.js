let form = document.getElementById('form');
let bulletinBoard = document.getElementById('bulletin-board');
let page = document.querySelectorAll('#pages div');
let ad = document.getElementsByClassName('bulletin');
let pagesBlock = document.getElementById('pages');
let searchButton = document.getElementById('search-button');
let searchInput = document.getElementById('search-area');
let siteMode = document.getElementById('site-mode');

let serverPath = "http://localhost:3000";
const xhttp = new XMLHttpRequest;
let numberOfPages = serverPath + "/api/number-of-pages/";


let newAdID = function () {
    for (var i = 0; i < ad.length; i++) {
        ad[i].addEventListener("click", function () {
                document.location.href = `${serverPath}/single-ad?id=${this.id}`
        });
    };
};

 

form.addEventListener('submit', event => {

    event.preventDefault()

    let data = {};

    for (let i = 0; i < form.length; i++) {
        let input = form[i];
        if (input.name) {
            data[input.name] = input.value;
        }
    }

    xhttp.open(form.method, form.action, true);
    xhttp.setRequestHeader('Content-Type', "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(this.responseText)
        }
    }

    xhttp.send(JSON.stringify(data));

    xhttp.onloadend = function () {
        if (this.responseText !== 'Error') {
            bulletinBoard.innerHTML = ""
            LoadSixAds();
            newAdID()
            allPages()
        }
    };

    form.productName.value = "";
    form.description.value = "";
});


let LoadSixAds = function (number) {
    if(number == undefined) {
        number = 1
    }
    bulletinBoard.innerHTML = ""
    fetch(serverPath + `/api/page/${number}`)
        .then(result => {
            return result.json()
        })
        .then(data => {
            data.forEach(element => {
                bulletinBoard.innerHTML = bulletinBoard.innerHTML + `<div class="bulletin" id=${element.id}><div class="bulletin-name"> ${element.productName} </div><div class="bulletin-description"> ${element.description} </div></div>`;
                
            });
             newAdID()
            if (localStorage.getItem('theme') == 'black') {
                blackTheme()
            } else {
                whiteTheme()
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
                    fetch(`${serverPath}/api/page/${number}`)
                        .then(LoadSixAds(number))
                })
            })
        })
}
allPages()

searchButton.addEventListener('click', function () {
    document.location.href = `${serverPath}/search?id=${searchInput.value}`
});

// Local storage change theme

siteMode.addEventListener('click', function () {
    if (localStorage.getItem('theme') == 'black') {
        localStorage.setItem('theme', 'white')
        whiteTheme()
    } else if (localStorage.getItem('theme') == undefined) {
        localStorage.setItem('theme', 'black')
        blackTheme()

    } else {
        localStorage.setItem('theme', 'black')
        blackTheme()
    }
})


//Themes:

let blackTheme = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/dusk/64/000000/search--v1.png"/>`
    document.querySelector('#site-mode').innerHTML = `<img src="https://img.icons8.com/office/480/000000/sun--v1.png"/>`
    document.body.classList.add('black-body');
    document.querySelector('.product-name input').classList.add('black-input');
    document.querySelector('.description textarea').classList.add('black-input');
    document.querySelector('.buttons button').classList.add('black-button');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.add('black-input');
    });
    document.querySelector('#search-button').classList.add('black-body');
    document.querySelector('#search-area').classList.add('black-input');
};

let whiteTheme = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/pastel-glyph/64/000000/search--v1.png"/>`
    document.querySelector('#site-mode').innerHTML = `<img src="https://img.icons8.com/plasticine/100/000000/crescent-moon.png"/>`
    document.body.classList.remove('black-body');
    document.querySelector('.product-name input').classList.remove('black-input');
    document.querySelector('.description textarea').classList.remove('black-input');
    document.querySelector('.buttons button').classList.remove('black-button');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.remove('black-input')
    });
    document.querySelector('#search-button').classList.remove('black-body');
    document.querySelector('#search-area').classList.remove('black-input');
};


if (localStorage.getItem('theme') == 'black') {
    blackTheme()
} else {
    whiteTheme()
}


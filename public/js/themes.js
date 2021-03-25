
if (window.location.pathname == '/') {
    let siteModeX = document.getElementById('site-mode');

    siteModeX.addEventListener('click', function () {
        if (localStorage.getItem('theme') == 'black') {
            localStorage.setItem('theme', 'white')
            whiteThemeHP()
        } else if (localStorage.getItem('theme') == undefined) {
            localStorage.setItem('theme', 'black')
            blackThemeHP()

        } else {
            localStorage.setItem('theme', 'black')
            blackThemeHP()
        }
    })
}

// Themes for Home Page

let blackThemeHP = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/dusk/64/000000/search--v1.png"/>`
    document.querySelector('#site-mode').innerHTML = `<img src="https://img.icons8.com/office/480/000000/sun--v1.png"/>`
    document.querySelector('#user-menu').innerHTML = `<img src="https://img.icons8.com/plasticine/100/000000/user-menu-male.png"/>`
    document.body.classList.add('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.add('black-input');
    });
    document.querySelector('#filter-blocks').classList.add('filter-black')
    document.querySelector('#filter').classList.add('black-input');
    document.querySelector('#search-button').classList.add('black-body');
    document.querySelector('#search-area').classList.add('black-input');
};

let whiteThemeHP = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/pastel-glyph/64/000000/search--v1.png"/>`
    document.querySelector('#site-mode').innerHTML = `<img src="https://img.icons8.com/plasticine/100/000000/crescent-moon.png"/>`
    document.querySelector('#user-menu').innerHTML = `<img src="https://img.icons8.com/carbon-copy/100/000000/user-menu-male.png"/>`
    document.body.classList.remove('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.remove('black-input')
    });
    document.querySelector('#filter-blocks').classList.remove('filter-black')
    document.querySelector('#filter').classList.remove('black-input');
    document.querySelector('#search-button').classList.remove('black-body');
    document.querySelector('#search-area').classList.remove('black-input');
};

// Themes for Single page

let blackThemeSingle = function () {
    document.body.classList.add('black-body');
    document.querySelector('#go-back a').classList.add('go-back-night');
    document.querySelector('#ad-name').classList.add('black-input');
    description.classList.add('black-input');
};

let whiteThemeSingle = function () {
    document.body.classList.remove('black-body');
    document.querySelector('#go-back a').classList.remove('go-back-night');
    document.querySelector('#ad-name').classList.remove('black-input');
    description.classList.remove('black-input');
};

// Themes for Search page

let blackThemeSearch = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/dusk/64/000000/search--v1.png"/>`
    document.body.classList.add('black-body');
    document.querySelector('#go-back a').classList.add('go-back-night')
    document.querySelector('#search-area').classList.add('black-input');
    document.querySelector('#search-button').classList.add('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.add('black-input')
    });

};

let whiteThemeSearch = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/pastel-glyph/64/000000/search--v1.png"/>`
    document.body.classList.remove('black-body');
    document.querySelector('#go-back a').classList.remove('go-back-night')
    document.querySelector('#search-area').classList.remove('black-input');
    document.querySelector('#search-button').classList.remove('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.remove('black-input')
    });
};

//Themes for user/add-bulletin page 

let blackThemeUser = function () {
    document.body.classList.add('black-body');
    document.querySelector('.product-name input').classList.add('black-input');
    document.querySelector('.description textarea').classList.add('black-input');
    document.querySelector('.buttons button').classList.add('black-button');
    document.querySelector('#go-back a').classList.add('go-back-night');
}

let whiteThemeUser = function () {
    document.body.classList.remove('black-body');
    document.querySelector('.product-name input').classList.remove('black-input');
    document.querySelector('.description textarea').classList.remove('black-input');
    document.querySelector('.buttons button').classList.remove('black-button');
    document.querySelector('#go-back a').classList.remove('go-back-night');
}

switch (window.location.pathname) {
    case "/":
        switch (localStorage.getItem('theme')) {
            case "black":
                blackThemeHP();
                break;
            default:
                whiteThemeHP();
        };
        break;
    case "/single-ad":
        switch (localStorage.getItem('theme')) {
            case "black":
                blackThemeSingle();
                break;
            default:
                whiteThemeSingle();
        };
        break;
    case "/search":
        switch (localStorage.getItem('theme')) {
            case "black":
                blackThemeSearch();
                break;
            default:
                whiteThemeSearch();
        };
        break;
    case "/search/single-ad":
        switch (localStorage.getItem('theme')) {
            case "black":
                blackThemeSingle();
                break;
            default:
                whiteThemeSingle();
        };
        break;
    case "/user/add-bulletin":
        switch (localStorage.getItem('theme')) {
            case "black":
                blackThemeUser();
                break;
            default:
                whiteThemeUser();
        };
        break;
}


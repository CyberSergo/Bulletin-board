
// Themes for Home Page

let blackThemeHP = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/fluent/96/000000/search.png"/>`;
    document.querySelector('#site-mode').innerHTML = `<img src="https://img.icons8.com/fluent/48/000000/sun.png"/>`;
    document.querySelector('#user-menu').innerHTML = `<img src="https://img.icons8.com/fluent/96/000000/user-male-circle.png"/>`;
    document.body.classList.add('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.add('black-input');
    });
    document.querySelectorAll('.footer-block').forEach(div => {
        div.classList.add('black-input');
    });
    document.querySelector('#user-menu img').classList.add('black-user');
    document.querySelector('#filter-blocks').classList.add('filter-black');
    document.querySelector('#filter').classList.add('black-input');
    document.querySelector('#search-button').classList.add('black-body');
    document.querySelector('#search-area').classList.add('black-input');
};

let whiteThemeHP = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/ios/96/000000/search--v1.png"/>`;
    document.querySelector('#site-mode').innerHTML = `<img src="https://img.icons8.com/ios-glyphs/90/000000/bright-moon--v2.png"/>`;
    document.querySelector('#user-menu').innerHTML = `<img src="https://img.icons8.com/windows/96/000000/user-male-circle.png"/>`;
    document.body.classList.remove('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.remove('black-input');
    });
    document.querySelectorAll('.footer-block').forEach(div => {
        div.classList.remove('black-input');
    });
    document.querySelector('#filter-blocks').classList.remove('filter-black');
    document.querySelector('#filter').classList.remove('black-input');
    document.querySelector('#search-button').classList.remove('black-body');
    document.querySelector('#search-area').classList.remove('black-input');
};

// Themes for Single page

let blackThemeSingle = function () {
    document.body.classList.add('black-body');
    document.querySelector('#go-back p').classList.add('go-back-night');
    document.querySelector('#ad-name').classList.add('black-input');
    document.querySelectorAll('.tag-small-block').forEach(div => {
        div.classList.add('tag-small-block-black');
    })
    description.classList.add('black-input');
};

let whiteThemeSingle = function () {
    document.body.classList.remove('black-body');
    document.querySelector('#go-back p').classList.remove('go-back-night');
    document.querySelector('#ad-name').classList.remove('black-input');
    document.querySelectorAll('.tag-small-block').forEach(div => {
        div.classList.remove('tag-small-block-black');
    })
    description.classList.remove('black-input');
};

// Themes for Search page

let blackThemeSearch = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/fluent/96/000000/search.png"/>`;
    document.body.classList.add('black-body');
    document.querySelector('#go-back p').classList.add('go-back-night')
    document.querySelector('#search-area').classList.add('black-input');
    document.querySelector('#search-button').classList.add('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.add('black-input')
    });
    document.querySelectorAll('.footer-block').forEach(div => {
        div.classList.add('black-input');
    });
};

let whiteThemeSearch = function () {
    document.querySelector('#search-button').innerHTML = `<img src="https://img.icons8.com/ios/96/000000/search--v1.png"/>`;
    document.body.classList.remove('black-body');
    document.querySelector('#go-back p').classList.remove('go-back-night')
    document.querySelector('#search-area').classList.remove('black-input');
    document.querySelector('#search-button').classList.remove('black-body');
    document.querySelectorAll('.bulletin').forEach(div => {
        div.classList.remove('black-input')
    });
    document.querySelectorAll('.footer-block').forEach(div => {
        div.classList.remove('black-input');
    });
};

//Themes for user/add-bulletin page 

let blackThemeUser = function () {
    document.body.classList.add('black-body');
    document.querySelector('.product-name input').classList.add('black-input');
    document.querySelector('.description textarea').classList.add('black-input');
    document.querySelector('.buttons button').classList.add('black-button');
    document.querySelector('#go-back p').classList.add('go-back-night');
    document.querySelector('#tags').classList.add('black-input');
}

let whiteThemeUser = function () {
    document.body.classList.remove('black-body');
    document.querySelector('.product-name input').classList.remove('black-input');
    document.querySelector('.description textarea').classList.remove('black-input');
    document.querySelector('.buttons button').classList.remove('black-button');
    document.querySelector('#go-back p').classList.remove('go-back-night');
    document.querySelector('#tags').classList.remove('black-input');
}

// Themes for registration page 

let blackThemeRegistration = () => {
    document.body.classList.add('black-body');
    document.querySelectorAll('.input-block-inside input').forEach(div => {
        div.classList.add('black-input')
    });
    document.querySelector('.button-block-inside button').classList.add('black-button');
}

let whiteThemeRegistration = () => {
    document.body.classList.remove('black-body');
    document.querySelectorAll('.input-block-inside input').forEach(div => {
        div.classList.remove('black-input')
    });
    document.querySelector('.button-block-inside button').classList.remove('black-button');

}

// Themes for authorization page

let blackThemeAuthorization = () => {
    document.body.classList.add('black-body');
    document.querySelectorAll('.input-block-inside input').forEach(div => {
        div.classList.add('black-input')
    });
    document.querySelector('.button-block-inside button').classList.add('black-button');

}

let whiteThemeAuthorization = () => {
    document.body.classList.remove('black-body');
    document.querySelectorAll('.input-block-inside input').forEach(div => {
        div.classList.remove('black-input')
    });
    document.querySelector('.button-block-inside button').classList.remove('black-button');

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
    case "/user/registration":
        switch (localStorage.getItem('theme')) {
            case "black":
                blackThemeRegistration();
                break;
            default:
                whiteThemeRegistration();
        };
    case "/user/login":
        switch (localStorage.getItem('theme')) {
            case "black":
                blackThemeAuthorization();
                break;
            default:
                whiteThemeAuthorization();
        };
};
let id = getUrlId()["id"];
let productName = document.getElementById('ad-name');
let description = document.getElementById('ad-description');

function getUrlId() {
    let id = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        id[key] = value;
    });
    return id;
}


fetch(`http://localhost:3000/api/search/single-ad/${id}`)
    .then(result => {
        return result.json()
    })
    .then(data => {
        productName.innerHTML = data.productName;
        description.innerHTML = data.description;
    })



let blackTheme = function () {
    document.body.classList.add('black-body');
    document.querySelector('#go-back a').classList.add('go-back-night')
    document.querySelector('#ad-name').classList.add('black-input');
    description.classList.add('black-input');
};

let whiteTheme = function () {
    document.body.classList.remove('black-body');
    document.querySelector('#go-back a').classList.remove('go-back-night')
    document.querySelector('#ad-name').classList.remove('black-input');
    description.classList.remove('black-input');
};


if (localStorage.getItem('theme') == 'black') {
    blackTheme()
} else {
    whiteTheme()
}
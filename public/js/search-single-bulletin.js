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
        productName.innerHTML = data[0].productName;
        description.innerHTML = data[0].description;
    })

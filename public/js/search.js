
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
            document.location.href = `http://localhost:3000/single-ad?id=${this.id}`
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
    let emptySearch = new RegExp(/(..)/g)

    if (search.search(emptySearch) == 0) {
        fetch(`http://localhost:3000/api/search/${search.replace('#', '')}`)
            .then(result => {
                numberOfElement = 0
                return result.json()
            })
            .then(data => {
                let dataHTML = "";
                data.forEach(element => {
                    let tagsJSON = element.tags.replace("[", "").replace("]", "").replaceAll(`"`, ``);
                    let descriptionBr = element.description.replace(/\n/g, "<br />")
                    numberOfElement++
                    dataHTML = dataHTML + `<div class="bulletin" id=${element.id}><div class="bulletin-name"> ${element.productName} </div><div class="bulletin-description"> ${descriptionBr} </div><div class="footer-block"><div class="tags-hp">${tagsJSON}</div><div class="bulletin-category"> ${element.category} </div></div></div>`;
                });
                bulletinBoard.innerHTML = dataHTML;
                newAdID()
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
    } else {
        alert('Not enough values ​​to search')
    }


}
searchData(id)

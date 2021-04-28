let id = getUrlId()["id"];
let productName = document.getElementById('ad-name');
let description = document.getElementById('ad-description');
let tagBlock = document.getElementById('tags-bulletin');

let serverPath = "http://localhost:3000";

function getUrlId() {
    let id = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        id[key] = value;
    });
    return id;
};


fetch(`${serverPath}/api/single-ad/${id}`)
    .then(result => {
        return result.json()
    })
    .then(data => {
        let descriptionBr = data[0].description.replace(/\n/g, "<br />")

        productName.innerHTML = data[0].productName;
        description.innerHTML = descriptionBr;
        
        if (data[0].tags != '') {
           let tagsArr = data[0].tags.split(',')

        tagsArr.forEach(tag => {
            tagBlock.innerHTML += `<div class="tag-big-block"><div class='tag-small-block'>${tag.trim().replace("[", "").replace("]", "").replaceAll(`"`, ``)}</div></div>`
            
        }); 
        }
        
    })
    .then(() => {
        let smallTagsBlock = document.querySelectorAll('.tag-small-block')

        if (localStorage.getItem('theme') == 'black') {
            smallTagsBlock.forEach(div => {
                div.classList.add('tag-small-block-black');
                div.addEventListener('click', () => {
                    document.location.href = `${serverPath}/search?id=${div.innerHTML}`
                })
            });
        } else {
            smallTagsBlock.forEach(div => {
                div.classList.remove('tag-small-block-black')
                div.addEventListener('click', () => {
                    document.location.href = `${serverPath}/search?id=${div.innerHTML}`
                })
            });
        }        
    })

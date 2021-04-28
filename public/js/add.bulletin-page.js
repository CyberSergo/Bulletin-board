const xhttp = new XMLHttpRequest;
let form = document.getElementById('form');
let radio = document.querySelectorAll('.category')
let serverPath = "http://localhost:3000";

form.addEventListener('submit', event => {

    event.preventDefault()

    let checkedRadio
    radio.forEach(e => {
        if (e.checked == true) {
            checkedRadio = e
        }
    })

    let tagsValue = form.tags.value.split(',');

    const data = {
        'productName': form.productName.value,
        'description': form.description.value,
        'category': checkedRadio.value,
        'tags': tagsValue,
        'token': localStorage.getItem('auth')
    }

    if (data.token == null) {
        return authError() 
    }

    xhttp.open(form.method, form.action, true);
    xhttp.setRequestHeader('Content-Type', "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(this.responseText)
            if (this.responseText == 'Announcement added') {
                // window.location = serverPath
            }
        }
    }
    if (data.productName.trim() !== "") {
        if (data.description.trim() !== "") {
            xhttp.send(JSON.stringify(data));
        } else {
            alert("Please fill in the product description")
        }
    } else {
        alert("Please enter a product name")
    }
    
});


function authError(){
    let bulletinArea = document.getElementsByClassName('bulletin-area')[0]
    
    bulletinArea.innerHTML += `<p>You are nor authorized. Click on the link to <a href="http://localhost:3000/user/registration?">registration</a> or <a href="http://localhost:3000/user/login">login</a></p>`
}
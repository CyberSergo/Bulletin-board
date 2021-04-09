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

    let data = {};
    let tagsValue = form.tags.value.split(',')

    data[form.productName.name] = form.productName.value
    data[form.description.name] = form.description.value
    data[checkedRadio.name] = checkedRadio.value
    data[form.tags.name] = tagsValue

    xhttp.open(form.method, form.action, true);
    xhttp.setRequestHeader('Content-Type', "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(this.responseText)
            if (this.responseText == 'Announcement added') {
                window.location = serverPath
            }
        }
    }
    if (data.productName.trim() !== "") {
        if (data.productName.trim() !== "") {
            xhttp.send(JSON.stringify(data));
        } else {
            alert("Please fill in the product description")
        }
    } else {
        alert("Please enter a product name")
    }
    
});
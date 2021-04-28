const xhttp = new XMLHttpRequest;
const form = document.querySelector('form');
let serverPath = "http://localhost:3000";


form.addEventListener('submit', event => {
    event.preventDefault();

    let data = {
        'name': form.name.value,
        'email': form.email.value,
        'password': form.password.value,
        'confirmPassword': form.confirmPassword.value
    };
    
    xhttp.open('POST', `${serverPath}/api/user/registration`);
    xhttp.setRequestHeader('Content-Type', "application/json; charset=UTF-8");

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(this.responseText)
            if (this.responseText == 'User added') {
                 window.location = `${serverPath}/user/add-bulletin`
            };
        };
    };

    if (data.name.trim() !== "" && data.email.trim() !== "" && data.password.trim() !== "" && data.confirmPassword !== "") {
        if (data.password === data.confirmPassword) {
            
            if (data.name.length > 3 && data.email.length > 6 && data.password.length > 5) {
                xhttp.send(JSON.stringify(data));
            } else {
                alert('The "Name" field must contain at least 3 characters. The "Password" field must contain at least 5 characters. The "Email" field must contain at least 6 characters')
            }
        } else {
            alert('Wrong password')
        }
    } else {
        alert('Please fill in all input fields')
    }

});



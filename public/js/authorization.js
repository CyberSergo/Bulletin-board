const xhttp = new XMLHttpRequest;
const form = document.querySelector('form');
let serverPath = "http://localhost:3000";


form.addEventListener('submit', event => {
    event.preventDefault();

    let data = {
        'email': form.email.value,
        'password': form.password.value
    };

    if (data.email.trim() !== '' && data.password.trim() !== '') {
        
        xhttp.open('POST', `${serverPath}/api/user/authorization`);
        xhttp.setRequestHeader('Content-Type', "application/json; charset=UTF-8");

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                if (this.responseText !== 'Wrong Password' && this.responseText !== 'User is not found') {
                    localStorage.setItem('auth', JSON.parse(this.responseText).token);
                    alert('Welcome back:)');
                    window.location = `${serverPath}/user/add-bulletin`
                } else {
                    alert(this.responseText);
                }
            };
        };

        if (data.email.trim() !== "" && data.password.trim() !== "") {
            xhttp.send(JSON.stringify(data));
        }
    } else {
        alert('Please fill in all input fields')
    }
});
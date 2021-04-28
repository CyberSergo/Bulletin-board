let userMenu = document.getElementById('user-menu');

function goBack() {
    window.history.back();
}

function clickUserMenu(path) {
    userMenu.addEventListener('click', event => {
        window.location = path
    });
};

switch (window.location.pathname) {
    case '/':
        clickUserMenu(`${serverPath}/user/add-bulletin`)
        break;
    default: 
        clickUserMenu(serverPath)
};


if (localStorage.getItem('theme') == 'black') {
    document.querySelector('#user-menu').innerHTML = `<img src="https://img.icons8.com/fluent/96/000000/user-male-circle.png"/>`;
    document.querySelector('#user-menu img').classList.add('black-user');

} else if (localStorage.getItem('theme') == undefined) {
    document.querySelector('#user-menu').innerHTML = `<img src="https://img.icons8.com/windows/96/000000/user-male-circle.png"/>`;
    document.querySelector('#user-menu img').classList.remove('black-user');
} else {
    document.querySelector('#user-menu').innerHTML = `<img src="https://img.icons8.com/windows/96/000000/user-male-circle.png"/>`;
    document.querySelector('#user-menu img').classList.remove('black-user');
};


if (window.location.pathname == '/') {

    let siteMode = document.getElementById('site-mode');

    siteMode.addEventListener('click', function () {
        if (localStorage.getItem('theme') == 'black') {
            localStorage.setItem('theme', 'white')
            whiteThemeHP()
        } else if (localStorage.getItem('theme') == undefined) {
            localStorage.setItem('theme', 'black')
            blackThemeHP()

        } else {
            localStorage.setItem('theme', 'black')
            blackThemeHP()
        };
    });
};













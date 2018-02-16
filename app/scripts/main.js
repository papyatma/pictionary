'use strict';

let name;
let username;
let email;
let password;

(function init() {

    let auth = document.querySelector('#submit');
    let register = document.querySelector('#register');
    let xhr = new XMLHttpRequest();


    if (register) {
        register.addEventListener('click', sendRegisterRequest);
    }

    if (auth) {
        auth.addEventListener('click', sendAuthRequest);
    }

    function sendAuthRequest() {

        email = document.querySelector('#email');
        password = document.querySelector('#password');

        let userEmail = email.value;
        let userPassword = password.value;

        xhr.onload = handleAuthResponse;
        let url = `http://localhost:9000/authenticate`;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded; charset=utf-8');
        xhr.send("email=" + userEmail + "&password=" + userPassword);

    }

    function sendRegisterRequest() {

        name = document.querySelector('#name');
        username = document.querySelector('#username');
        email = document.querySelector('#email');
        password = document.querySelector('#password');

        let userName = name.value;
        let userUserName = username.value;
        let userEmail = email.value;
        let userPassword = password.value;

        console.log(userName + "-" + userUserName + "-" + userEmail + "-" + userPassword)

        xhr.onload = handleRegisterResponse;
        let url = `http://localhost:9000/register`;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded; charset=utf-8');
        xhr.send("name=" + userName + "&username=" + userUserName + "&email=" + userEmail + "&password=" + userPassword);

    }

    function handleAuthResponse() {
        if (xhr.status !== 200) {
            alert('Error! ' + xhr.status); // erreur HTTP
            return;
        }

        let resp = xhr.response;

        let message = JSON.parse(resp);

        if (message.status == true) {
            console.log("OK");
            window.location.href = '/jeu';
        } else {
            window.location.href = '/login.html';
        }
    }

    function handleRegisterResponse() {
        if (xhr.status !== 200) {
            alert('Error! ' + xhr.status); // erreur HTTP
            return;
        }

        let resp = xhr.response;

        let message = JSON.parse(resp);

        if (message.status == true) {
            console.log("OK");
            window.location.href = '/jeu';
        } else {
            window.location.href = '/login.html';
        }
    }

})();

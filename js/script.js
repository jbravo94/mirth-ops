import { isLoggedIn } from './modules/rest.service.js';
import { $$, hide, show } from './modules/utils.js';

isLoggedIn
.then((isLoggedIn) => {isLoggedIn ? hide($$("loginComponent")) : show($$("loginComponent"))})
.catch((error) => {show($$("loginComponent"))});

$$("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    fetch('/api/users/_login', {method: 'POST',
    headers:{
        "Accept": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded'
    },    
    body: new URLSearchParams({
        'username': $$("usernameInput")?.value,
        'password': $$("passwordInput")?.value
    })})
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
    
                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    
  });
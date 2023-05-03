import { loginForm, usernameInput, passwordInput} from './modules/selectors.js';

fetch('/api/users/current', {headers: {
    "Accept": "application/json"
  }})
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



loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

console.log("clock");
    fetch('/api/users/_login', {method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },    
    body: new URLSearchParams({
        'username': usernameInput?.value,
        'password': passwordInput?.value
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
import { isLoggedIn, login, logout } from './modules/rest.service.js';
import { $$, hide, show } from './modules/utils.js';

const checkIsLoggedIn = () => {
    isLoggedIn()
        .then((isLoggedIn) => { isLoggedIn ? hide($$("loginComponent")) && show($$("logoutComponent")) : show($$("loginComponent")) && hide($$("logoutComponent"))})
        .catch((error) => { show($$("loginComponent")) && hide($$("logoutComponent")) });
};

checkIsLoggedIn();

$$("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = $$("usernameInput")?.value;
    const password = $$("passwordInput")?.value;

    login(username, password)
        .then((response) => checkIsLoggedIn())
});

$$("logoutButton").addEventListener("click", () => logout() && show($$("loginComponent")) && hide($$("logoutComponent")));

import { isLoggedIn, login, logout, getChannelTags } from './modules/rest.service.js';
import { $$, hide, show } from './modules/utils.js';

const load = async () => {
    try {
        const channelIds = await getChannelTags();
        console.log(channelIds);
    } catch(error) {

    }
}

const hideLogin = () => {
    hide($$("loginComponent"));
    show($$("logoutComponent"));
}

const showLogin = () => {
    show($$("loginComponent"));
    hide($$("logoutComponent"));
}

const checkIsLoggedIn = async () => {
    
    
    try {
        if(await isLoggedIn()) {
            hideLogin();
            load();
        } else {
            showLogin();
        }
    } catch (error) {
        console.log(error);
        showLogin();
    }
};

checkIsLoggedIn();

$$("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = $$("usernameInput")?.value;
    const password = $$("passwordInput")?.value;

    login(username, password).then((response) => checkIsLoggedIn());
});

$$("logoutButton").addEventListener("click", () => logout() && showLogin());

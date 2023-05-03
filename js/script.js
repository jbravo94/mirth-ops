import { isLoggedIn, login, logout, getChannelTags } from './modules/rest.service.js';
import { $$, hide, show } from './modules/utils.js';

const load = async () => {
    try {
        const channelIds = await getChannelTags();

        const operationsTable = document.createElement("table");
        const operationTableHeaderRow = document.createElement("tr");

        const headerNames = ['Channel Name', 'Channel ID', 'Channel Status', 'Connection Status', 'Start Channel', 'Stop Channel'];

        operationTableHeaderRow.append(...headerNames.map(h => Object.assign(document.createElement('th'), { innerHTML : h })));

        operationsTable.appendChild(operationTableHeaderRow);

        for (let i = 0; i < channelIds.length; i++) {
            const operationTableRow = document.createElement("tr");
        }

        $$("operationsTableContainer").appendChild(operationsTable);
    } catch(error) {
    }
}

const hideLogin = () => {
    hide($$("loginComponent"));
    show($$("operationsComponent"));
}

const showLogin = () => {
    show($$("loginComponent"));
    hide($$("operationsComponent"));
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

import { isLoggedIn, login, logout, getChannelTags, getConnectionStatus, getChannelStatus, getChannelName } from './modules/rest.service.js';
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
            const cid = channelIds[i];

            const operationTableRow = document.createElement("tr");
            const channelName = Object.assign(document.createElement("td"), {id: "channelName-" + i});
            getChannelName(cid).then((text) => $$("channelName-" + i).innerHTML = text);

            const channelId = Object.assign(document.createElement("td"), {id: "channelId-" + i, innerHTML: cid});

            const channelStatus = Object.assign(document.createElement("td"), {id: "channelStatus-" + i});
            getChannelStatus(cid).then((text) => $$("channelStatus-" + i).innerHTML = text);

            const connectionStatus = Object.assign(document.createElement("td"), {id: "connectionStatus-" + i});
            getConnectionStatus(cid).then((text) => $$("connectionStatus-" + i).innerHTML = text);

            const startChannel = Object.assign(document.createElement("td"), {id: "startChannel-" + i});
            const stopChannel = Object.assign(document.createElement("td"), {id: "stopChannel-" + i});

            operationTableRow.append(channelName, channelId, channelStatus, connectionStatus, startChannel, stopChannel);
            operationsTable.appendChild(operationTableRow);
        }

        $$("operationsTableContainer").appendChild(operationsTable);
    } catch(error) {
        console.log(error);
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

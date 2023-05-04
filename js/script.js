import { isLoggedIn, login, logout, getChannelTags, getConnectionStatus, getChannelStatus, getChannelName, startChannel, stopChannel } from './modules/rest.service.js';
import { $$, enable, disable, hide, show } from './modules/utils.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const style = urlParams.get('style');

if (style !== "none") {
    document.head.insertAdjacentHTML('afterbegin',
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">' +
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">'
    );
}

const load = async () => {
    try {
        const channelIds = await getChannelTags();

        const operationsTable = document.createElement("table");
        const operationTableHeaderRow = document.createElement("tr");

        const headerNames = ['Channel Name', 'Channel ID', 'Channel Status', 'Connection Status', 'Start Channel', 'Stop Channel'];

        operationTableHeaderRow.append(...headerNames.map(h => Object.assign(document.createElement('th'), { innerHTML: h })));

        operationsTable.appendChild(operationTableHeaderRow);

        for (let i = 0; i < channelIds.length; i++) {
            const cid = channelIds[i];

            const operationTableRow = document.createElement("tr");
            const channelName = Object.assign(document.createElement("td"), { id: "channelName-" + i });
            getChannelName(cid).then((text) => $$("channelName-" + i).innerHTML = text);

            const channelId = Object.assign(document.createElement("td"), { id: "channelId-" + i, innerHTML: cid });

            const channelStatus = Object.assign(document.createElement("td"), { id: "channelStatus-" + i });
            const connectionStatus = Object.assign(document.createElement("td"), { id: "connectionStatus-" + i });

            const startChannelAction = Object.assign(document.createElement("td"), { id: "startChannel-" + i, innerHTML: `<button id="startChannel-button-${i}" class="btn btn-success action" disabled><i class="bi bi-play-circle-fill"></i></button>` });
            const stopChannelAction = Object.assign(document.createElement("td"), { id: "stopChannel-" + i, innerHTML: `<button id="stopChannel-button-${i}" class="btn btn-danger action" disabled><i class="bi bi-stop-circle-fill"></i></button>` });

            operationTableRow.append(channelName, channelId, channelStatus, connectionStatus, startChannelAction, stopChannelAction);
            operationsTable.appendChild(operationTableRow);

            getChannelStatus(cid).then((text) => {
                $$("channelStatus-" + i).innerHTML = text;

                $$("startChannel-button-" + i).onclick = () => { startChannel(cid); load(); };
                $$("stopChannel-button-" + i).onclick = () => { stopChannel(cid); load(); };

                if (text === "STOPPED") {
                    enable($$("startChannel-button-" + i));
                    disable($$("stopChannel-button-" + i));
                } else {
                    disable($$("startChannel-button-" + i));
                    enable($$("stopChannel-button-" + i));
                }

            });

            getConnectionStatus(cid).then((text) => $$("connectionStatus-" + i).innerHTML = text);
        }

        $$("operationsTableContainer").replaceChildren(operationsTable);
    } catch (error) {
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
        if (await isLoggedIn()) {
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

$$("refreshButton").addEventListener("click", () => load());

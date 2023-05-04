const parser = new DOMParser();

export const isLoggedIn = () => fetch('/api/users/current').then((response) => response.status === 200);

export const login = (username, password) => fetch('/api/users/_login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        'username': username,
        'password': password
    })
});

export const logout = () => fetch('/api/users/_logout', {
    method: 'POST',
});

export const getChannelTags = () => fetch('/api/server/channelTags')
    .then((response) => response.text())
    .then((text) => {

        const channelIds = [];

        const xmlDocument = parser.parseFromString(text, "text/xml");

        const nodes = xmlDocument.evaluate("//set/channelTag[name='OPS']/channelIds/string/text()", xmlDocument, null, XPathResult.ANY_TYPE, null);
        let node = nodes.iterateNext();

        while (node) {
            channelIds.push(node.nodeValue);
            node = nodes.iterateNext();
        }

        return channelIds;
    });

export const startChannel = (channelId) => fetch('/api/channels/' + channelId + '/_start', {
    method: 'POST',
});

export const stopChannel = (channelId) => fetch('/api/channels/' + channelId + '/_stop', {
    method: 'POST',
});

export const getChannel = (channelId) => fetch('/api/channels/' + channelId)
    .then((response) => response.text())
    .then((xmlResponse) => {
        return xmlResponse;
    });

export const getChannelName = (channelId) => getChannel(channelId)
    .then((text) => {

        const xmlDocument = parser.parseFromString(text, "text/xml");

        const nodes = xmlDocument.evaluate("//channel/name/text()", xmlDocument, null, XPathResult.ANY_TYPE, null);
        let node = nodes.iterateNext();

        return node.nodeValue;
    });

export const getChannelStatus = (channelId) => fetch('/api/channels/' + channelId + '/status')
    .then((response) => response.text())
    .then((text) => {

        const xmlDocument = parser.parseFromString(text, "text/xml");

        const nodes = xmlDocument.evaluate("//dashboardStatus/state/text()", xmlDocument, null, XPathResult.ANY_TYPE, null);
        let node = nodes.iterateNext();

        return node.nodeValue;
    });

export const getConnectionStatus = (channelId) => fetch('/api/extensions/dashboardstatus/channelStates/' + channelId)
    .then((response) => response.text())
    .then((status) => {
        return status;
    });

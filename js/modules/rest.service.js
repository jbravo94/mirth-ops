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

export const getChannelTags = () => fetch(
    '/api/server/channelTags'
).then((response) => response.text()).then((text) => {

    const channelIds = [];

    var parser = new DOMParser();

    var xmlDocument = parser.parseFromString(text, "text/xml");

    const nodes = xmlDocument.evaluate("//set/channelTag[name='OPS']/channelIds/string/text()", xmlDocument, null, XPathResult.ANY_TYPE, null);

    let node = nodes.iterateNext();

    while(node) {
        channelIds.push(node.nodeValue);
        node = nodes.iterateNext();
    }

    return channelIds;
});

export const isLoggedIn = fetch(
    '/api/users/current', {
    headers: {
        "Accept": "application/json"
    }
}).then((response) => response.status === 200);
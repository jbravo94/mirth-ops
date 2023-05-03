export const isLoggedIn = () => fetch(
    '/api/users/current', {
    headers: {
        "Accept": "application/json"
    }
}).then((response) => response.status === 200);

export const login = (username, password) => fetch('/api/users/_login', {
    method: 'POST',
    headers: {
        "Accept": "application/json",
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

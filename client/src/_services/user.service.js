export const userService = {
    login,
    logout,
    register,
    getAll,
    getUser,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`http://localhost:5000/api/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("LOCAL STORAGE")
            console.log(user.token)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', user.token);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`http://localhost:5000/api/managers/all`, requestOptions).then(handleResponse);
}

function getUser() {
    console.log("Hello 2")
    const requestOptions = {
        method: 'GET',
        headers: {  'x-auth-token': localStorage.getItem('token') },
    };

    return fetch(`http://localhost:5000/api/auth/startup/info`, requestOptions)
    .then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:5000/api/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:5000/api/startups/update-status/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log("handle response")
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("logout");
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
class Api {
    constructor() {
        this._baseUrl = 'https://reqres.in/api';
        this._headers = {
            'Content-Type': 'application/json'
          }
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        };
    };
    
    getUsersList(page) {
        return fetch(`${this._baseUrl}/users?page=${page}`, {
            headers: this._headers,
        })
        .then(this._checkResponse);
    };
    
    getUserInfo(id) {
        return fetch(`${this._baseUrl}/users/${id}`, {
            headers: this._headers,
        })
        .then(this._checkResponse);
    };
    
    updateUserInfo(first_name, last_name, email, id, avatar) {
        return fetch(`${this._baseUrl}/users/${id}`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                email: email,
                id: id,
                avatar: avatar,
            })
        })
        .then(this._checkResponse);
    };

    deleteUser(id) {
        return fetch(`${this._baseUrl}/users/${id}`, {
            headers: this._headers,
            method: "DELETE",
        })
        .then((Response)=>{
            if (Response.status === 204) {
                return {massage: "Пользователь удален!"}
            } else {
                return Promise.reject(`Ошибка: ${Response.status}`)
            };
        });
    };

    register(email, password,) {
        return fetch(`${this._baseUrl}/register`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            })
        })
        .then(this._checkResponse);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/login`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            })
        })
        .then(this._checkResponse);
    }
}

export default new Api();

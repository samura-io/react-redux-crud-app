const BASE_URL = 'https://reqres.in/';

export const getUsersList = (page) => BASE_URL + 'api/users?page=' + page;

export const user = (id) => BASE_URL + 'api/users/' + id;

export const registration = () => BASE_URL + 'api/register/';

export const login = () => BASE_URL + 'api/login/';
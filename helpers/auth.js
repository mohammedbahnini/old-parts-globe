import axios from 'axios';

export const isLoggedIn = async () => {
    const response = await axios.get(`${process.env.API}/user/checkLoggedIn`);
    return response.data.isLogged;
}

export const getClientData = async () => {
    const response = await axios.get(`${process.env.API}/user/getData`);
    return response.data.client;
}
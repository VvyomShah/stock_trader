import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/user';
console.log(API_URL)

export const registerUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
};

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

export const getBalance = async (userId, token) => {
    const response = await axios.get(`${API_URL}/balance`, {
        params: { user_id: userId },
        headers: {
            Authorization: `Bearer ${token}`, // Add the token to headers
        },
    });
    return response.data.balance;
};

export const addBalance = async (userId, amount, token) => {
    await axios.post(`${API_URL}/addbalance`, {
        user_id: userId,
        amount: amount,
    }, {
        headers: {
            Authorization: `Bearer ${token}`, // Add the token to headers
        },
    });
};

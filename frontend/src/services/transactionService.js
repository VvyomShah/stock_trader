import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/transaction'; // Adjust based on your API structure

// Buy Stock Function
export const buyStock = async (ticker, quantity, token) => {
    const response = await axios.post(`${API_URL}/buy`, {
        'stock_ticker': ticker,
        quantity
    }, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
    });
    return response.data; // Return the response data after buying
};

// Sell Stock Function
export const sellStock = async (ticker, quantity, token) => {
    const response = await axios.post(`${API_URL}/sell`, {
        'stock_ticker': ticker,
        quantity
    }, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
    });
    return response.data; // Return the response data after selling
};

// Get Transaction History
export const getTransactionHistory = async (token) => {
    const response = await axios.get(`${API_URL}/history`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
    });
    return response.data; // Return the transaction history data
};

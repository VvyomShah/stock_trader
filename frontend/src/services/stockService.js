import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/stocks';

// Get Tickers Function
export const getTickers = async (token) => {
    console.log(token)
    const response = await axios.get(`${API_URL}/tickers`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
    });
    return response.data; // Return the ticker data
};

// Get Stock Data Function with Authentication
export const getStockData = async (tickers, token) => {
    const response = await axios.post(`${API_URL}/getstocks`, { tickers }, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
    });
    return response.data; // Return the stock data
};

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/portfolio'; // Adjust based on your API structure

// Get Transaction History
export const getPortfolio = async (token) => {
    const response = await axios.get(`${API_URL}/fetchall`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
    });
    return response.data; // Return the transaction history data
};

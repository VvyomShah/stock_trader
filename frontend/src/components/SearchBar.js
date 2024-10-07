import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { getTickers } from '../services/stockService'; // Service to fetch stock tickers

const SearchBar = ({ onSelect, auth }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const tickers = await getTickers(auth); // Pass auth token to the service
                setOptions(tickers);
            } catch (error) {
                console.error("Error fetching tickers:", error);
            }
        };

        fetchOptions();
    }, [auth]); // Fetch options again if auth changes

    return (
        <Autocomplete
            options={options}
            onChange={(event, value) => onSelect(value)} // Callback when a ticker is selected
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search for a stock ticker"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        style: { color: 'black' }, // Set input text color
                    }}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} style={{ color: 'black' }}> {/* Set dropdown option text color */}
                    {option}
                </li>
            )}
        />
    );
};

export default SearchBar;

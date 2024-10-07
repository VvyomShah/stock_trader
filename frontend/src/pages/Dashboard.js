import React, { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import TradingViewWidget from '../components/TradingViewWidget';
import StockDetailsCard from '../components/StockDetailsCard';
import { getStockData, getTickers } from '../services/stockService'; // Import your API service
import { buyStock, sellStock } from '../services/transactionService';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header'; // Import Header

const Dashboard = () => {
    const { auth, loading: authLoading } = useContext(AuthContext); // Get auth and loading from AuthContext
    const [selectedTicker, setSelectedTicker] = useState("AAPL"); // Set default ticker to AAPL
    const [stockDetails, setStockDetails] = useState({});
    const [tickers, setTickers] = useState([]); // Store the list of stock tickers
    const [loading, setLoading] = useState(false); // Add loading state

    // Fetch tickers on component mount
    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const fetchedTickers = await getTickers(auth); // Fetch tickers
                setTickers(fetchedTickers); // Set the fetched tickers
            } catch (error) {
                console.error("Error fetching tickers:", error);
            }
        };

        if (auth) {
            fetchTickers(); // Only fetch tickers if authenticated
        }
    }, [auth]);

    // Fetch stock details based on the selected ticker
    useEffect(() => {
        const fetchStockDetails = async () => {
            if (selectedTicker) {
                setLoading(true); // Set loading to true
                try {
                    const fetchedStockDetails = await getStockData([selectedTicker], auth); // Fetch stock details
                    setStockDetails(fetchedStockDetails); // Set stock details
                } catch (error) {
                    console.error("Error fetching stock details:", error);
                } finally {
                    setLoading(false); // Reset loading state
                }
            }
        };

        fetchStockDetails();
    }, [selectedTicker, auth]);

    const handleTickerSelect = (ticker) => {
        setSelectedTicker(ticker); // Update selected ticker
    };

    const handleBuy = async () => {
        try {
            const result = await buyStock(selectedTicker, 1, auth);
            console.log("Stock purchased:", result);
        } catch (error) {
            console.error("Error buying stock:", error);
        }
    };

    const handleSell = async () => {
        try {
            const result = await sellStock(selectedTicker, 1, auth);
            console.log("Stock sold:", result);
        } catch (error) {
            console.error("Error selling stock:", error);
        }
    };

    if (authLoading) {
        return <CircularProgress />; // Show loading spinner while checking auth
    }

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header />
            <Box mt={3} width="100%"> {/* Full width for SearchBar */}
                <SearchBar
                    tickers={tickers}
                    onSelect={handleTickerSelect}
                    defaultTicker="AAPL"
                    auth={auth}
                    sx={{ width: '100%' }} // Ensure SearchBar takes full width
                />
            </Box>
            {loading ? ( // Show loading spinner while fetching stock details
                <CircularProgress />
            ) : (
                selectedTicker && (
                    <Box
                        display="flex"
                        justifyContent="space-around"
                        alignItems="flex-start"
                        mt={2}
                        width="100%"
                        maxWidth="800px"
                    >
                        <Box sx={{ flex: 1, marginRight: 1 }}> {/* Margin to separate TradingViewWidget */}
                            <TradingViewWidget ticker={selectedTicker} />
                        </Box>
                        <Box sx={{ flex: 1, marginLeft: 1 }}> {/* Margin to separate StockDetailsCard */}
                            <StockDetailsCard
                                stockDetails={stockDetails}
                                onBuy={handleBuy}
                                onSell={handleSell}
                                ticker={setSelectedTicker}
                            />
                        </Box>
                    </Box>
                )
            )}
        </Box>
    );
};

export default Dashboard;

import React, { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress, Typography, TextField, Button } from '@mui/material';
import PortfolioTable from '../components/PortfolioTable';
import HistoryTable from '../components/HistoryTable';
import { getPortfolio } from '../services/portfolioService';
import { getTransactionHistory } from '../services/transactionService';
import { getBalance, addBalance } from '../services/authService'; // Import balance functions
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

const Portfolio = () => {
    const { auth, loading: authLoading } = useContext(AuthContext); // Get auth and loading from AuthContext
    const [portfolio, setPortfolio] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for data fetching
    const [balance, setBalance] = useState(0); // State for balance
    const [amountToAdd, setAmountToAdd] = useState(''); // Input for amount to add

    // Fetch portfolio, transaction history, and balance on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedPortfolio = await getPortfolio(auth); // Fetch portfolio
                const fetchedTransactions = await getTransactionHistory(auth); // Fetch transaction history
                const fetchedBalance = await getBalance(auth.id, auth); // Fetch balance
                setPortfolio(fetchedPortfolio);
                setTransactions(fetchedTransactions.transactions);
                setBalance(fetchedBalance); // Set the fetched balance
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Reset loading state
            }
        };

        if (auth) {
            fetchData(); // Only fetch if authenticated
        }
    }, [auth]);

    const handleAddBalance = async () => {
        if (amountToAdd) {
            await addBalance(auth.id, parseFloat(amountToAdd), auth);
            setAmountToAdd(''); // Reset the input field
            // Fetch the updated balance
            const updatedBalance = await getBalance(auth.id, auth);
            setBalance(updatedBalance);
        }
    };

    if (authLoading || loading) {
        return <CircularProgress />; // Show loading spinner while fetching data
    }

    return (
        <Box>
            <Header />
            <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
                My Portfolio
            </Typography>
            {/* Container for the balance and add balance input/button */}
            <Box display="flex" justifyContent="flex-end" alignItems="flex-start" mb={2}>
                <Box display="flex" flexDirection="column" alignItems="flex-end" style={{ marginLeft: 'auto' }}>
                    {/* Balance display with increased font size */}
                    <Typography variant="h5" style={{ color: 'black', marginBottom: '8px' }}>
                        Balance: ${balance.toFixed(2)}
                    </Typography>
                    {/* Add Balance input and button */}
                    <Box display="flex" alignItems="center">
                        <TextField
                            label="Add Balance"
                            type="number"
                            value={amountToAdd}
                            onChange={(e) => setAmountToAdd(e.target.value)}
                            variant="outlined"
                            size="small" // Reduce the size of the input field
                            style={{ marginRight: '8px', width: '100px' }} // Set a smaller width
                        />
                        <Button variant="contained" color="primary" onClick={handleAddBalance}>
                            Add Balance
                        </Button>
                    </Box>
                </Box>
            </Box>
            <PortfolioTable portfolio={portfolio} />
            <Typography variant="h4" gutterBottom style={{ color: 'black', marginTop: '32px' }}>
                Transaction History
            </Typography>
            <HistoryTable transactions={transactions} />
        </Box>
    );
};

export default Portfolio;

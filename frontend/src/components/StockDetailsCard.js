import React from 'react';
import { Card, CardContent, Typography, Button, useTheme } from '@mui/material';

const StockDetailsCard = ({ stockDetails, onBuy, onSell, selectedTicker }) => {
    const theme = useTheme(); // Access the theme

    return (
        <Card variant="outlined" style={{ width: '300px', marginLeft: '16px' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom style={{ color: theme.palette.primary.main }}>
                    {selectedTicker} Stock Details
                </Typography>
                <Typography variant="body1" style={{ color: 'black' }}>
                    <strong>Open:</strong> {stockDetails.Open}
                </Typography>
                <Typography variant="body1" style={{ color: 'black' }}>
                    <strong>High:</strong> {stockDetails.High}
                </Typography>
                <Typography variant="body1" style={{ color: 'black' }}>
                    <strong>Low:</strong> {stockDetails.Low}
                </Typography>
                <Typography variant="body1" style={{ color: 'black' }}>
                    <strong>Close:</strong> {stockDetails.Close}
                </Typography>
                <Typography variant="body1" style={{ color: 'black' }}>
                    <strong>Adj Close:</strong> {stockDetails['Adj Close']}
                </Typography>
                <Typography variant="body1" style={{ color: 'black' }}>
                    <strong>Volume:</strong> {stockDetails.Volume}
                </Typography>
                <Button variant="contained" color="primary" onClick={onBuy} style={{ marginTop: '16px' }}>
                    Buy
                </Button>
                <Button variant="contained" color="secondary" onClick={onSell} style={{ marginTop: '16px', marginLeft: '8px' }}>
                    Sell
                </Button>
            </CardContent>
        </Card>
    );
};

export default StockDetailsCard;

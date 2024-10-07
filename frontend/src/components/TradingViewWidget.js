import React, { useEffect } from 'react';

const TradingViewWidget = ({ ticker }) => {
    useEffect(() => {
        if (ticker) {
            new window.TradingView.widget({
                "width": 600,  // Set width of the widget
                "height": 400, // Set height of the widget
                "symbol": ticker, // Stock ticker symbol
                "interval": "D", // Time interval for the chart
                "timezone": "Etc/UTC",
                "theme": "light", // Choose 'light' or 'dark'
                "style": "1", // Choose the style of the chart
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_widget", // ID of the div where the widget will be rendered
            });
        }
    }, [ticker]);

    return <div id="tradingview_widget" />;
};

export default TradingViewWidget;
-- Drop exisitng database
DROP DATABASE IF EXISTS stock_trader;

-- Create the stock_trader database
CREATE DATABASE IF NOT EXISTS stock_trader;

-- Use the newly created database
USE stock_trader;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00
);

-- Create the transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stock_ticker VARCHAR(5) NOT NULL,
    transaction_type ENUM('buy', 'sell') NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
    user_id INT NOT NULL,
    stock_ticker VARCHAR(5) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (user_id, stock_ticker),  -- Composite primary key
    FOREIGN KEY (user_id) REFERENCES users(id)
);
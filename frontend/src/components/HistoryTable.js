import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const HistoryTable = ({ transactions }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Stock</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Shares</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>{new Date(transaction[4]).toLocaleString()}</TableCell> {/* Date */}
                            <TableCell align="right">{transaction[0]}</TableCell> {/* Stock */}
                            <TableCell align="right">{transaction[3]}</TableCell> {/* Type */}
                            <TableCell align="right">{transaction[1]}</TableCell> {/* Shares */}
                            <TableCell align="right">${transaction[2]}</TableCell> {/* Price */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default HistoryTable;

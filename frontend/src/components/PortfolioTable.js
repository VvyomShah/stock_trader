import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PortfolioTable = ({ portfolio }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Stock</TableCell>
                        <TableCell align="right">Shares</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {portfolio.map((row, index) => (
                        <TableRow key={`${row[0]}-${index}`}> {/* Use a combination of stock ticker and index for uniqueness */}
                            <TableCell>{row[0]}</TableCell> {/* Assuming row[0] is the stock ticker */}
                            <TableCell align="right">{row[1]}</TableCell> {/* Assuming row[1] is the shares */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PortfolioTable;

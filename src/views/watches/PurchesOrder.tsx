// src/App.js
// src/App.js
import React, { useState } from 'react';
import { Add, Remove, Delete } from '@mui/icons-material';
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    IconButton,
    Avatar,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    FormControlLabel,
} from '@mui/material';

function PurchaseOrder() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Rolex Submariner',
            price: 10000.00,
            quantity: 1,
            description: 'Stainless Steel Automatic Men\'s Watch',
            imageUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 2,
            name: 'Omega Speedmaster',
            price: 4500.00,
            quantity: 1,
            description: 'Moonwatch Professional Chronograph',
            imageUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 3,
            name: 'TAG Heuer Carrera',
            price: 3500.00,
            quantity: 1,
            description: 'Calibre Heuer 01 Automatic Chronograph',
            imageUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 4,
            name: 'Seiko Presage',
            price: 500.00,
            quantity: 2,
            description: 'Automatic Dress Watch with Power Reserve Indicator',
            imageUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 5,
            name: 'Casio G-Shock',
            price: 150.00,
            quantity: 3,
            description: 'Rugged Digital Watch with Shock Resistance',
            imageUrl: 'https://via.placeholder.com/50'
        },
    ]);

    const handleQuantityChange = (id, delta) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity + delta > 0 ? { ...item, quantity: item.quantity + delta } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = 99.00; // Example shipping cost
    const savings = 299.00; // Example savings
    const tax = 799.00; // Example tax
    const originalPrice = totalPrice + savings;

    return (
        <div className='bg-[#F8F8F9] px-[13.33vw] flex justify-center mt-10 min-h-[95vh]'>
            <Box className='py-5'>
                <Typography className="text-left" fontWeight="bold" variant="h4" component="h1" gutterBottom>
                    Shopping Cart
                </Typography>

                <Box component="form" width="100%" height="90%" className="mt-3 p-3  bg-[#FEFEFF] rounded" noValidate autoComplete="off">
                    <Grid container width="100%" height="100%" className='bg-[#FEFEFF] max-w-fit'>
                        {/* <Grid className='p-3' item xs={12} md={3}>
                            <Paper variant="outlined" sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">Original price</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right">€{originalPrice.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">Savings</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right" color="green">-€{savings.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">Store Pickup</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right">€{shippingCost.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">Tax</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right">€{tax.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="h6">Total</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" align="right">€{(totalPrice + shippingCost + tax).toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" fullWidth>Proceed to Checkout</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="text" color="primary" fullWidth>Continue Shopping</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth placeholder="Enter your code" label="Do you have a voucher or gift card?" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" fullWidth>Apply Code</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid> */}
                        <Grid className='p-3' item xs={12} md={9}>
                            <TableContainer component={Paper}>
                                <Table sx={{}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >
                                                <Typography fontWeight={"bold"}>
                                                    Icon
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography fontWeight={"bold"}>Description</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography fontWeight={"bold"}>Quantity</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography fontWeight={"bold"}>Price</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography fontWeight={"bold"}>Options</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((row) => (
                                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">
                                                    <Avatar variant="square" src={row.imageUrl} alt={row.name} sx={{ width: 100, height: 100, borderRadius: 1 }} />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography variant="body1" fontWeight="bold">{row.name}</Typography>
                                                    <Typography variant="body2">{row.description}</Typography>
                                                </TableCell>
                                                <TableCell align="right">€{row.price.toFixed(2)}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => handleQuantityChange(row.id, -1)} disabled={row.quantity <= 1}>
                                                        <Remove />
                                                    </IconButton>
                                                    {row.quantity}
                                                    <IconButton onClick={() => handleQuantityChange(row.id, 1)}>
                                                        <Add />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => handleRemoveItem(row.id)}>
                                                        <Delete />
                                                    </IconButton>

                                                    <Button onClick={() => handleRemoveItem(row.id)}>Remove</Button>
                                                </TableCell>

                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>

                        <Grid className='p-3' item xs={12} md={3}>
                            <Paper variant="outlined" sx={{ padding: 2 }}>
                                <Typography align='left' variant="h6" gutterBottom>
                                    <strong>Order Summary</strong>
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">
                                            <strong>Original price</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right">
                                            <strong> €{originalPrice.toFixed(2)}</strong>

                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">
                                            Savings
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right" color="green">
                                            -€{savings.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">
                                            Store Pickup
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right">
                                            €{shippingCost.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="body1">
                                            Tax
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" align="right">
                                            €{tax.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='left' variant="h6">
                                            <strong>
                                                Total
                                            </strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" align="right">
                                            <strong>
                                                €{(totalPrice + shippingCost + tax).toFixed(2)}
                                            </strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" fullWidth>Proceed to Checkout</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="text" color="primary" fullWidth>Continue Shopping</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth placeholder="Enter your code" label="Do you have a voucher or gift card?" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" fullWidth>Apply Code</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

export default PurchaseOrder;

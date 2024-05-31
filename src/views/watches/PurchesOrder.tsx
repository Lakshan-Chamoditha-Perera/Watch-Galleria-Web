import React, { useContext, useState } from 'react';
import { Add, Delete, FitScreen, NavigateBefore, Remove } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Card } from '@mui/material';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import axios from 'axios';
import { useCart } from '../../context/ShopContext';
import { WatchDto } from '../../util/dto/watch.dto';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './PurchesOrder.css';
import { image } from '@nextui-org/react';

const OrderForm = () => {
    const navigate = useNavigate();
    const { addToCart, cart, setCart } = useCart();
    // @ts-ignore
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    // change quantity of item in cart
    const handleQuantityChange = (itemDto: WatchDto, delta: number) => {
        setCart(
            cart.map(
                item => (item.itemCode === itemDto.itemCode) && (item.addToCartQuantity + delta) <= item.quantity ? {
                    ...item, addToCartQuantity: item.addToCartQuantity + delta
                }
                    : item
            )
        );
    };

    // remove item from cart
    const handleRemoveItem = (itemCode: string) => {
        setCart(cart.filter(item => item.itemCode !== itemCode));
    };

    // place order function
    const handlePlaceOrder = async () => {
        let order = {
            userEmail: user.email,
            itemList: cart.map(item => {
                return {
                    itemCode: item.itemCode,
                    quantity: item.addToCartQuantity,
                    price: item.price,
                    image: item.imageUrlList[0]
                }
            }),
            totalPrice: totalPrice,
        };

        const config = {
            method: "post",
            url: "http://localhost:3000/api/orders",
            data: order,
        };

        await axios.request(config).then(response => {
            console.log(response.data);
            setCart([]);
            enqueueSnackbar('Order Placed!', { variant: 'success' });
        }).catch(error => {
            console.error(error);
            enqueueSnackbar(
                'An error occurred while placing the order!',
                { variant: 'error' }
            );
        });
    }

    const totalItems = cart.reduce((acc, item: WatchDto) => acc + item.addToCartQuantity, 0);
    const totalPrice = cart.reduce((acc, item: WatchDto) => acc + item.price * item.addToCartQuantity, 0);
    const shippingCost = 0.00;
    const savings = 0.00;
    const tax = 0.00;
    const originalPrice = totalPrice + savings;

    return (
        <Grid className='bg-[#F8FAFA]' sx={{ p: 3, minHeight: "FitScreen", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Grid className=' mt-5 w-full px-[13.33vw] ' >
                <Card className='inline-block text-left px-10 text-5xl bg-white w-full'>
                    Place Order
                </Card>
            </Grid>

            <Grid container className='h-[80vh]  mt-5 px-[13.33vw] ' spacing={3} sx={{ minHeight: 'fit' }}>


                <Grid item xs={12} md={9}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }} >
                        <Table sx={{}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight={"bold"}>
                                            Icon
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography fontWeight={"bold"}>Description</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight={"bold"}>Price</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight={"bold"}>Quantity</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight={"bold"}>Options</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item: WatchDto) => (<TableRow key={item.itemCode}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">
                                        <Avatar variant="square" src={item.imageUrlList[0]} alt={item.productName}
                                            sx={{ width: 100, height: 100, borderRadius: 1 }} />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="body1"
                                            fontWeight="bold">{item.productName}</Typography>
                                        <Typography variant="body2">{item.description}</Typography>
                                    </TableCell>
                                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleQuantityChange(item, -1)}
                                            disabled={item.addToCartQuantity <= 1}>
                                            <Remove />
                                        </IconButton>
                                        {item.addToCartQuantity}
                                        <IconButton onClick={() => handleQuantityChange(item, 1)}
                                            disabled={item.addToCartQuantity == item.quantity}>
                                            <Add />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleRemoveItem(item.itemCode)}>
                                            <Delete />
                                        </IconButton>
                                        <Button onClick={() => handleRemoveItem(item.itemCode)}>Remove</Button>
                                    </TableCell>

                                </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>


                <Grid item xs={12} md={3}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }} >
                        <Typography align='left' variant="h6" gutterBottom>
                            <strong>Order Summary</strong>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography align='left' variant="body1">
                                    <strong>Total Items</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" align="right">
                                    <strong> {totalItems}</strong>

                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align='left' variant="body1">
                                    <strong>Original price</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" align="right">
                                    <strong> ${originalPrice.toFixed(2)}</strong>

                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography align='left' variant="body1">
                                    Savings
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" align="right" color="green">
                                    ${savings.toFixed(2)}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography align='left' variant="body1">
                                    Store Pickup
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" align="right">
                                    ${shippingCost.toFixed(2)}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography align='left' variant="body1">
                                    Tax
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" align="right">
                                    ${tax.toFixed(2)}
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
                                        ${(totalPrice + shippingCost + tax).toFixed(2)}
                                    </strong>
                                </Typography>
                            </Grid>



                            <Grid item xs={12}>
                                <Button variant="contained" color="success" fullWidth onClick={handlePlaceOrder}>Place Order</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="text" color="primary" fullWidth onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/home');
                                }} >Continue Shopping</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth placeholder="Enter your code"
                                    label="Do you have a voucher or gift card?" variant="outlined" />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth>Apply Code</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

            </Grid>
        </Grid>
    );
}

export default function PurchaseOrders() {
    return (
        <SnackbarProvider maxSnack={3}
            anchorOrigin={
                { vertical: 'top', horizontal: 'right' }
            }
        >
            <OrderForm />
        </SnackbarProvider>
    );
}
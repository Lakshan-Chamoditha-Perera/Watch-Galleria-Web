import React, { useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import {BACKEND_SERVER_URL} from "../../config/env";

const PayButton = ({ cartItem }) => {
    // @ts-ignore
    const { user } = useAuth()

    const handleCheckout = () => {
        console.log('PayButton {--} handleCheckout', cartItem)
        let order = {
            user: user,
            cart: cartItem
        }
        console.log('PayButton {} handleCheckout order', order)
        const config = {
            method: 'post',
            url: BACKEND_SERVER_URL+'/api/checkouts',
            data: order,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        };


        axios.request(config)
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return Promise.reject(res.data);
                }
            })
            .then(({ url }) => {
                window.location.href = url;
            })
            .catch(e => {
                Swal.fire({
                    title: 'Error',
                    text: e.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    }

    return (
        <>
            <Button onClick={() => handleCheckout()} variant="contained" color="success" fullWidth >Go to checkout</Button>
        </>
    )
}

export default PayButton
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar, SnackbarProvider } from 'notistack';
import axios from 'axios';

//@ts-ignore
import payment_success from "../../../assets/payment-success.png";
import { Button } from '@mui/material';
import { useCart } from '../../../context/ShopContext';

const PurchaseSuccessView = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const updateDatabase = async () => {
        // Post order to the server
        let user = JSON.parse(sessionStorage.getItem('user') || '{}');
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');

        if (user.email && cart.length > 0) {
            let order = {
                userEmail: user.email,
                itemList: cart.map(item => ({
                    itemCode: item.itemCode,
                    quantity: item.addToCartQuantity,
                    price: item.price,
                    image: item.imageUrlList[0]
                })),
            };

            const config = {
                method: 'post',
                url: `${process.env.VITE_SERVER_URL}/api/orders`,
                data: order,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            await axios.request(config)
                .then(response => {
                    console.log(response.data);

                })
                .catch(error => {
                    console.error(error);
                    enqueueSnackbar('Failed to record your order on the server.', { variant: 'error' });
                });
        }
    }


    const { setCart } = useCart();

    useEffect(() => {
        enqueueSnackbar('Your payment was successful. Thank you for your order!', { variant: 'success' });
        updateDatabase();
        setCart([]);
    }, [enqueueSnackbar]);

    const handleGoToHome = () => {
        enqueueSnackbar('Redirecting to home...', { variant: 'info' });
        navigate('/');
    };

    return (
        <div className="border border-red-400 bg-gray-100 h-[100vh] lg:h-[90%]  flex justify-center items-center">
            <div className="bg-white  p-3 border flex flex-col items-center md:mx-auto">

                <img src={payment_success} alt="sucess" className='w-[80%]' />
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment.
                    </p>
                    <div className="p-4 text-center">
                        <Button
                            variant='outlined'
                            onClick={handleGoToHome}
                        >
                            Back To Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function PurchaseSuccess() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <PurchaseSuccessView />
        </SnackbarProvider>
    );
}

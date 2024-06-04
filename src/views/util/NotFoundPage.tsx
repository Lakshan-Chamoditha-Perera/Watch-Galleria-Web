import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const NotFoundPage: React.FC = () => {
    return (
        <div
            className='flex flex-col items-center justify-center h-screen w-full'
        >
            <Typography fontWeight={'bold'} variant="h1" gutterBottom>
                Ooops!
                Page Not Found
            </Typography>
            <Typography variant="h5" gutterBottom>
                This page doesn’t exist or was removed! We suggest you contact admin or go back to home.
            </Typography>
            <Button variant='outlined' href="/">
                Back to Home
            </Button>
            <img className=' max-width-[100%]  object-cover h-auto' src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="404 Error" />
        </div>
    );
};

export default NotFoundPage;

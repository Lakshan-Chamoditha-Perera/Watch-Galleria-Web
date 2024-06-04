import React from 'react';
import { TextField, Button } from '@mui/material';
import 'tailwindcss/tailwind.css';
import ContactUs from '../../views/util/Contact';

const NewsletterSignup: React.FC = () => {
    return (
        <div className="flex flex-col px-[13.33vw] lg:px-0 lg:items-center lg:justify-center  lg:py-20  bg-gray-50">
            <div className="max-w-2xl w-full text-left lg:text-center">
                <h1 className="text-[48px] font-bold ">Join Our Exclusive Club</h1>

                <p className="text-gray-600  mb-6">
                    Stay ahead of time with the latest updates from our watch collection. Sign up for our newsletter to receive exclusive offers, sneak peeks at new releases, and insights into the world of luxury watches.
                </p>

                <div className="flex justify-center gap-4 items-center w-full mb-4">
                    <TextField
                        size='small'
                        variant="outlined"
                        placeholder="Enter your email"
                        className="flex-1 bg-white"
                        InputProps={{
                            className: "bg-white"
                        }}
                    />
                    <Button variant="contained" color="primary" className="ml-2">
                        Subscribe
                    </Button>
                </div>
                <p className="text-gray-400  text-sm">
                    By subscribing, you agree with ConvertKit's <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
                </p>
            </div>
            <ContactUs />
        </div>
    );
};

export default NewsletterSignup;

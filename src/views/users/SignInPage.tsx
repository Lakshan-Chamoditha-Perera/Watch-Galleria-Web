
import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { access } from 'fs';
import { BACKEND_SERVER_URL } from "../../config/env";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // @ts-ignore
    const { login, updateToken } = useAuth();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignIn = async () => {
        console.log("SignInPage : HandleSignInWithEmailAndPassword {}")
        let url = BACKEND_SERVER_URL + '/api/auth/login';
        const config = {
            method: "post",
            url,
            data: {
                "email": email,
                "password": password
            }
        }

        try {
            const res = await axios.request(config);
            switch (res.status) {
                case 200:
                    const { user, token } = res.data.data;
                    Swal.fire('Welcome ' + user.name + ', You have successfully signed in.', 'success');
                    console.log(res.data);
                    // Perform actions like storing the token and redirecting the user
                    login(user);
                    updateToken(token);
                    navigate('/');
                    break;
                case 400:
                case 404:
                case 401:
                    Swal.fire('Error!', res.data.message, 'error');
                    break;
                default:
                    Swal.fire('Error!', 'An unexpected error occurred.', 'error');
                    break;
            }
        } catch (err) {
            if (err.response) {
                Swal.fire('Error!', err.response.data.message, 'error');
            } else {
                Swal.fire('Error!', 'Network Error', 'error');
            }
        }

    };

    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        console.log("SignInPage : HandleSignInWithGoogle {}")
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result)
            if (result.user) {
                // @ts-ignore
                let accessToken = result.user.accessToken;
                let url = BACKEND_SERVER_URL + '/api/auth/login';

                const config = {
                    method: "post",
                    url,
                    //@ts-ignore
                    data: {
                        "accessToken": accessToken
                    }
                }
                await axios.request(config).then((res) => {
                    if (res.data.status == 200) {
                        let user = res.data.data.user;
                        Swal.fire('Welcome ' + user.name + ' You have successfully signed in.', 'success');
                        console.log(user)
                        login(user);
                        updateToken(res.data.data.token);
                        navigate('/');
                    } else if (res.data.status == 404) {
                        Swal.fire('Error!', 'User not found', 'error');
                    } else {
                        throw new Error('An error occurred while signing in with Google');
                    }
                }).catch((err) => {
                    throw new Error('An error occurred while signing in with Google');
                })
            } else {

                throw new Error('User not found');
            }
        } catch (error) {
            console.log(error)
            await Swal.fire('Error!', error.message, 'error')
        }
    };


    return (
        <div className='px-[20px] h-[95vh] pt-10 flex lg:p-0'>
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <div className='w-full flex flex-col lg:justify-center  lg:h-fit lg:max-w-[400px]' >
                    <div className='flex  flex-col' >
                        <div className="text-[40px] font-bold text-left "   >
                            Let's Sign you in to TIMELY
                            <div className="text-[20px] text-gray-500" >
                                Welcome back,
                            </div>
                            <div className="text-[20px] text-gray-500" >
                                You have been missed!
                            </div>
                        </div>

                    </div>

                    <Box className='my-20 lg:my-0 ' component="form" noValidate>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailChange}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 2 }}
                            onClick={handleSignIn}
                        >
                            Sign In
                        </Button>
                        <Link href="#" variant="body2" className="block pt-3 text-right mt-2">
                            Forgot password?
                        </Link>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            size="large"
                            startIcon={<img
                                alt="Google logo"
                                src="https://developers.google.com/identity/images/g-logo.png"
                                width="20"
                            />}
                            sx={{ mt: 2 }}
                            onClick={handleSignInWithGoogle}
                        >
                            Sign In with Google
                        </Button>
                    </Box>

                    <Typography variant="body2" className="text-center ">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-500">
                            Sign Up
                        </Link>
                    </Typography>

                    <Typography variant="body2" className="text-center ">
                        By continuing, you agree to our{' '}
                        <Link href="" className="text-blue-500">
                            Terms of Use
                        </Link>{' '}
                        and{' '}
                        <Link href="" className="text-blue-500">
                            Privacy Policy
                        </Link>.
                    </Typography>
                </div>
            </Box>

            <div className=' hidden lg:flex w-[60%]' >
                <img
                    alt="Illustration"
                    className="object-cover lg:w-full lg:h-full "
                    src="https://images.unsplash.com/photo-1655693471966-153a0119caa6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>

        </div>);
};

export default SignInPage;

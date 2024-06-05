
import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { access } from 'fs';
import {BACKEND_SERVER_URL} from "../../config/env";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // @ts-ignore
    const { login, updateToken } = useAuth();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user: User = userCredential.user;
            // @ts-ignore    
            login(user);
            await Swal.fire('Welcome ' + user.displayName, 'You have successfully signed in with Google.', 'success');
            navigate('/');
        } catch (error) {
            await Swal.fire('Error!', 'An error occurred while signing in with Google', 'error')

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
                let url = BACKEND_SERVER_URL + '/api/auth/login'
                console.log("-------------------------------------------")
                console.log(url)
                console.log("-------------------------------------------")
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
        <div className='px-[13.33vw] flex h-100vh  lg:p-0'>
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <div className='w-full border h-[100vh] flex flex-col lg:justify-center  lg:h-fit lg:py-12 lg:max-w-[400px] lg:p-2' >
                    <div className='border flex flex-col' >
                        <div className="text-[38px] font-bold  border text-left "   >
                            Sign in to TIMELY

                        </div>
                        <div className="text-left" >
                            New to our platform?{' '}
                            <Link onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}> Register </Link>
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
                            Login
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
            {/* need to hide in sm */}
            <div className=' hidden lg:flex w-[60%] h-[90vh]' >
                <img
                    alt="Illustration"
                    className="object-cover lg:w-full lg:h-full "
                    src="https://images.unsplash.com/photo-1655693471966-153a0119caa6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>
        </div>);
};

export default SignInPage;

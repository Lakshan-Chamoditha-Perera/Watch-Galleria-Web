
import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { access } from 'fs';

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
            const user = userCredential.user;
            login(user);

            await Swal.fire('Welcome ' + user.displayName, 'You have successfully signed in with Google.', 'success');
            navigate('/home');
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
                const config = {
                    method: "post",
                    url: 'http://localhost:3000/api/auth/login',
                    //@ts-ignore
                    data: {
                        "accessToken": accessToken
                    }
                }
                await axios.request(config).then((res) => {
                    if (res.data.status == 200) {
                        let user = res.data.data.user;
                        Swal.fire('Welcome ' + user.name + ' You have successfully signed in.', 'success');
                        login(user);
                        updateToken(res.data.data.token);
                        navigate('/home');
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
            await Swal.fire('Error!', error.message, 'error')
        }
    };


    return (<Box display="flex" height="100vh">
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <Box width="100%" maxWidth={400} p={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome back.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    New to our platform?{' '}
                    <Link onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
                        Register
                    </Link>
                </Typography>
                <Box component="form" noValidate>
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
                    <Link href="#" variant="body2" className="block text-right mt-2">
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

                <Typography variant="body2" className="text-center mt-2">
                    By continuing, you agree to our{' '}
                    <Link href="#" className="text-blue-500">
                        Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="text-blue-500">
                        Privacy Policy
                    </Link>.
                </Typography>
            </Box>
        </Box>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <img
                alt="Illustration"
                className="object-cover max-h-full w-full border"
                src="https://images.unsplash.com/photo-1655693471966-153a0119caa6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
        </Box>
    </Box>);
};

export default SignInPage;

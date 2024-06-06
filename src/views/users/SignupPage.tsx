import React from 'react';
import { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { BACKEND_SERVER_URL } from "../../config/env";

// @ts-ignore   
import paper_plane_logo from "../../assets/paper-plane.png";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRePassword(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);

    const clearFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRePassword('');
    }

    const validate=()=>{
        // check email with regex
        let regexp = new RegExp(/^(([^<>()$$$$\\.,;:\s@"]+(\.[^<>()$$$$\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!regexp.test(email)) {
            Swal.fire('Error!', 'Invalid email!', 'error');
            return false;
        }
        // check password length
        if (password.length < 6) {
            Swal.fire('Error!', 'Password must be at least 6 characters long!', 'error');
            return false;
        }

        if(rePassword.length < 6){
            Swal.fire('Error!', 'Password must be at least 6 characters long!', 'error');
            return false;
        }

        if (password !== rePassword) {
            Swal.fire('Error!', 'Passwords do not match', 'error');
            return;
        }

        return true;
    }

    const registerUser = async (e) => {
        e.preventDefault();
        if(!validate()){
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user)
            let username = user.displayName ? user.displayName : user.email;

            await axios.post(BACKEND_SERVER_URL + '/api/auth/signup', {
                email: email,
                password: password,
                name: username,
                photoURL: user.photoURL ? user.photoURL : ""
            }).then((res) => {
                clearFields();
                Swal.fire('Success!', 'Account created successfully!', 'success');
            }).catch((err) => {
                console.log(err.response.data)
                Swal.fire(err.response.data.message, 'Error!', 'error');
            });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Swal.fire('Timely account already exists with this email!', 'Please sign in', 'error');
                return;
            }
            Swal.fire('Error!', error.message, 'error');
        }
    };

    return (
        <Box display="flex" className=' h-[92vh]' >
            <div className='hidden lg:flex w-[60%]'>
                <img
                    alt="Illustration"
                    className="object-cover max-h-full w-full"
                    src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>

            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Box width="100%" maxWidth={400} p={2}>

                    <div className='w-full flex flex-col lg:justify-center  lg:h-fit lg:max-w-[400px]' >
                        <div className='flex  flex-col' >
                            <div className="text-[40px] font-bold text-left "   >
                                <div className='flex w-full ' >
                                    Sign up
                                    <img src={paper_plane_logo} alt="paper_plane_logo" className="ml-5 w-12 h-12" />
                                </div>
                                <div className="text-[20px] text-gray-500" >
                                    Register to get started with TIMELY
                                </div>
                            </div>
                        </div>

                        <Box className='mb-20 lg:my-0 ' component="form" noValidate>
                            <TextField
                                fullWidth
                                label="E-mail"
                                type="email"
                                variant="outlined"
                                margin="normal"
                                onChange={handleEmailChange}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                onChange={handlePasswordChange}
                            />
                            <TextField
                                fullWidth
                                label="Re-password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                onChange={handleRePasswordChange}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ mt: 2 }}
                                onClick={registerUser}
                            >
                                Create an account
                            </Button>
                        </Box>

                        <Typography variant="body1" gutterBottom>
                            Already a member?{' '}
                            <Link onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>
                                Log in
                            </Link>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                            This site is protected by reCAPTCHA and the Google{' '}
                            <Link href="#">Privacy Policy</Link> and <Link href="#">Terms of Service</Link> apply.
                        </Typography>

                    </div>

                </Box>
            </Box>
        </Box>);
};

export default SignUpPage;

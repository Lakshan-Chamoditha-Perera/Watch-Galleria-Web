import {useContext, useState} from 'react';
import {Box, Button, Link, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {auth} from '../../config/firebase';
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {Context} from "../../App";

const SignUpPage = () => {
    const navigate = useNavigate();
    const {setUser, setIsLogged} = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRePassword(e.target.value);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            setIsLogged(true);
            navigate('/');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            setIsLogged(true);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (<Box display="flex" height="100vh">
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <img
                    alt="Illustration"
                    className="object-cover max-h-full w-full border"
                    src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </Box>
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Box width="100%" maxWidth={400} p={2}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Sign up to Timely.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Already a member?{' '}
                        <Link onClick={() => navigate('/signin')} style={{cursor: 'pointer'}}>
                            Log in
                        </Link>
                    </Typography>
                    {error && (<Typography variant="body2" color="error" gutterBottom>
                            {error}
                        </Typography>)}
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
                        sx={{mt: 2}}
                        onClick={handleSignUp}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create an account'}
                    </Button>
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
                        sx={{mt: 2}}
                        onClick={signInWithGoogle}
                    >
                        Sign up with Google
                    </Button>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{mt: 2}}>
                        This site is protected by reCAPTCHA and the Google{' '}
                        <Link href="#">Privacy Policy</Link> and <Link href="#">Terms of Service</Link> apply.
                    </Typography>
                </Box>
            </Box>
        </Box>);
};

export default SignUpPage;

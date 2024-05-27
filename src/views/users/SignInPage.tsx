import {useState} from 'react';
import {Box, Button, Link, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {auth} from '../../config/firebase';
import {useAuth} from '../../context/AuthContext';
import Swal from 'sweetalert2';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

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
            Swal.fire('Error!', 'Invalid email or password', 'error')
        }
    };

    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await Swal.fire('Welcome ' + user.displayName, 'You have successfully signed in with Google.', 'success');
            login(user);
            navigate('/home');
        } catch (error) {
            await Swal.fire('Error!', 'An error occurred while signing in with Google', 'error')
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
                    <Link onClick={() => navigate('/signup')} style={{cursor: 'pointer'}}>
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
                        sx={{mt: 2}}
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
                        sx={{mt: 2}}
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

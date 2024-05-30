import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Header.css';
import { Button, IconButton, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    // @ts-ignore
    const { user, isLogged, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to logout?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/signin');
            }
        });
    };

    return (
        <nav className="header-container">
            <div className="logo">
                <span>TIMELY</span>
            </div>
            <div className="nav-links">
                {isLogged && (
                    <ul>
                        <ScrollLink to="watches" smooth={true} duration={500}>
                            <li className="navlist_item" onClick={() => navigate('/home')}>Watches</li>
                        </ScrollLink>
                        <ScrollLink to="instruments" smooth={true} duration={500}>
                            <li className="navlist_item">Brands</li>
                        </ScrollLink>
                        <ScrollLink to="news" smooth={true} duration={500}>
                            <li className="navlist_item">Contact</li>
                        </ScrollLink>
                        {user?.role === 'ADMIN' && (
                            <ScrollLink to="items" smooth={true} duration={500}>
                                <li className="navlist_item" onClick={() => navigate('/add-product')}>Items</li>
                            </ScrollLink>
                        )}
                    </ul>
                )}
            </div>
            <div className="p-0 flex flex-row justify-end h-[83%]">
                <Stack direction="row" spacing={1} alignItems="center">
                    {isLogged ? (
                        <>
                            <IconButton color="inherit" aria-label="user account" onClick={() => navigate('/home')}>
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
                                ) : (
                                    <AccountCircle />
                                )}
                            </IconButton>
                            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => navigate('/purchases')}>
                                <ShoppingCartIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="logout" onClick={handleLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <Button color="inherit" href="/signin">Login</Button>
                    )}
                </Stack>
            </div>
        </nav>
    );
};

export default Header;

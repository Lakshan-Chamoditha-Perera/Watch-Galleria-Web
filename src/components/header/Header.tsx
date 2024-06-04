import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Header.css';
import { Button, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    // @ts-ignore
    const { user, isLogged, logout } = useAuth();
    const navigate = useNavigate();

    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleLogout = (e: React.MouseEvent) => {
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

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate('/profile');
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
                            <li className="navlist_item" onClick={() => navigate('/')}>Watches</li>
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
                            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => navigate('/purchases')}>
                                <ShoppingCartIcon />
                            </IconButton>
                            <IconButton onClick={handleClick} color="inherit" aria-label="user account">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
                                ) : (
                                    <AccountCircle />
                                )}
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button variant='outlined' color="inherit" href="/signin">Login</Button>
                    )}
                </Stack>
            </div>
        </nav>
    );
};

export default Header;

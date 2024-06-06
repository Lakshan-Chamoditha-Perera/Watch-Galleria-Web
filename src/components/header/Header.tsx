import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Header.css';
import { Badge, Button, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/ShopContext';
import { Home } from '@mui/icons-material';

const Header: React.FC = () => {
    // @ts-ignore
    const { user, isLogged, logout } = useAuth();
    const navigate = useNavigate();
    const { cart } = useCart();


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
        <nav className="fixed grid grid-cols-[1fr_5fr_2fr] items-center h-[8vh] w-screen lg:px-[13.33vw] px-[20px] text-black top-0 z-[1000] backdrop-filter backdrop-blur-[5px] backdrop-saturate-[200%] bg-white bg-opacity-[0.84] border-b border-gray-300 shadow-lg">
            <Link className="logo" 
                to="/" 
                onClick={() => navigate('/')}
            >
                <span>TIMELY</span>
            </Link>
            <div className="nav-links">
                {isLogged && (
                    <ul>
                        <ScrollLink to="watches" smooth={true} duration={500}>
                            <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/')}>

                                <HomeRoundedIcon   fontSize="large"/>
                                {/* Home */}
                            </li>
                        </ScrollLink>
                        <ScrollLink to="instruments" smooth={true} duration={500}>
                            <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/')}>

                                <CategoryRoundedIcon  fontSize="large" />
                                {/* Items */}
                            </li>

                        </ScrollLink>
                        <ScrollLink to="news" smooth={true} duration={500}>
                            <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/')}>
                                <ConnectWithoutContactRoundedIcon fontSize="large"  />
                                {/* Contact */}
                                </li>
                        </ScrollLink>
                        {user?.role === 'ADMIN' && (
                            <ScrollLink to="items" smooth={true} duration={500}>
                                <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/add-product')}>
                                <TuneRoundedIcon  fontSize="large"/>
                                </li>
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
                                <IconButton aria-label="cart">
                                    <Badge badgeContent={cart.length} color="primary">
                                        <ShoppingCartIcon  fontSize="large" color="inherit" />
                                    </Badge>
                                </IconButton>

                            </IconButton>
                            <IconButton onClick={handleClick} color="inherit" aria-label="user account">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
                                ) : (
                                    <AccountCircle  fontSize="large"/>
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
                        <Button variant='outlined' color="inherit" href="/signin">Signin</Button>
                    )}
                </Stack>
            </div>
        </nav>
    );
};

export default Header;

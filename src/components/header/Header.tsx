import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Header.css';
import { Badge, Button, IconButton, Menu, MenuItem, Stack, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/ShopContext';

const Header: React.FC = () => {
    const { user, isLogged, logout } = useAuth();
    const navigate = useNavigate();
    const { cart } = useCart();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
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

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = (
        <List>
            <ScrollLink to="watches" smooth={true} duration={500}>
                <ListItem button onClick={() => navigate('/profile')}>
                    <ListItemIcon className='p-1'>
                        <IconButton color="inherit" aria-label="user account">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
                            ) : (
                                <AccountCircle fontSize="medium" />
                            )}
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
            </ScrollLink>
            <ScrollLink to="watches" smooth={true} duration={500}>
                <ListItem button onClick={() => navigate('/')}>
                    <ListItemIcon className=' flex justify-center'><HomeRoundedIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </ScrollLink>
            <ScrollLink to="instruments" smooth={true} duration={500}>
                <ListItem button onClick={() => navigate('/')}>
                    <ListItemIcon className=' flex justify-center'><CategoryRoundedIcon /></ListItemIcon>
                    <ListItemText primary="Items" />
                </ListItem>
            </ScrollLink>
            <ScrollLink to="news" smooth={true} duration={500}>
                <ListItem button onClick={() => navigate('/')}>
                    <ListItemIcon className=' flex justify-center'><ConnectWithoutContactRoundedIcon /></ListItemIcon>
                    <ListItemText primary="Contact" />
                </ListItem>
            </ScrollLink>

            {user?.role === 'ADMIN' && (
                <>    <ScrollLink to="items" smooth={true} duration={500}>
                    <ListItem button onClick={() => navigate('/add-product')}>
                        <ListItemIcon className=' flex justify-center'><TuneRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Manage Items" />
                    </ListItem>
                </ScrollLink>
                    <ScrollLink to="items" smooth={true} duration={500}>
                        <ListItem button onClick={() => navigate('/sales')}>
                            <ListItemIcon className=' flex justify-center'><TrendingUpIcon /></ListItemIcon>
                            <ListItemText primary="Sales" />
                        </ListItem>
                    </ScrollLink>
                </>
            )}
            <ScrollLink to="news" smooth={true} duration={500}>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon className=' flex justify-center'>
                        <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </ScrollLink>

        </List>
    );

    return (
        <nav className="fixed flex justify-between  h-[8vh] w-screen lg:px-[13.33vw] px-[20px] text-black top-0 z-[1000] backdrop-filter backdrop-blur-[5px] backdrop-saturate-[200%] bg-white bg-opacity-[0.84] border-b  shadow-lg">
            <Link className="logo" to="/" onClick={() => navigate('/')}>
                <span>TIMELY</span>
            </Link>
            {/* <div className="nav-links md:flex hidden">
                {false && (
                    <ul>
                        <ScrollLink to="watches" smooth={true} duration={500}>
                            <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/')}>
                                <HomeRoundedIcon fontSize="large" />
                            </li>
                        </ScrollLink>
                        <ScrollLink to="instruments" smooth={true} duration={500}>
                            <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/')}>
                                <CategoryRoundedIcon fontSize="large" />
                            </li>
                        </ScrollLink>
                        <ScrollLink to="news" smooth={true} duration={500}>
                            <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/')}>
                                <ConnectWithoutContactRoundedIcon fontSize="large" />
                            </li>
                        </ScrollLink>
                        {user?.role === 'ADMIN' && (
                            <ScrollLink to="items" smooth={true} duration={500}>
                                <li className="navlist_item flex flex-col items-center" onClick={() => navigate('/add-product')}>
                                    <TuneRoundedIcon fontSize="large" />
                                </li>
                            </ScrollLink>
                        )}
                    </ul>
                )}
            </div> */}
            <div className="p-0 items flex flex-row justify-end ">
                <Stack direction="row" spacing={1} alignItems="center">
                    {isLogged ? (
                        <>
                            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => navigate('/purchases')}>
                                <IconButton aria-label="cart">
                                    <Badge badgeContent={cart.length} color="primary">
                                        <ShoppingCartIcon fontSize="medium" color="inherit" />
                                    </Badge>
                                </IconButton>
                            </IconButton>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                className="hamburger-icon"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </>
                    ) : (
                        <Button variant='outlined' color="inherit" href="/signin">Signin</Button>
                    )}

                </Stack>
            </div>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {menuItems}
            </Drawer>
        </nav>
    );
};

export default Header;

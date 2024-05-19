import React from 'react';
import { Link } from "react-scroll";
import './Header.css';
import { Button, styled } from "@mui/material";
import { AiOutlineLogin, AiOutlineSearch } from "react-icons/ai";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import IconButton from '@mui/material/IconButton';


const Header = () => {
    return (
        <nav className="header-container">
            <div className="logo">
                <span>TIMELY</span>
            </div>
            <div className="nav-links">
                <ul>
                    <Link to="watches">
                        <li className="navlist_item">Watches</li>
                    </Link>
                    <Link to="instruments">
                        <li className="navlist_item">Brands</li>
                    </Link>
                    <Link to="scientific">
                        <li className="navlist_item">Mens</li>
                    </Link>
                    <Link to="label">
                        <li className="navlist_item">Womens</li>
                    </Link>
                    <Link to="news">
                        <li className="navlist_item">Contact</li>
                    </Link>
                </ul>
            </div>
            <div className="search-icons">
                <div className="search-container">
                    <AiOutlineSearch />
                    <input type="text" placeholder="Search" />
                </div>
                {/* 
                <div className="search-container gap-3 bg-black">
                    <StyledButton onClick={() => {
                        alert('clicked')
                    }}  >

                    </StyledButton>
                    <IconButton className='hover:cursor-pointer' disabled color="primary">
                        <ShoppingBagIcon className='p-0 m-0 text-2xl' />
                    </IconButton>
                </div> */}
                {/* <div className="cart-container border">
                    <a>login</a>
                    <a>register</a>
                </div> */}

                <Stack direction="row" spacing={1}>
                    <IconButton color="success" aria-label="add an alarm">
                        <AlarmIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>
                </Stack>

            </div>

        </nav>
    );
};

export default Header;

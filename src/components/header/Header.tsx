import React from "react";
import { Link } from "react-scroll";
import './Header.css';
import { Button } from "@nextui-org/button";
import { AiFillCarryOut, AiOutlineSearch } from "react-icons/ai";
import { GiArchiveResearch } from "react-icons/gi";

const Header = () => {
    return (
        <nav className="header-container">
            <div className="logo">
                <span>TIMELY</span>
            </div>
            <div className="nav-links">
                <ul>
                    <Link to="watches"><li className="navlist_item">Watches</li></Link>
                    <Link to="instruments" ><li className="navlist_item">Brands</li></Link>
                    <Link to="scientific" ><li className="navlist_item">Mens</li></Link>
                    <Link to="label" ><li className="navlist_item">Womens</li></Link>
                    <Link to="news" ><li className="navlist_item">Contact</li></Link>
                </ul>
            </div>
            <div className="search-icons">
                <div className="search-container">
                    <AiOutlineSearch />
                    <input type="text" placeholder="Search" />
                </div>

                <div className="search-container gap-3 bg-black">
                    <Button color="primary">Login</Button>
                    <Button color="default">Register</Button>
                </div>
                {/* <div className="cart-container border">
                    <a>login</a>
                    <a>register</a>
                </div> */}

            </div>

        </nav>
    );
};

export default Header;

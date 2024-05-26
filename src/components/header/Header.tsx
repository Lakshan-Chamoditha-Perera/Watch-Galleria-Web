import {Link} from "react-scroll";
import './Header.css';
import {IconButton, Stack} from "@mui/material";
import {AiOutlineSearch} from "react-icons/ai";
import AlarmIcon from '@mui/icons-material/Alarm';

const Header = () => {

    return (<nav className="header-container">
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
                    <AiOutlineSearch/>
                    <input type="text" placeholder="Search"/>
                </div>
                <Stack direction="row" spacing={1}>
                    <IconButton color="success" aria-label="add an alarm">
                        <AlarmIcon/>
                    </IconButton>
                    {/* {isLoggedIn ? (
            <>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" href="/signin">
              Login
            </Button>
          )} */}
                </Stack>
            </div>
        </nav>);
};

export default Header;

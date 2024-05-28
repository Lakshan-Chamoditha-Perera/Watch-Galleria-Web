import {Link as ScrollLink} from 'react-scroll';
import './Header.css';
import {Button, IconButton, Stack} from '@mui/material';
import {AiOutlineSearch} from 'react-icons/ai';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useAuth} from '../../context/AuthContext';
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom"; // Adjust the path as needed


const Header = () => {
    const {user, isLogged, logout} = useAuth();
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault()
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
    }

    return (<nav className="header-container">
        <div className="logo">
            <span>TIMELY</span>
        </div>
        <div className="nav-links">
            {isLogged ? (<ul>
                <ScrollLink to="watches" smooth={true} duration={500}>
                    <li className="navlist_item">Watches</li>
                </ScrollLink>
                <ScrollLink to="instruments" smooth={true} duration={500}>
                    <li className="navlist_item">Brands</li>
                </ScrollLink>
                <ScrollLink to="scientific" smooth={true} duration={500}>
                    <li className="navlist_item">Mens</li>
                </ScrollLink>
                <ScrollLink to="label" smooth={true} duration={500}>
                    <li className="navlist_item">Womens</li>
                </ScrollLink>
                <ScrollLink to="news" smooth={true} duration={500}>
                    <li className="navlist_item">Contact</li>
                </ScrollLink>
                {user ? user.role == 'ADMIN' ? (<ScrollLink onClick={(e) => {
                    navigate('/add-product')
                }} to="news" smooth={true} duration={500}>
                    <li className="navlist_item">Manage Items</li>
                </ScrollLink>) : <></> : <></>}
            </ul>) : <></>}
        </div>
        <div className="search-icons">
            <div className="search-container">
                <AiOutlineSearch/>
                <input type="text" placeholder="Search"/>
            </div>
            <Stack direction="row" spacing={1}>
                {isLogged ? (<>
                    <IconButton color="inherit" aria-label="user account" onClick={(e) => {
                        e.preventDefault();
                        navigate('/home');
                    }}>
                        {user?.photoURL ? (<img src={user.photoURL} alt="User Avatar"
                                                style={{width: 30, height: 30, borderRadius: '50%'}}/>) : (
                            <AccountCircle/>)}
                    </IconButton>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={(e) => {
                        e.preventDefault();
                        navigate('/purchases');
                    }}>
                        <AddShoppingCartIcon/>
                    </IconButton>
                    <Button color="inherit" href="/signin" onClick={handleLogout}>
                        Logout
                    </Button>
                </>) : (<Button color="inherit" href="/signin">Login</Button>)}
            </Stack>
        </div>
    </nav>);
};

export default Header;

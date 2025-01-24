import { Navbar, Nav, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartShopping, faHouse, faChevronCircleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function NavBar(){
    const { logout, loginWithRedirect, user, isAuthenticated } = useAuth0();
    const cartCount = useSelector((state:RootState)=>state.cart.totalItems);

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: { 
                returnTo: '/',
            },
            authorizationParams: {
                prompt: 'login', 
            }
        });
    };

    const handleLogout = () => {
        sessionStorage.removeItem("cart");
        logout({
            logoutParams: {
                returnTo: window.location.origin, 
            },
        });
    };

    return(
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand href="/home"><FontAwesomeIcon icon={faBagShopping} />&nbsp;Let's Shop!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home"><FontAwesomeIcon icon={faHouse}/> Home</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="/view-cart"><FontAwesomeIcon icon={faCartShopping}/> Cart ({cartCount})</Nav.Link>
                {isAuthenticated?
                    <Nav.Link onClick={()=>handleLogout()}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign out</Nav.Link>
                    :<Nav.Link onClick={()=>handleLogin()}><FontAwesomeIcon icon={faChevronCircleRight}/> Sign in</Nav.Link>
                }
                </Nav>
                </Navbar.Collapse>
                {isAuthenticated && 
                <>
                    <img src={user?.picture} className='rounded-circle border mx-2' style={{height:'50px', width:'50px'}} alt={user?.given_name}/>
                </>}
            </Container>
            </Navbar>
        )
}

export default NavBar;
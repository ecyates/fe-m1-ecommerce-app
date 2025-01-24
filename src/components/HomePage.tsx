import { Container, Button } from "react-bootstrap";
import ProductCatalog from "./ProductCatalog";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePage(){
    const {user, isAuthenticated, loginWithRedirect} = useAuth0();
    const [showCatalog, setShowCatalog] = useState<boolean>(() => {
        const storedValue = localStorage.getItem("showCatalog");
        return storedValue ? JSON.parse(storedValue) : false;
    });

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

    // Update localStorage whenever `showCatalog` changes
    useEffect(() => {
        localStorage.setItem("showCatalog", JSON.stringify(showCatalog));
    }, [showCatalog]);

    return (
        <>
            
            {!showCatalog?
            <Container className="my-5 p-3 rounded welcome-message">
                <h1 className="mb-3 text-center">
                    🛍️ Welcome {isAuthenticated && `, ${user?.given_name}, `}to the Ultimate Shopping Adventure! 🎉
                </h1>
                <p className="lead">
                    Explore thousands of products curated just for you. Find your favorites, snag the best deals, and make your shopping dreams come true!
                </p>
            <p>
                {isAuthenticated
                    ? "Ready to pick up where you left off? Your cart is waiting!"
                    : "Sign in now for a personalized experience and exclusive deals."}
            </p>            
            <div className='text-center mb-3'><Button onClick={()=>setShowCatalog(!showCatalog)}>Show Catalog</Button>&nbsp;
            <Button variant='secondary' onClick={()=>handleLogin()}><FontAwesomeIcon icon={faChevronCircleRight}/> Sign in</Button>
            </div>
            </Container>:
            <>
            <div className='text-center my-3'><Button onClick={()=>setShowCatalog(!showCatalog)}>Hide Catalog</Button></div>
            <ProductCatalog/>
            </>
            }
        </>

    );
};

export default HomePage;
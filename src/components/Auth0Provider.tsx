import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = {
    children: React.ReactNode;
};

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({ children }) => {
    const navigate = useNavigate();
    const domain = "dev-nkp152tgcpjtepxi.us.auth0.com";
    const clientId = "gwwu6lkzR99gES8JOq7dRXt851eZdSIz";
    const redirectUri = "http://localhost:5173"; 

    const onRedirectCallback = (appState: any) => {
        console.log("Redirect callback:", appState);
        navigate(appState?.returnTo || "/", { replace: true });
    };

    if (!domain || !clientId || !redirectUri) {
        console.error("Auth0Provider configuration is missing required values.");
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                scope: "openid profile email",
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;
